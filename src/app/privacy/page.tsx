import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Atlas Synapse",
  description: "How Atlas Synapse collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <main
      className="relative min-h-screen px-5 py-16 md:px-10"
      style={{ background: "linear-gradient(180deg, #0A0E17 0%, #0D1118 100%)" }}
    >
      <div className="relative z-10 mx-auto max-w-[720px]">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-[14px] text-[#E8D5F5]/60 transition-colors hover:text-[#E8D5F5]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 2L4 8l6 6" />
          </svg>
          Back to home
        </Link>

        <h1 className="mb-2 text-[36px] font-extrabold tracking-[-0.02em] text-white md:text-[44px]">
          Privacy Policy
        </h1>
        <p className="mb-10 text-[14px] text-[#E8D5F5]/40">Last updated: April 15, 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#E8D5F5]/70">
          <section>
            <h2 className="mb-3 text-[18px] font-bold text-white">1. Information We Collect</h2>
            <p>
              When you sign up for our waitlist or request priority access, we collect your name, email address,
              company name, job role, and any additional details you provide in the form. We do not collect
              payment information at this stage.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[18px] font-bold text-white">2. How We Use Your Information</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>To contact you about your waitlist or priority access request</li>
              <li>To send product updates and announcements relevant to Atlas Synapse</li>
              <li>To improve our product based on the use cases you share</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-[18px] font-bold text-white">3. Data Storage</h2>
            <p>
              Your data is stored securely in Supabase (hosted on AWS). We use industry-standard encryption
              in transit (TLS) and at rest. We do not sell or share your personal information with third parties
              for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[18px] font-bold text-white">4. Email Communications</h2>
            <p>
              We use Brevo to send transactional and marketing emails. You can unsubscribe from marketing
              emails at any time via the unsubscribe link in any email we send.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[18px] font-bold text-white">5. Your Rights</h2>
            <p>
              You may request deletion of your data at any time by emailing us at{" "}
              <a
                href="mailto:company@atlassynapseai.com"
                className="text-[#A78BFA] underline decoration-[#A78BFA]/40 underline-offset-4 hover:text-white"
              >
                company@atlassynapseai.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[18px] font-bold text-white">6. Cookies</h2>
            <p>
              We use minimal cookies necessary for the site to function (e.g. authentication state). We do not
              use third-party tracking or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[18px] font-bold text-white">7. Contact</h2>
            <p>
              For any privacy-related questions, contact us at{" "}
              <a
                href="mailto:company@atlassynapseai.com"
                className="text-[#A78BFA] underline decoration-[#A78BFA]/40 underline-offset-4 hover:text-white"
              >
                company@atlassynapseai.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
