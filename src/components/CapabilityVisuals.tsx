/* Labelled SVG scenes per capability, drawn on the ivory stage.
   Consistent line weight + green/amber/ivory palette. Explanatory only. */

const FOREST = '#0c3a2c'
const ACCENT = '#e77928'
const AMBER = '#c88a1e'
const INK = '#44574d'

const lbl = { fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 } as const
const dash = (len: number) => ({ ['--len' as string]: len })

export function CapVisual({ id }: { id: string }) {
  switch (id) {
    case 'protect':
      return (
        <svg viewBox="0 0 520 340" role="img" aria-label="A boundary drawn around a single active.">
          <rect className="draw" style={dash(1200)} x="150" y="50" width="220" height="240" rx="40" fill="none" stroke={FOREST} strokeWidth="2" />
          <circle className="fade" cx="260" cy="170" r="44" fill={ACCENT} />
          <circle className="fade" cx="246" cy="158" r="5" fill="#fff" />
          <circle className="fade" cx="272" cy="180" r="4" fill="#fff" />
          <text x="260" y="318" textAnchor="middle" style={lbl} fill={INK}>Protective boundary around the active</text>
        </svg>
      )
    case 'matrix':
      return (
        <svg viewBox="0 0 520 340" role="img" aria-label="Layered carrier shapes around a core.">
          {[96, 70, 46].map((r, i) => (
            <circle key={r} className="draw" style={dash(900)} cx="260" cy="160" r={r} fill="none" stroke={FOREST} strokeOpacity={0.4 + i * 0.2} strokeWidth="2" />
          ))}
          <circle className="fade" cx="260" cy="160" r="22" fill={ACCENT} />
          <circle className="fade" cx="300" cy="120" r="7" fill={AMBER} />
          <circle className="fade" cx="214" cy="192" r="6" fill={FOREST} />
          <text x="260" y="318" textAnchor="middle" style={lbl} fill={INK}>Layered matrix &amp; carrier</text>
        </svg>
      )
    case 'integrate':
      return (
        <svg viewBox="0 0 520 340" role="img" aria-label="Two active groups within one system.">
          <rect className="draw" style={dash(1300)} x="70" y="60" width="380" height="200" rx="46" fill="none" stroke={FOREST} strokeWidth="2" />
          <g className="fade">
            {[[170, 140], [150, 175], [195, 185]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="14" fill={ACCENT} fillOpacity={0.9} />
            ))}
            {[[330, 140], [355, 178], [310, 182]].map(([x, y], i) => (
              <path key={i} d={`M${x} ${y - 14} C${x + 14} ${y - 8} ${x + 14} ${y + 8} ${x} ${y + 14} C${x - 14} ${y + 8} ${x - 14} ${y - 8} ${x} ${y - 14} Z`} fill={AMBER} fillOpacity="0.8" />
            ))}
          </g>
          <text x="170" y="300" textAnchor="middle" style={lbl} fill={INK}>Microbial</text>
          <text x="345" y="300" textAnchor="middle" style={lbl} fill={INK}>Botanical</text>
        </svg>
      )
    case 'delivery':
      return (
        <svg viewBox="0 0 520 340" role="img" aria-label="Four delivery behaviours around a central active.">
          <circle className="fade" cx="260" cy="160" r="20" fill={ACCENT} />
          {[
            { x: 120, y: 90, t: 'Disperse' },
            { x: 400, y: 90, t: 'Suspend' },
            { x: 120, y: 234, t: 'Solubilise' },
            { x: 400, y: 234, t: 'Release' },
          ].map((n, i) => (
            <g key={i}>
              <path className="draw" style={dash(240)} d={`M260 160 L${n.x} ${n.y}`} stroke={FOREST} strokeOpacity="0.6" strokeWidth="1.6" fill="none" />
              <circle className="fade" cx={n.x} cy={n.y} r="9" fill="none" stroke={FOREST} strokeWidth="2" />
              <text x={n.x} y={n.y - 16} textAnchor="middle" style={lbl} fill={INK}>{n.t}</text>
            </g>
          ))}
        </svg>
      )
    case 'format':
      return (
        <svg viewBox="0 0 520 340" role="img" aria-label="A delivery system branching into practical formats.">
          <circle className="fade" cx="110" cy="170" r="24" fill={ACCENT} />
          {[90, 170, 250].map((y, i) => (
            <g key={y}>
              <path className="draw" style={dash(320)} d={`M134 170 C210 170 210 ${y} 286 ${y}`} stroke={FOREST} strokeOpacity="0.6" strokeWidth="1.8" fill="none" />
              <rect className="fade" x="300" y={y - 22} width="140" height="44" rx="10" fill="none" stroke={FOREST} strokeWidth="2" />
              <circle className="fade" cx="324" cy={y} r="7" fill={AMBER} fillOpacity={0.5 + i * 0.2} />
            </g>
          ))}
          <text x="110" y="226" textAnchor="middle" style={lbl} fill={INK}>Delivery system</text>
          <text x="370" y={28} textAnchor="middle" style={lbl} fill={INK}>Practical formats</text>
        </svg>
      )
    default: // compat
      return (
        <svg viewBox="0 0 520 340" role="img" aria-label="Water and tank compatibility context.">
          <path className="draw" style={dash(900)} d="M150 70 h220 a16 16 0 0 1 16 16 v170 a24 24 0 0 1 -24 24 H158 a24 24 0 0 1 -24 -24 V86 a16 16 0 0 1 16 -16 z" fill="none" stroke={FOREST} strokeWidth="2" />
          <path className="fade" d="M136 180 q60 22 124 0 t124 0 v76 a24 24 0 0 1 -24 24 H160 a24 24 0 0 1 -24 -24 z" fill={ACCENT} fillOpacity="0.14" />
          <path className="draw" style={dash(420)} d="M136 180 q60 22 124 0 t124 0" fill="none" stroke={ACCENT} strokeWidth="2" />
          <circle className="fade" cx="300" cy="140" r="10" fill={AMBER} />
          <text x="260" y="316" textAnchor="middle" style={lbl} fill={INK}>Water &amp; tank compatibility</text>
        </svg>
      )
  }
}
