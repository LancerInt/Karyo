/* Original, labelled schematics for the combination tabs.
   Shapes + colour distinguish active types; a carrier boundary frames them.
   These explain combinations — they are not microscopy or efficacy claims. */

export type Combo = 'mm' | 'bb' | 'mb'

const MICROBE = '#1f7a4d'
const BOTANICAL = '#8a6d1f'
const CARRIER = '#0c3a2c'

function Microbe({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-34} y={-20} width={68} height={40} rx={20} fill={MICROBE} fillOpacity="0.14" stroke={MICROBE} strokeWidth="2" />
      <circle cx={-12} cy={0} r={5} fill={MICROBE} />
      <circle cx={8} cy={-4} r={4} fill="#e77928" />
      <circle cx={14} cy={8} r={3.5} fill={MICROBE} />
    </g>
  )
}

function Botanical({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0 -26 C26 -16 26 16 0 26 C-26 16 -26 -16 0 -26 Z"
        fill={BOTANICAL}
        fillOpacity="0.14"
        stroke={BOTANICAL}
        strokeWidth="2"
      />
      <path d="M0 -24 L0 24" stroke={BOTANICAL} strokeWidth="1.6" />
      <path d="M0 -8 L13 -15 M0 2 L-13 -5 M0 12 L12 6" stroke={BOTANICAL} strokeWidth="1.4" />
    </g>
  )
}

function Label({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="15" fontWeight="600" fill={CARRIER}>
      {children}
    </text>
  )
}

const NODES: Record<Combo, { left: 'm' | 'b'; right: 'm' | 'b'; leftLabel: string; rightLabel: string }> = {
  mm: { left: 'm', right: 'm', leftLabel: 'Microbial', rightLabel: 'Microbial' },
  bb: { left: 'b', right: 'b', leftLabel: 'Botanical', rightLabel: 'Botanical' },
  mb: { left: 'm', right: 'b', leftLabel: 'Microbial', rightLabel: 'Botanical' },
}

export function ComboViz({ type }: { type: Combo }) {
  const n = NODES[type]
  const title = `${n.leftLabel} and ${n.rightLabel} actives within one shared delivery carrier`
  return (
    <svg className="combo__viz" viewBox="0 0 680 360" role="img" aria-label={title}>
      {/* carrier boundary */}
      <rect x="26" y="40" width="628" height="280" rx="26" fill={CARRIER} fillOpacity="0.04" stroke={CARRIER} strokeOpacity="0.35" strokeWidth="2" />
      <rect x="26" y="40" width="628" height="280" rx="26" fill="none" stroke={CARRIER} strokeOpacity="0.14" strokeWidth="2" strokeDasharray="2 10" />
      <text x="48" y="70" fontFamily="'Inter', sans-serif" fontSize="12.5" fontWeight="600" letterSpacing="1.5" fill={CARRIER} opacity="0.65">
        SHARED DELIVERY CARRIER
      </text>

      {/* connection between the two actives */}
      <line x1="238" y1="188" x2="442" y2="188" stroke={CARRIER} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="3 7" />

      {n.left === 'm' ? <Microbe x={192} y={188} /> : <Botanical x={192} y={188} />}
      {n.right === 'm' ? <Microbe x={488} y={188} /> : <Botanical x={488} y={188} />}

      <Label x={192} y={262}>{n.leftLabel}</Label>
      <Label x={488} y={262}>{n.rightLabel}</Label>
    </svg>
  )
}

export function ComboSwatch({ type }: { type: Combo }) {
  const n = NODES[type]
  return (
    <svg className="combo__swatch" viewBox="0 0 30 30" aria-hidden="true">
      {n.left === 'm' ? (
        <rect x="2" y="10" width="13" height="10" rx="5" fill={MICROBE} fillOpacity="0.2" stroke={MICROBE} strokeWidth="1.6" />
      ) : (
        <path d="M8 4 C14 7 14 15 8 18 C2 15 2 7 8 4 Z" transform="translate(0 4)" fill={BOTANICAL} fillOpacity="0.2" stroke={BOTANICAL} strokeWidth="1.5" />
      )}
      {n.right === 'm' ? (
        <rect x="15" y="10" width="13" height="10" rx="5" fill={MICROBE} fillOpacity="0.2" stroke={MICROBE} strokeWidth="1.6" />
      ) : (
        <path d="M22 4 C28 7 28 15 22 18 C16 15 16 7 22 4 Z" transform="translate(0 4)" fill={BOTANICAL} fillOpacity="0.2" stroke={BOTANICAL} strokeWidth="1.5" />
      )}
    </svg>
  )
}
