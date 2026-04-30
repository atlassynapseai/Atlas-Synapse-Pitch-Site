"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 80));

  return (
    <motion.header className="fixed left-0 right-0 top-0 z-50 transition-colors duration-300"
      style={{ backgroundColor: scrolled ? "rgba(12,8,32,0.92)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", WebkitBackdropFilter: scrolled ? "blur(16px)" : "none" }}>
      <div className="mx-auto flex h-12 w-full items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={30} height={30} priority
            style={{ background: "none", mixBlendMode: "screen" }} />
          <span className="text-[14px] font-bold tracking-tight text-white">Atlas Synapse</span>
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          <a href="#where-we-fit" className="text-[13px] font-medium text-[#E8D5F5]/60 transition-colors hover:text-white">Features</a>
          <a href="#how" className="text-[13px] font-medium text-[#E8D5F5]/60 transition-colors hover:text-white">How It Works</a>
          <a href="#sneak-peek" className="text-[13px] font-medium text-[#E8D5F5]/60 transition-colors hover:text-white">See It</a>
          <a href="https://atlassynapseai.com/MVP/demo" className="text-[13px] font-medium text-[#E8D5F5]/60 transition-colors hover:text-white">Demo</a>
          <a href="#waitlist" className="rounded-[10px] px-4 py-1.5 text-[13px] font-bold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
            Get Notified
          </a>
        </nav>
        <a href="#waitlist" className="rounded-[10px] px-3 py-1.5 text-[13px] font-bold text-white md:hidden"
          style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
          Get Notified
        </a>
      </div>
    </motion.header>
  );
}
