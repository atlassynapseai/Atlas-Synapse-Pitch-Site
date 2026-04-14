/** Curated disposable / burner domains — blocks obviously non-work inboxes */
const DISPOSABLE = new Set(
  [
    "mailinator.com",
    "guerrillamail.com",
    "guerrillamailblock.com",
    "10minutemail.com",
    "10minutemail.net",
    "tempmail.com",
    "temp-mail.org",
    "throwaway.email",
    "yopmail.com",
    "trashmail.com",
    "getnada.com",
    "fakeinbox.com",
    "sharklasers.com",
    "grr.la",
    "maildrop.cc",
    "dispostable.com",
    "mailnesia.com",
    "mintemail.com",
    "emailondeck.com",
    "burnermail.io",
    "trashmail.de",
    "moakt.com",
    "tmpmail.org",
  ].map((d) => d.toLowerCase()),
);

/** RFC-ish practical pattern: local@domain.tld (TLD at least 2 chars) */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function normalizeName(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

export function isValidName(name: string): boolean {
  const n = normalizeName(name);
  return n.length >= 2 && n.length <= 120;
}

export function parseEmailDomain(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 1 || at === email.length - 1) return null;
  return email.slice(at + 1).toLowerCase().trim();
}

export function isDisposableDomain(domain: string): boolean {
  const d = domain.toLowerCase();
  if (DISPOSABLE.has(d)) return true;
  for (const block of DISPOSABLE) {
    if (d.endsWith(`.${block}`)) return true;
  }
  return false;
}

export function isValidEmailShape(email: string): boolean {
  const e = email.trim().toLowerCase();
  if (!EMAIL_RE.test(e)) return false;
  const domain = parseEmailDomain(e);
  if (!domain || !domain.includes(".")) return false;
  const tld = domain.split(".").pop() ?? "";
  if (tld.length < 2) return false;
  if (isDisposableDomain(domain)) return false;
  return true;
}
