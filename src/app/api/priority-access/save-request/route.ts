import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Try both possible env var names
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_SECRET;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials missing", {
        url: !!supabaseUrl,
        key: !!supabaseServiceKey,
        envKeys: Object.keys(process.env).filter(k => k.includes('SUPABASE'))
      });
      return NextResponse.json(
        { ok: false, error: "Database not configured" },
        { status: 500 }
      );
    }

    console.log("Using Supabase:", supabaseUrl);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase
      .from("priority_access_requests")
      .insert([body]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { ok: false, error: dbError.message || "Failed to save" },
        { status: 400 }
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
