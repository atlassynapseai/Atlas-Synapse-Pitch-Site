import { LANDING } from "@/lib/landing-palette";

export function Footer() {
  return (
    <footer className="border-t border-[#2D1B69]/30 py-8" style={{ background: LANDING.footer.solid }}>
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 px-6 text-[13px] text-[#E8D5F5]/40 lg:px-10 md:flex-row">
        <span>Atlas Synapse LLC &middot; {new Date().getFullYear()}</span>
        <span className="italic opacity-60">The HR Department for Your AI</span>
        <div className="flex gap-4">
          <a href="#" className="transition-colors hover:text-[#E8D5F5]/80">Features</a>
          <a href="#" className="transition-colors hover:text-[#E8D5F5]/80">About</a>
          <a href="#" className="transition-colors hover:text-[#E8D5F5]/80">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
