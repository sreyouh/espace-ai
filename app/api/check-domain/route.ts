import { NextRequest, NextResponse } from "next/server";

const HOSTINGER_TOKEN = process.env.HOSTINGER_API_TOKEN;
const BUILDING_CHARGE = 299;

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

    const tlds = [".com", ".in", ".online", ".site", ".space", ".live", ".net"];
    const domains = tlds.map((tld) => clean + tld);

    const response = await fetch(
      "https://api.hostinger.com/api/domains/v1/availability",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HOSTINGER_TOKEN}`,
        },
        body: JSON.stringify({ domains }),
      }
    );

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Invalid response from Hostinger" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.message || "Hostinger API error" },
        { status: 500 }
      );
    }

    const results = (Array.isArray(data) ? data : data?.data ?? []).map(
      (item: any) => ({
        domain: item.domain,
        available: item.available,
        price: item.price ?? null,
        total: item.available && item.price
          ? Math.round(item.price) + BUILDING_CHARGE
          : 0,
      })
    );

    return NextResponse.json({ results });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
