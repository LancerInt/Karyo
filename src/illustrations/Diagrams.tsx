/* Original conceptual illustrations for Karyo.
   These are explanatory diagrams of platform functions — not experimental
   evidence, and they do not depict a verified mechanism. */

const MONO = "'IBM Plex Mono', monospace"

/* ----------------------------------------------------------------
   Platform intro — annotated encapsulation figure (light section)
   ---------------------------------------------------------------- */
export function EncapsulationFigure({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 520"
      role="img"
      aria-label="Annotated diagram: an active enclosed by a protective matrix within a carrier system."
      fill="none"
    >
      <g className="ring-draw reveal" style={{ ['--dash' as string]: '1700' }}>
        <circle cx="250" cy="260" r="182" stroke="#17543b" strokeOpacity="0.28" strokeWidth="1.2" />
        <circle cx="250" cy="260" r="132" stroke="#17543b" strokeOpacity="0.45" strokeWidth="1.2" />
        <circle cx="250" cy="260" r="84" stroke="#17543b" strokeOpacity="0.7" strokeWidth="1.3" />
      </g>

      {/* carrier lattice hint */}
      <g stroke="#1e6b49" strokeOpacity="0.22" strokeWidth="1">
        <path d="M250 78 V442" strokeDasharray="2 10" />
        <path d="M68 260 H432" strokeDasharray="2 10" />
      </g>

      {/* the active + a couple of companions */}
      <circle cx="250" cy="260" r="26" fill="#d96b2b" />
      <circle cx="250" cy="260" r="40" fill="#d96b2b" fillOpacity="0.14" />
      <circle cx="224" cy="236" r="6" fill="#17543b" />
      <circle cx="276" cy="282" r="5" fill="#17543b" />
      <circle cx="268" cy="232" r="4" fill="#1e6b49" />

      {/* annotation leaders */}
      <g stroke="#17543b" strokeWidth="1">
        <path d="M250 234 L250 150 L120 150" strokeOpacity="0.5" />
        <path d="M334 260 L420 260 L420 206" strokeOpacity="0.5" />
        <path d="M250 392 L250 452 L372 452" strokeOpacity="0.5" />
      </g>
      <g fontFamily={MONO} fontSize="11" letterSpacing="1.2" fill="#3a4a40">
        <text x="120" y="140" textAnchor="start">01 · ACTIVE</text>
        <text x="420" y="198" textAnchor="end">02 · MATRIX</text>
        <text x="372" y="470" textAnchor="end">03 · CARRIER</text>
      </g>
      <circle cx="250" cy="150" r="3" fill="#d96b2b" />
      <circle cx="420" cy="260" r="3" fill="#d96b2b" />
      <circle cx="250" cy="452" r="3" fill="#d96b2b" />
    </svg>
  )
}

/* ----------------------------------------------------------------
   Capabilities — central protective-matrix core (dark section)
   ---------------------------------------------------------------- */
