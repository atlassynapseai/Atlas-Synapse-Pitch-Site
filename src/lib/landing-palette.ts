/**
 * Landing section backgrounds + wave edge colors.
 * Waves must use the exact hex at each boundary so the “lower” fill reads as the next pane.
 *
 * Rhythm: dark → light → dark → light … (hero dark, problem light, how dark, sneak light,
 * differentiators dark, hr orbit light, waitlist dark).
 */
export const LANDING = {
  hero: {
    gradient: "linear-gradient(180deg, #0C0820 0%, #1B1464 100%)",
    bottom: "#1B1464",
  },
  problem: {
    solid: "#E8E2F4",
  },
  how: {
    solid: "#071018",
  },
  sneak: {
    /** Cool mist: light pane between dark “How” and dark “Why we’re different” */
    gradient: "linear-gradient(180deg, #E8EDF6 0%, #DFE6F2 50%, #E8EDF6 100%)",
    edge: "#E8EDF6",
  },
  differentiators: {
    /** Dark wine (swapped with former HR orbit) */
    gradient: "linear-gradient(180deg, #10060E 0%, #170F15 50%, #10060E 100%)",
    edge: "#10060E",
  },
  hrOrbit: {
    /** Warm light beige (swapped with former differentiators) */
    gradient: "linear-gradient(180deg, #F5F0E8 0%, #EDE4D8 48%, #F3EDE3 100%)",
    edge: "#F5F0E8",
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
