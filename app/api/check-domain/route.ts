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

    const tlds = ["com", "in", "online", "site", "space", "live", "net"];

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

    const text = await response.text();

    return NextResponse.json({
      status: response.status,
      raw: text.substring(0, 1000),
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
