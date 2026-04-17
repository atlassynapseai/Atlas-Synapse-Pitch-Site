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
  /** Light cream — alternates with adjacent dark sections */
  how: {
    solid: "#F5F1EA",
    gradient: "linear-gradient(180deg, #F5F1EA 0%, #EFE8DD 100%)",
  },
  sneak: {
    /** Cool mist: light pane between dark “How” and dark “Why we’re different” */
    gradient: "linear-gradient(180deg, #E8EDF6 0%, #DFE6F2 50%, #E8EDF6 100%)",
    edge: "#E8EDF6",
  },
  differentiators: {
    /** Warm dark — distinct hue from cool navy 'how' section, gives visual separation */
    gradient: "linear-gradient(180deg, #1F1830 0%, #261D3A 50%, #1F1830 100%)",
    edge: "#1F1830",
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