export function MatrixCore({ className }: { className?: string }) {
  const markers = [0, 1, 2, 3, 4, 5]
  return (
    <svg
      className={className}
      viewBox="0 0 360 360"
      role="img"
      aria-label="Central diagram: a protective matrix with six surrounding capability nodes."
      fill="none"
    >
      <g className="ring-draw reveal" style={{ ['--dash' as string]: '1300' }}>
        <circle cx="180" cy="180" r="150" stroke="#a7c3a8" strokeOpacity="0.2" strokeWidth="1" />
        <circle cx="180" cy="180" r="108" stroke="#a7c3a8" strokeOpacity="0.4" strokeWidth="1" />
        <circle cx="180" cy="180" r="66" stroke="#a7c3a8" strokeOpacity="0.7" strokeWidth="1.2" />
      </g>
      <circle cx="180" cy="180" r="24" fill="#d96b2b" />
      <circle cx="180" cy="180" r="24" fill="#d96b2b" fillOpacity="0.2" />
      {/* inner actives */}
      <circle cx="168" cy="170" r="4" fill="#f4efe3" />
      <circle cx="190" cy="188" r="3.4" fill="#f4efe3" />
      <circle cx="186" cy="166" r="3" fill="#e89b5e" />

      {markers.map((i) => {
        const a = (-90 + i * 60) * (Math.PI / 180)
        const cx = 180 + Math.cos(a) * 108
        const cy = 180 + Math.sin(a) * 108
        return (
          <g key={i}>
            <line
              x1={180 + Math.cos(a) * 66}
              y1={180 + Math.sin(a) * 66}
              x2={cx}
              y2={cy}
              stroke="#a7c3a8"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <circle cx={cx} cy={cy} r="7" fill="#0b2a1e" stroke="#a7c3a8" strokeWidth="1.2" />
            <text
              x={cx}
              y={cy + 3.4}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize="8"
              fill="#a7c3a8"
            >
              {i + 1}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ----------------------------------------------------------------
   Tech story — four stage visuals (dark)
   ---------------------------------------------------------------- */
export function StageVisual({ stage, className }: { stage: number; className?: string }) {
  const common = {
    className,
    viewBox: '0 0 440 440',
    fill: 'none' as const,
    role: 'img' as const,
  }
  if (stage === 0) {
    return (
      <svg {...common} aria-label="Stage one: sensitive microbial and botanical actives, unprotected.">
        <StageFrame label="01 · ACTIVES" />
        {scatter.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={p.r} fill={p.hot ? '#d96b2b' : '#e3ebdc'} fillOpacity={p.hot ? 1 : 0.85} />
            {p.hot && <circle cx={p.x} cy={p.y} r={p.r * 2.1} fill="#d96b2b" fillOpacity="0.12" />}
          </g>
        ))}
      </svg>
    )
  }
  if (stage === 1) {
    return (
      <svg {...common} aria-label="Stage two: a protective matrix forms around the actives.">
        <StageFrame label="02 · PROTECTIVE MATRIX" />
        <circle cx="220" cy="220" r="118" stroke="#a7c3a8" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="220" cy="220" r="82" stroke="#a7c3a8" strokeOpacity="0.55" strokeWidth="1.2" />
        {scatter.slice(0, 6).map((p, i) => {
          const a = (i / 6) * Math.PI * 2
          const x = 220 + Math.cos(a) * 34
          const y = 220 + Math.sin(a) * 34
          return <circle key={i} cx={x} cy={y} r={p.r} fill={p.hot ? '#d96b2b' : '#e3ebdc'} />
        })}
      </svg>
    )
  }
  if (stage === 2) {
    return (
      <svg {...common} aria-label="Stage three: several protected actives combined into one delivery system.">
        <StageFrame label="03 · INTEGRATED SYSTEM" />
        {[
          [160, 190],
          [280, 190],
          [220, 285],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="52" stroke="#a7c3a8" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx={x} cy={y} r="30" stroke="#a7c3a8" strokeOpacity="0.6" strokeWidth="1" />
            <circle cx={x} cy={y} r="10" fill={i === 0 ? '#d96b2b' : '#e3ebdc'} />
          </g>
        ))}
        <path d="M160 190 L280 190 L220 285 Z" stroke="#a7c3a8" strokeOpacity="0.25" strokeDasharray="3 6" />
      </svg>
    )
  }
  return (
    <svg {...common} aria-label="Stage four: the system translated into a practical application format.">
      <StageFrame label="04 · APPLICATION FORMAT" />
      <rect x="150" y="120" width="140" height="200" rx="10" stroke="#a7c3a8" strokeOpacity="0.5" strokeWidth="1.2" />
      <rect x="150" y="120" width="140" height="56" rx="10" fill="#a7c3a8" fillOpacity="0.1" />
      <line x1="150" y1="176" x2="290" y2="176" stroke="#a7c3a8" strokeOpacity="0.4" />
      {[205, 235, 265, 295].map((y, i) => (
        <circle key={i} cx={i % 2 ? 250 : 190} cy={y} r={i === 0 ? 7 : 4} fill={i === 0 ? '#d96b2b' : '#e3ebdc'} fillOpacity="0.85" />
      ))}
    </svg>
  )
}

const scatter = [
  { x: 150, y: 150, r: 7, hot: true },
  { x: 290, y: 130, r: 5, hot: false },
  { x: 320, y: 250, r: 6, hot: false },
  { x: 180, y: 300, r: 5, hot: false },
  { x: 250, y: 220, r: 4, hot: false },
  { x: 130, y: 240, r: 4, hot: false },
  { x: 300, y: 320, r: 5, hot: true },
  { x: 210, y: 120, r: 4, hot: false },
]

function StageFrame({ label }: { label: string }) {
  return (
    <>
      <rect x="1" y="1" width="438" height="438" rx="3" stroke="#a7c3a8" strokeOpacity="0.14" />
      <text x="24" y="40" fontFamily={MONO} fontSize="12" letterSpacing="1.5" fill="#a7c3a8">
        {label}
      </text>
      <line x1="24" y1="52" x2="120" y2="52" stroke="#d96b2b" strokeWidth="1.5" />
    </>
  )
}

/* ----------------------------------------------------------------
   Combination section — glyphs + stage visuals (dark)
   shapes: microbial = ring/circle, botanical = leaf
   ---------------------------------------------------------------- */
type Combo = 'mm' | 'bb' | 'mb'

export function ComboGlyph({ type, className }: { type: Combo; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {type === 'mm' && (
        <>
          <Microbe cx={14} cy={20} r={8} />
          <Microbe cx={26} cy={20} r={8} />
        </>
      )}
      {type === 'bb' && (
        <>
          <Leaf cx={13} cy={20} />
          <Leaf cx={27} cy={20} />
        </>
      )}
      {type === 'mb' && (
        <>
          <Microbe cx={14} cy={20} r={8} />
          <Leaf cx={27} cy={20} />
        </>
      )}
    </svg>
  )
}

function Microbe({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} stroke="#a7c3a8" strokeWidth="1.3" />
      <circle cx={cx} cy={cy} r={r * 0.35} fill="#d96b2b" />
    </g>
  )
}

function Leaf({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <path d="M0 -9 C7 -5 7 5 0 9 C-7 5 -7 -5 0 -9 Z" stroke="#c6d8bf" strokeWidth="1.3" fill="none" />
      <path d="M0 -9 L0 9" stroke="#c6d8bf" strokeWidth="1" strokeOpacity="0.7" />
    </g>
  )
}

export function ComboViz({ type, className }: { type: Combo; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 360"
      fill="none"
      role="img"
      aria-label={`Diagram of a ${comboLabel[type]} combination held within one protective matrix.`}
    >
      {/* shared protective matrix */}
      <ellipse cx="320" cy="180" rx="248" ry="140" stroke="#a7c3a8" strokeOpacity="0.28" strokeWidth="1.2" />
      <ellipse cx="320" cy="180" rx="196" ry="106" stroke="#a7c3a8" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="3 7" />
      <text x="320" y="330" textAnchor="middle" fontFamily={MONO} fontSize="11" letterSpacing="1.5" fill="#a7c3a8" opacity="0.8">
        ONE PROTECTIVE MATRIX
      </text>

      {type === 'mm' && (
        <>
          <ComboNode x={212} y={180} kind="m" label="MICROBIAL" />
          <ComboNode x={428} y={180} kind="m" label="MICROBIAL" />
        </>
      )}
      {type === 'bb' && (
        <>
          <ComboNode x={212} y={180} kind="b" label="BOTANICAL" />
          <ComboNode x={428} y={180} kind="b" label="BOTANICAL" />
        </>
      )}
      {type === 'mb' && (
        <>
          <ComboNode x={212} y={180} kind="m" label="MICROBIAL" />
          <ComboNode x={428} y={180} kind="b" label="BOTANICAL" />
        </>
      )}
      <line x1="262" y1="180" x2="378" y2="180" stroke="#a7c3a8" strokeOpacity="0.3" strokeDasharray="2 6" />
    </svg>
  )
}

function ComboNode({ x, y, kind, label }: { x: number; y: number; kind: 'm' | 'b'; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="58" stroke="#a7c3a8" strokeOpacity="0.4" strokeWidth="1" />
      {kind === 'm' ? (
        <g>
          <circle cx={x} cy={y} r="30" stroke="#c6d8bf" strokeWidth="1.4" />
          <circle cx={x} cy={y} r="11" fill="#d96b2b" />
          <circle cx={x - 14} cy={y - 8} r="3.5" fill="#e3ebdc" />
          <circle cx={x + 13} cy={y + 10} r="3" fill="#e3ebdc" />
        </g>
      ) : (
        <g transform={`translate(${x} ${y}) scale(2.4)`}>
          <path d="M0 -13 C10 -7 10 7 0 13 C-10 7 -10 -7 0 -13 Z" stroke="#c6d8bf" strokeWidth="0.7" fill="#17543b" fillOpacity="0.35" />
          <path d="M0 -13 L0 13 M0 -4 L6 -8 M0 3 L-6 -1" stroke="#c6d8bf" strokeWidth="0.6" />
        </g>
      )}
      <text x={x} y={y + 86} textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="1.4" fill="#c6d8bf">
        {label}
      </text>
    </g>
  )
}

export const comboLabel: Record<Combo, string> = {
  mm: 'microbial + microbial',
  bb: 'botanical + botanical',
  mb: 'microbial + botanical',
}

/* ----------------------------------------------------------------
   Delivery — small line icons (light section)
   ---------------------------------------------------------------- */
export function DeliveryIcon({ name, className }: { name: string; className?: string }) {
  const p = { stroke: 'currentColor', strokeWidth: 1.4, fill: 'none', strokeLinecap: 'round' as const }
  return (
    <svg className={className} viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
      {name === 'shield' && (
        <>
          <path d="M20 5 L33 10 V21 C33 29 27 34 20 36 C13 34 7 29 7 21 V10 Z" {...p} />
          <circle cx="20" cy="19" r="4" {...p} />
        </>
      )}
      {name === 'disperse' && (
        <>
          <circle cx="20" cy="20" r="3.5" {...p} />
          <circle cx="9" cy="12" r="2" {...p} />
          <circle cx="31" cy="12" r="2" {...p} />
          <circle cx="10" cy="29" r="2" {...p} />
          <circle cx="30" cy="29" r="2" {...p} />
          <path d="M17 18 L11 13 M23 18 L29 13 M17 23 L11 28 M23 23 L29 28" {...p} />
        </>
      )}
      {name === 'format' && (
        <>
          <rect x="10" y="7" width="20" height="26" rx="4" {...p} />
          <path d="M10 15 H30" {...p} />
          <circle cx="20" cy="24" r="4" {...p} />
        </>
      )}
      {name === 'water' && (
        <>
          <path d="M20 6 C26 15 30 20 30 26 A10 10 0 1 1 10 26 C10 20 14 15 20 6 Z" {...p} />
          <path d="M15 27 A5 5 0 0 0 20 32" {...p} />
        </>
      )}
    </svg>
  )
}
