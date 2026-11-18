/* Conceptual SVG scenes for the Protect / Combine / Deliver story.
   Drawn on the dark stage; strokes light, actives in accent/amber.
   Explanatory only — not microscopy, kinetics, or efficacy. */

const LIGHT = '#b7c7bd'
const LIGHT2 = '#8ba292'
const ACCENT = '#e77928'
const IVORY = '#f5f3eb'

const label = {
  fontFamily: "'Inter', sans-serif",
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.08em',
} as const

export function ProtectSVG() {
  return (
    <svg className="st-svg" viewBox="0 0 600 440" role="img" aria-label="A single active held within a drawn carrier boundary.">
      {/* carrier boundary (draws in) */}
      <rect className="draw" style={{ ['--len' as string]: 1500 }} x="120" y="62" width="360" height="316" rx="46"
        fill="none" stroke={LIGHT} strokeOpacity="0.9" strokeWidth="2" />
      {/* soft inner matrix hints */}
      <g stroke={LIGHT} strokeOpacity="0.2" strokeWidth="1.3" fill="none">
        <circle cx="300" cy="220" r="118" />
        <circle cx="300" cy="220" r="90" strokeDasharray="2 9" />
      </g>
      {/* active */}
      <circle cx="300" cy="220" r="52" fill={ACCENT} />
      <circle cx="300" cy="220" r="66" fill={ACCENT} fillOpacity="0.14" />
      <circle cx="284" cy="206" r="6" fill={IVORY} />
      <circle cx="312" cy="230" r="5" fill={IVORY} />
      <circle cx="306" cy="202" r="4" fill="#ffd9b3" />
      {/* leaders */}
      <g stroke={LIGHT} strokeOpacity="0.5" strokeWidth="1">
        <path d="M352 196 L430 150" />
      </g>
      <text x="436" y="146" style={label} fill={LIGHT} textAnchor="start">ACTIVE</text>
      <text x="136" y="50" style={label} fill={LIGHT2}>CARRIER BOUNDARY</text>
    </svg>
  )
}

export function CombineSVG() {
  return (
    <svg className="st-svg" viewBox="0 0 600 440" role="img" aria-label="Two different actives framed within one shared delivery boundary.">
      <ellipse className="draw" style={{ ['--len' as string]: 1700 }} cx="300" cy="224" rx="250" ry="150"
        fill="none" stroke={LIGHT} strokeOpacity="0.55" strokeWidth="2" />
      <ellipse cx="300" cy="224" rx="196" ry="112" fill="none" stroke={LIGHT} strokeOpacity="0.16" strokeWidth="1.4" strokeDasharray="2 10" />
      <line x1="238" y1="224" x2="362" y2="224" stroke={LIGHT} strokeOpacity="0.4" strokeWidth="2" strokeDasharray="3 8" />
      <text x="96" y="398" style={label} fill={LIGHT} textAnchor="middle">MICROBIAL</text>
      <text x="504" y="398" style={label} fill={LIGHT} textAnchor="middle">BOTANICAL</text>
      <text x="300" y="60" style={label} fill={LIGHT2} textAnchor="middle">ONE SHARED DELIVERY SYSTEM</text>
    </svg>
  )
}

function DeliverBox({ x, lines }: { x: number; lines: string[] }) {
  return (
    <g>
      <rect className="draw" style={{ ['--len' as string]: 560 }} x={x} y="156" width="150" height="150" rx="16"
        fill={LIGHT} fillOpacity="0.04" stroke={LIGHT} strokeOpacity="0.7" strokeWidth="2" />
      <circle cx={x + 75} cy="196" r="12" fill={ACCENT} fillOpacity="0.9" />
      <text x={x + 75} y={lines.length > 1 ? 244 : 250} textAnchor="middle" style={{ ...label, fontSize: 13 }} fill={IVORY}>
        {lines.map((l, i) => (
          <tspan key={i} x={x + 75} dy={i === 0 ? 0 : 18}>
            {l}
          </tspan>
        ))}
      </text>
    </g>
  )
}

export function DeliverSVG() {
  return (
    <svg className="st-svg" viewBox="0 0 600 440" role="img" aria-label="Three labelled stages — active system, delivery design, application requirements — connected in sequence.">
      {/* connecting paths */}
      <g fill="none" stroke={ACCENT} strokeOpacity="0.8" strokeWidth="2">
        <path className="draw" style={{ ['--len' as string]: 70 }} d="M196 231 L230 231" />
        <path className="draw" style={{ ['--len' as string]: 70 }} d="M378 231 L412 231" />
      </g>
      <g fill={ACCENT}>
        <path d="M228 231 l-9 -5 v10 z" />
        <path d="M410 231 l-9 -5 v10 z" />
      </g>
      <DeliverBox x={40} lines={['Active', 'system']} />
      <DeliverBox x={226} lines={['Delivery', 'design']} />
      <DeliverBox x={412} lines={['Application', 'requirements']} />
      <text x="300" y="66" style={label} fill={LIGHT2} textAnchor="middle">FROM ACTIVE TO APPLICATION</text>
    </svg>
  )
}
