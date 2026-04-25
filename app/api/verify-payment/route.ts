import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const HOSTINGER_TOKEN = process.env.HOSTINGER_API_TOKEN;
const WHOIS_ID = parseInt(process.env.HOSTINGER_WHOIS_ID || "0");

async function purchaseDomain(domain: string) {
  try {
    const parts = domain.split(".");
    const domainName = parts[0];
    const tld = parts.slice(1).join(".");

    const availRes = await fetch(
      "https://developers.hostinger.com/api/domains/v1/availability",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HOSTINGER_TOKEN}`,
        },
        body: JSON.stringify({
          domain: domainName,
          tlds: [tld],
        }),
      }
    );

    const availData = await availRes.json();
    const domainInfo = availData?.[0];

    if (!domainInfo?.is_available) {
      return { success: false, error: "Domain no longer available" };
    }

    const purchaseRes = await fetch(
      "https://developers.hostinger.com/api/domains/v1/portfolio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HOSTINGER_TOKEN}`,
        },
        body: JSON.stringify({
          domain: domain,
          item_id: domainInfo.item_id,
          whois_profile_id: WHOIS_ID,
          purchase_period: 12,
        }),
      }
    );

    const purchaseData = await purchaseRes.json();

    if (!purchaseRes.ok) {
      return {
        success: false,
        error: purchaseData?.message || "Domain purchase failed",
      };
    }

    return { success: true, data: purchaseData };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

async function setDnsRecords(domain: string) {
  try {
    const records = [
      {
        type: "A",
        name: "@",
        content: "76.76.21.21",
        ttl: 3600,
      },
      {
        type: "CNAME",
        name: "www",
        content: "cname.vercel-dns.com",
        ttl: 3600,
      },
    ];

    const dnsRes = await fetch(
      `https://developers.hostinger.com/api/dns/v1/zones/${domain}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HOSTINGER_TOKEN}`,
        },
        body: JSON.stringify({
          overwrite: false,
          zone: records,
        }),
      }
    );

    return { success: dnsRes.ok };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

async function addDomainToVercel(domain: string) {
  try {
    const projectId = process.env.VERCEL_PROJECT_ID;
    const token = process.env.VERCEL_TOKEN;

    const res = await fetch(
      `https://api.vercel.com/v10/projects/${projectId}/domains`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: domain }),
      }
    );

    const data = await res.json();
    return { success: res.ok, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      domain,
      user_id,
      amount,
    } = await req.json();

    // Step 1 — Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({
        success: false,
        error: "Invalid payment signature",
      });
    }

    // Step 2 — Save order to Supabase
    await supabase.from("orders").insert({
      user_id,
      domain,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      status: "paid",
    });

    // Step 3 — Auto purchase domain on Hostinger
    const purchase = await purchaseDomain(domain);

    if (!purchase.success) {
      await supabase
        .from("orders")
        .update({ status: "needs_review", notes: purchase.error })
        .eq("razorpay_payment_id", razorpay_payment_id);

      return NextResponse.json({ success: true, domain_status: "pending" });
    }

    // Step 4 — Set DNS records to point to Vercel
    await setDnsRecords(domain);

    // Step 5 — Add domain to Vercel project
    await addDomainToVercel(domain);

    // Step 6 — Update order status
    await supabase
      .from("orders")
      .update({ status: "domain_active" })
      .eq("razorpay_payment_id", razorpay_payment_id);

    return NextResponse.json({ success: true, domain_status: "active" });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
      }
