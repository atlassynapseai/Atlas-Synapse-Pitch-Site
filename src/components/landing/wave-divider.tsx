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

/** Hero (navy) → Problem (warm light pane) */
export function WaveDarkToLight() {
  const top = LANDING.hero.bottom;
  const fill = LANDING.problem.solid;
  return (
    <div style={{ background: top, lineHeight: 0, marginBottom: -1 }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 72 }}>
        <path
          d="M0,44 C280,76 520,16 760,48 C1000,78 1240,28 1440,42 L1440,80 L0,80 Z"
          fill={fill}
        />
        <path
          d="M0,48 Q360,28 720,50 T1440,44"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/** Problem (warm light) → How it works (cool navy) */
export function WaveProblemToHow() {
  const top = LANDING.problem.solid;
  const fill = LANDING.how.solid;
  return (
    <div style={{ background: top, lineHeight: 0, marginBottom: -1 }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 72 }}>
        <path
          d="M0,32 C260,72 500,8 780,46 C1020,72 1220,20 1440,38 L1440,80 L0,80 Z"
          fill={fill}
        />
        <path
          d="M0,38 C380,12 720,68 1080,42 S1320,54 1440,46"
          fill="none"
          stroke="rgba(45, 27, 105, 0.14)"
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

/** Product preview (light) → Why we’re different (dark): diagonal slash (not a wave) */
export function WaveSneakToDifferentiators() {
  const top = LANDING.sneak.edge;
  const fill = LANDING.differentiators.edge;
  return (
    <div style={{ background: top, lineHeight: 0, marginBottom: -1 }}>
      <svg viewBox="0 0 1440 96" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 56 }}>
        <path d="M0,88 L1440,14 L1440,96 L0,96 Z" fill={fill} />
      </svg>
    </div>
  );
}

/** Why we’re different (dark) → Quote break (deep warm charcoal) */
export function WaveDifferentiatorsToQuote() {
  return (
    <FunkyWave
      topBg={LANDING.differentiators.edge}
      bottomFill="#1A1520"
      variant={3}
      height={78}
      scribbleStroke="rgba(148, 120, 220, 0.2)"
    />
  );
}

/** Quote break (charcoal) → Waitlist (dark violet) */
export function WaveQuoteToWaitlist() {
  const top = "#1A1520";
  const fill = LANDING.waitlist.top;
  return (
    <div style={{ background: top, lineHeight: 0, marginBottom: -1 }}>
      <svg viewBox="0 0 1440 84" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 76 }}>
        <path
          d="M0,40 C280,8 520,92 800,34 C1040,0 1240,78 1440,36 L1440,84 L0,84 Z"
          fill={fill}
        />
        <path
          d="M0,48 C360,20 680,88 1040,38 S1320,62 1440,44"
          fill="none"
          stroke="rgba(110, 82, 92, 0.14)"
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0,54 Q720,30 1440,50"
          fill="none"
          stroke="rgba(60, 48, 54, 0.08)"
          strokeWidth="1.1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
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
