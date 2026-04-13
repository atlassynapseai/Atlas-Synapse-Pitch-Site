export function DoodleDefs() {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true">
      <defs>
        <filter id="doodle">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={3} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={1.8} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
