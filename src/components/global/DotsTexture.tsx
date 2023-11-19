export default function DotsTexture() {
  return (
    <svg
      width="100%"
      height="100%"
      className="absolute left-0 top-0 -z-50 opacity-30 dark:opacity-80"
    >
      <pattern
        id="pattern-circles"
        x="0"
        y="0"
        width="5"
        height="5"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
      >
        <circle
          id="pattern-circle"
          cx="2.5"
          cy="2.5"
          r="0.5"
          fill="#3b3b3b"
        ></circle>
      </pattern>

      <rect
        id="rect"
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#pattern-circles)"
      ></rect>
    </svg>
  );
}
