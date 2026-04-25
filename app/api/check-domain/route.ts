import { NextRequest, NextResponse } from "next/server";

const HOSTINGER_TOKEN = process.env.HOSTINGER_API_TOKEN;
const BUILDING_CHARGE = 450;

const TLD_PRICES: Record<string, number> = {
  com: 899,
  in: 599,
  online: 89,
  site: 89,
  space: 89,
  live: 249,
  net: 999,
  tech: 609,
  bio: 529,
  org: 699,
  shop: 89,
  store: 99,
  io: 2799,
  cloud: 179,
  blog: 179,
  fun: 89,
  cc: 349,
  sbs: 89,
  pro: 269,
  co: 2449,
};

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const clean = query
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .replace(/\s+/g, "-");

    const tlds = [
      "com", "in", "online", "site", "space", "live", "net",
      "tech", "org", "shop", "store", "cloud", "blog", "fun",
      "cc", "sbs", "pro",
    ];

    const response = await fetch(
      "https://developers.hostinger.com/api/domains/v1/availability",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HOSTINGER_TOKEN}`,
        },
        body: JSON.stringify({
          domain: clean,
          tlds: tlds,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.message || "Hostinger API error" },
        { status: 500 }
      );
    }

    const results = data.map((item: any) => {
      const tld = item.domain.split(".").pop();
      const price = TLD_PRICES[tld] ?? 499;
      return {
        domain: item.domain,
        available: item.is_available,
        restriction: item.restriction,
        price: price,
        total: item.is_available ? price + BUILDING_CHARGE : 0,
      };
    });

    return NextResponse.json({ results });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
         }
