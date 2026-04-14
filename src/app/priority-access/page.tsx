import { PriorityAccessForm } from "@/components/landing/priority-access-form";

export const metadata = {
  title: "Request Priority Access - Atlas Synapse",
  description: "Get early access to Atlas Synapse. Tell us about your AI setup.",
};

export default function PriorityAccessPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-16 md:px-10" style={{ background: "linear-gradient(180deg, #0A0E17 0%, #0D1118 100%)" }}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <polygon
          points="720,-20 1180,40 1080,480 620,420"
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.045)"
          strokeWidth="1"
        />
        <polygon
          points="80,520 420,480 520,900 40,940"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      </svg>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(129,140,248,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[600px]">
        <div className="mb-12 text-center">
          <h1 className="text-[40px] font-extrabold tracking-[-0.02em] text-white md:text-[50px]">
            Request Priority Access
          </h1>
          <p className="mt-4 text-[16px] text-[#E8D5F5]/60 md:text-[18px]">
            Join our founding beta. We&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <PriorityAccessForm />

        <p className="mt-6 text-center text-[12px] text-[#E8D5F5]/40">
          We take privacy seriously. Your information will never be shared.
        </p>
      </div>
    </main>
  );
}
