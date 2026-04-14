/**
 * Landing section backgrounds + wave edge colors.
 * Waves must use the exact hex at each boundary so the “lower” fill reads as the next pane.
 *
 * Rhythm: … → differentiators (dark) → quote break (#1A1520) → waitlist (dark).
 */
export const LANDING = {
  hero: {
    gradient: "linear-gradient(180deg, #0A0E17 0%, #0E1424 100%)",
    bottom: "#0E1424",
  },
  problem: {
    solid: "#FAF8F5",
  },
  /** Cool deep navy */
  how: {
    solid: "#0A101E",
  },
  sneak: {
    /** Cool mist: light pane between dark “How” and dark “Why we’re different” */
    gradient: "linear-gradient(180deg, #E8EDF6 0%, #DFE6F2 50%, #E8EDF6 100%)",
    edge: "#E8EDF6",
  },
  differentiators: {
    gradient: "linear-gradient(180deg, #0A0E17 0%, #0D1118 50%, #0A0E17 100%)",
    edge: "#0A0E17",
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
