"use client";

import { Nav } from "./nav";
import { GrainOverlay } from "./grain-overlay";
import { FloatingPill } from "./floating-pill";
import { ScrollProgress } from "./scroll-progress";
import { DoodleDefs } from "./doodle-defs";
import { HeroSection } from "./hero-section";
import {
  WaveDarkToLight,
  WaveLightToDark,
  WaveHowToSneak,
  WaveSneakToDifferentiators,
  WaveDifferentiatorsToHrOrbit,
  WaveHrOrbitToWaitlist,
  WaveWaitlistToFooter,
} from "./wave-divider";
import { ProblemSection } from "./problem-section";
import { HowItWorksSection } from "./how-it-works-section";
import { SneakPeekSection } from "./sneak-peek-section";
import { DifferentiatorsSection } from "./differentiators-section";
import { HrOrbitSection } from "./hr-orbit-section";
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
      <WaveLightToDark />
      <HowItWorksSection />
      <WaveHowToSneak />
      <SneakPeekSection />
      <WaveSneakToDifferentiators />
      <DifferentiatorsSection />
      <WaveDifferentiatorsToHrOrbit />
      <HrOrbitSection />
      <WaveHrOrbitToWaitlist />
      <WaitlistSection />
      <WaveWaitlistToFooter />
      <Footer />
    </>
  );
}
