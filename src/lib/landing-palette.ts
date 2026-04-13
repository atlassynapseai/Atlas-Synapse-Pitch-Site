/**
 * Landing section backgrounds + wave edge colors.
 * Waves must use the exact hex at each boundary so the “lower” fill reads as the next pane.
 */
export const LANDING = {
  hero: {
    gradient: "linear-gradient(180deg, #0C0820 0%, #1B1464 100%)",
    /** Bottom edge of hero — upper cap of hero→problem wave */
    bottom: "#1B1464",
  },
  problem: {
    solid: "#E8E2F4",
  },
  how: {
    solid: "#071018",
  },
  sneak: {
    solid: "#0F1C2E",
  },
  differentiators: {
    gradient: "linear-gradient(180deg, #140A1E 0%, #1F1034 50%, #140A1E 100%)",
    /** Top / bottom of symmetric gradient — wave caps */
    edge: "#140A1E",
  },
  hrOrbit: {
    gradient: "linear-gradient(180deg, #10060E 0%, #170F15 50%, #10060E 100%)",
    edge: "#10060E",
  },
  waitlist: {
    gradient: "linear-gradient(180deg, #080818 0%, #1C1658 100%)",
    top: "#080818",
    bottom: "#1C1658",
  },
  footer: {
    solid: "#06040C",
  },
} as const;
