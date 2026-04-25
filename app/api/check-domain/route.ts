import { NextRequest, NextResponse } from "next/server";

const HOSTINGER_TOKEN = process.env.HOSTINGER_API_TOKEN;
const WHOIS_ID = process.env.HOSTINGER_WHOIS_ID;
const BUILDING_CHARGE = 299;

const TLDS = [".com", ".in", ".online", ".site", ".space", ".live", ".blog", ".net"];

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const clean = query.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/\s+/g, "-");

    const domains = TLDS.map((tld) => clean + tld);

    const response = await fetch("https://api.hostinger.com/api/domains/v1/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${HOSTINGER_TOKEN}`,
      },
      body: JSON.stringify({ domains }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: "Hostinger API error" }, { status: 500 });
    }

    const results = data.map((item: any) => ({
      domain: item.domain,
      available: item.available,
      price: item.price ?? null,
      total: item.available ? (item.price ?? 0) + BUILDING_CHARGE : 0,
    }));

    return NextResponse.json({ results });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
