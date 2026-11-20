type Props = {
  className?: string;
  showTagline?: boolean;
  tagline?: string;
  iconOnly?: boolean;
  withIcon?: boolean;
};

/**
 * Bridge app icon — "The Pause".
 * Rounded square with the pause-bar fermata above a lowercase "b".
 */
export function BridgeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      role="img"
      aria-label="Bridge"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="bridge-icon-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="10%" stopColor="#F4F1EC" />
          <stop offset="100%" stopColor="#ECEFEA" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="url(#bridge-icon-bg)" />
      <line
        x1="211"
        y1="110"
        x2="290"
        y2="110"
        stroke="#1F2A37"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <text
        x="256"
        y="395"
        fontFamily='Inter, "Helvetica Neue", Arial, sans-serif'
        fontWeight={450}
        fontSize={290}
        fill="#1F2A37"
        textAnchor="middle"
      >
        b
      </text>
    </svg>
  );
}

/**
 * Pause-bar mark (icon-only typographic glyph) for inline use within text and arcs.
 */
export function BridgePauseGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 12" className={className} role="img" aria-hidden>
      <line x1="6" y1="6" x2="34" y2="6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Bridge wordmark — typographic "bridge" in Inter Light with the pause-bar above.
 * Tracks the brand SVG (Bridge_Logo_ThePause).
 */
export function BridgeMark({
  className,
  showTagline = false,
  tagline = "Moments to catch your breath.",
  iconOnly = false,
  withIcon = false,
}: Props) {
  if (iconOnly) {
    return (
      <span className={className} aria-label="Bridge">
        <BridgeIcon className="h-full w-auto" />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-3 ${className ?? ""}`}
      aria-label="Bridge — Moments to catch your breath"
    >
      {withIcon && <BridgeIcon className="h-[1.6em] w-[1.6em] shrink-0 rounded-[22%]" />}
      <span className="inline-flex flex-col items-start leading-none">
        <span className="relative inline-flex flex-col items-center leading-none">
          <BridgePauseGlyph className="h-[0.18em] w-[0.55em] text-ink mb-[0.18em]" />
          <span
            className="font-sans font-light text-current"
            style={{
              fontSize: "1em",
              letterSpacing: "0.16em",
              lineHeight: 1,
            }}
          >
            bridge
          </span>
        </span>
        {showTagline && (
          <span className="mt-[0.55em] text-[0.32em] uppercase tracking-[0.22em] text-muted-ink font-normal">
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
