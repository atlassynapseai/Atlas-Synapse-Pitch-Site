import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_SECRET;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials missing");
      return NextResponse.json(
        { ok: false, error: "Database not configured" },
        { status: 500 }
      );
    }

    console.log("Attempting insert to:", supabaseUrl);

    // Use REST API directly
    const response = await fetch(`${supabaseUrl}/rest/v1/priority_access_requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log("Supabase REST response:", response.status, responseText);

    if (!response.ok) {
      let errorMsg = "Failed to save";
      try {
        const errorData = JSON.parse(responseText);
        errorMsg = errorData.message || errorData.error_description || errorMsg;
      } catch (e) {
        errorMsg = responseText || errorMsg;
      }
      console.error("REST API error:", errorMsg);
      return NextResponse.json(
        { ok: false, error: errorMsg },
        { status: response.status }
      );
    }

    console.log("Successfully saved data");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Save request error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
