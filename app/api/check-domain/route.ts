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

    // Return raw response so we can see what Hostinger sends
    return NextResponse.json({
      status: response.status,
      raw: text,
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
