import { LANDING } from "@/lib/landing-palette";

type FunkyWaveProps = {
  topBg: string;
  bottomFill: string;
  /** Unique curve: keeps transitions lively without repeating the same silhouette */
  variant: 1 | 2 | 3 | 4 | 5;
  height?: number;
  /** Line drawn along the fold, tuned per transition for visibility */
  scribbleStroke?: string;
};

function FunkyWave({ topBg, bottomFill, variant, height = 80, scribbleStroke = "rgba(255,255,255,0.1)" }: FunkyWaveProps) {
  const h = height;
  const vbH = 96;
  const paths: Record<1 | 2 | 3 | 4 | 5, string> = {
    1: `M0,${h * 0.35} C240,${h * 0.95} 420,${h * 0.05} 680,${h * 0.45} C920,${h * 0.88} 1120,${h * 0.12} 1440,${h * 0.38} L1440,${vbH} L0,${vbH} Z`,
    2: `M0,${h * 0.55} C300,${h * 0.15} 520,${h * 0.92} 760,${h * 0.42} C980,${h * 0.08} 1180,${h * 0.78} 1440,${h * 0.5} L1440,${vbH} L0,${vbH} Z`,
    3: `M0,${h * 0.25} C200,${h * 0.7} 480,${h * 0.02} 720,${h * 0.55} C960,${h * 0.98} 1240,${h * 0.18} 1440,${h * 0.62} L1440,${vbH} L0,${vbH} Z`,
    4: `M0,${h * 0.65} C260,${h * 0.25} 540,${h * 0.88} 780,${h * 0.35} C1020,${h * 0.05} 1260,${h * 0.72} 1440,${h * 0.28} L1440,${vbH} L0,${vbH} Z`,
    5: `M0,${h * 0.42} C340,${h * 0.82} 580,${h * 0.08} 820,${h * 0.52} C1060,${h * 0.92} 1280,${h * 0.22} 1440,${h * 0.45} L1440,${vbH} L0,${vbH} Z`,
  };
  const scribble =
    variant === 1
      ? "M0,52 Q120,38 240,55 T480,48 T720,58 T960,44 T1200,54 T1440,50"
      : variant === 2
        ? "M0,58 C200,72 380,40 560,56 S920,68 1120,48 S1360,62 1440,54"
        : variant === 3
          ? "M0,44 Q200,68 400,42 T800,52 T1200,40 T1440,48"
          : variant === 4
            ? "M0,50 Q360,28 720,54 T1440,46"
            : "M0,56 C280,40 520,70 760,48 S1240,34 1440,52";

  return (
    <div style={{ background: topBg, lineHeight: 0, marginBottom: -1 }}>
      <svg viewBox={`0 0 1440 ${vbH}`} preserveAspectRatio="none" style={{ display: "block", width: "100%" }}>
        <path d={paths[variant]} fill={bottomFill} />
        <path
          d={scribble}
          fill="none"
          stroke={scribbleStroke}
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/** Hero (indigo end) → Problem (lavender pane) */
export function WaveDarkToLight() {
  const top = LANDING.hero.bottom;
  const fill = LANDING.problem.solid;
  return (
    <div style={{ background: top, lineHeight: 0, marginBottom: -1 }}>
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ display: "block", width: "100%" }}>
        <path d="M0,36 C320,72 560,0 800,36 C1040,72 1280,18 1440,36 L1440,72 L0,72 Z" fill={fill} />
        <path
          d="M0,40 Q360,18 720,42 T1440,38"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/** Problem → How it works (ink-blue pane) */
export function WaveLightToDark() {
  const top = LANDING.problem.solid;
  const fill = LANDING.how.solid;
  return (
    <div style={{ background: top, lineHeight: 0, marginBottom: -1 }}>
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ display: "block", width: "100%" }}>
        <path d="M0,28 C280,68 520,4 820,44 C1060,72 1260,16 1440,40 L1440,72 L0,72 Z" fill={fill} />
        <path
          d="M0,34 C400,8 720,62 1080,36 S1320,52 1440,44"
          fill="none"
          stroke="rgba(45, 27, 105, 0.18)"
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/** How (dark) → Product preview (light mist) */
export function WaveHowToSneak() {
  return (
    <FunkyWave
      topBg={LANDING.how.solid}
      bottomFill={LANDING.sneak.edge}
      variant={1}
      height={76}
      scribbleStroke="rgba(186, 230, 253, 0.18)"
    />
  );
}

/** Product preview (light) → Why we’re different (dark) */
export function WaveSneakToDifferentiators() {
  return (
    <FunkyWave
      topBg={LANDING.sneak.edge}
      bottomFill={LANDING.differentiators.edge}
      variant={2}
      height={82}
      scribbleStroke="rgba(27, 20, 100, 0.16)"
    />
  );
}

/** Why we’re different (dark) → What we replace (light beige) */
export function WaveDifferentiatorsToHrOrbit() {
  return (
    <FunkyWave
      topBg={LANDING.differentiators.edge}
      bottomFill={LANDING.hrOrbit.edge}
      variant={3}
      height={78}
      scribbleStroke="rgba(245, 240, 232, 0.35)"
    />
  );
}

/** HR orbit → Waitlist (cool midnight → violet) */
export function WaveHrOrbitToWaitlist() {
  return (
    <FunkyWave
      topBg={LANDING.hrOrbit.edge}
      bottomFill={LANDING.waitlist.top}
      variant={4}
      height={84}
      scribbleStroke="rgba(199, 210, 254, 0.12)"
    />
  );
}

/** Waitlist (violet end) → Footer */
export function WaveWaitlistToFooter() {
  return (
    <FunkyWave
      topBg={LANDING.waitlist.bottom}
      bottomFill={LANDING.footer.solid}
      variant={5}
      height={72}
      scribbleStroke="rgba(255,255,255,0.1)"
    />
  );
}
