"use client";

import { Nav } from "./nav";
import { GrainOverlay } from "./grain-overlay";
import { FloatingPill } from "./floating-pill";
import { ScrollProgress } from "./scroll-progress";
import { DoodleDefs } from "./doodle-defs";
import { HeroSection } from "./hero-section";
import {
  WaveDarkToLight,
  WaveProblemToHow,
  WaveWhereWeFitToHow,
  WaveHowToDiff,
  WaveDiffToSneak,
  WaveSneakToQuote,
  WaveQuoteToWaitlist,
  WaveWaitlistToFooter,
} from "./wave-divider";
import { ProblemSection } from "./problem-section";
import { WhereWeFitSection } from "./where-we-fit-section";
import { HowItWorksSection } from "./how-it-works-section";
import { DifferentiatorsSection } from "./differentiators-section";
import { SneakPeekSection } from "./sneak-peek-section";
import { QuoteBreakSection } from "./quote-break-section";
import { WaitlistSection } from "./waitlist-section";
import { Footer } from "./footer";

export function LandingPage() {
  return (
    <>
      <DoodleDefs />
      <GrainOverlay />
      <ScrollProgress />
      <Nav />
      <FloatingPill />

      <HeroSection />
      <WaveDarkToLight />
      <ProblemSection />
      <WaveProblemToHow />
      <WhereWeFitSection />
      <WaveWhereWeFitToHow />
      <HowItWorksSection />
      <WaveHowToDiff />
      <DifferentiatorsSection />
      <WaveDiffToSneak />
      <SneakPeekSection />
      <WaveSneakToQuote />
      <QuoteBreakSection />
      <WaveQuoteToWaitlist />
      <WaitlistSection />
      <WaveWaitlistToFooter />
      <Footer />
    </>
  );
}
