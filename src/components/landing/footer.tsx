import { LANDING } from "@/lib/landing-palette";

const SOCIALS = [
  {
    label: "X / Twitter",
    href: "https://x.com/AtlasSynapse",
    hoverClass: "hover:text-white",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/atlas-synapse",
    hoverClass: "hover:text-[#0A66C2]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@AtlasSynapse",
    hoverClass: "hover:text-[#FF0000]",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#2D1B69]/30 py-10" style={{ background: LANDING.footer.solid }}>
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-8 px-6 lg:px-10 md:flex-row md:gap-4">
        {/* Brand */}
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="text-[13px] font-semibold text-[#E8D5F5]/70">Atlas Synapse LLC &middot; {new Date().getFullYear()}</span>
          <span className="text-[12px] italic text-[#E8D5F5]/40">The HR Department for Your AI</span>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className={`text-[#E8D5F5]/45 transition-colors duration-150 ${s.hoverClass}`}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-5">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] text-[#E8D5F5]/55 transition-colors hover:text-[#E8D5F5]/90"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
