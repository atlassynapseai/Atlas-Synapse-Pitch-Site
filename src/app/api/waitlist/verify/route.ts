import { NextResponse } from "next/server";
import { isDisposableDomain, isValidEmailShape, parseEmailDomain } from "@/lib/waitlist-validation";

type GoogleDnsAnswer = { type: number; data?: string };
type GoogleDnsJson = { Status: number; Answer?: GoogleDnsAnswer[] };

/**
 * Confirms the domain can receive mail (MX present). Does not prove the mailbox exists.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email || !isValidEmailShape(email)) {
      return NextResponse.json({ ok: false, code: "invalid_format" as const }, { status: 400 });
    }
    const domain = parseEmailDomain(email);
    if (!domain || isDisposableDomain(domain)) {
      return NextResponse.json({ ok: false, code: "invalid_domain" as const }, { status: 400 });
    }

    const url = `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`;
    const res = await fetch(url, { headers: { accept: "application/dns-json" }, next: { revalidate: 0 } });
    if (!res.ok) {
      return NextResponse.json({ ok: false, code: "dns_unavailable" as const }, { status: 502 });
    }
    const data = (await res.json()) as GoogleDnsJson;
    if (data.Status !== 0 || !Array.isArray(data.Answer)) {
      return NextResponse.json({ ok: false, code: "no_mx" as const }, { status: 400 });
    }
    const hasMx = data.Answer.some((a) => a.type === 15);
    if (!hasMx) {
      return NextResponse.json({ ok: false, code: "no_mx" as const }, { status: 400 });
    }

    return NextResponse.json({ ok: true as const });
  } catch {
    return NextResponse.json({ ok: false, code: "server_error" as const }, { status: 500 });
  }
}
