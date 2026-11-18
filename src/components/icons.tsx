export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={`arr ${className ?? ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const S = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** Consistent 24×24 line icons for the capability list. */
export function CapIcon({ name }: { name: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      {name === 'protect' && (
        <>
          <path d="M12 3l7 2.5v5c0 4.3-3 7.1-7 8.5-4-1.4-7-4.2-7-8.5v-5L12 3z" {...S} />
          <path d="M9 11.5l2 2 4-4" {...S} />
        </>
      )}
      {name === 'encapsulate' && (
        <>
          <circle cx="12" cy="12" r="8.2" {...S} />
          <circle cx="12" cy="12" r="3.4" {...S} />
          <path d="M12 3.8v3M12 17.2v3M3.8 12h3M17.2 12h3" {...S} />
        </>
      )}
      {name === 'integrate' && (
        <>
          <circle cx="9" cy="12" r="5.2" {...S} />
          <circle cx="15" cy="12" r="5.2" {...S} />
        </>
      )}
      {name === 'delivery' && (
        <>
          <circle cx="5" cy="12" r="2.2" {...S} />
          <circle cx="19" cy="6" r="2.2" {...S} />
          <circle cx="19" cy="18" r="2.2" {...S} />
          <path d="M7.1 11l9.8-4.4M7.1 13l9.8 4.4" {...S} />
        </>
      )}
      {name === 'format' && (
        <>
          <path d="M12 3l8 4.3v9.4L12 21l-8-4.3V7.3L12 3z" {...S} />
          <path d="M4 7.5l8 4.3 8-4.3M12 11.8V21" {...S} />
        </>
      )}
      {name === 'stability' && (
        <>
          <path d="M12 3.5c3.2 3.4 5 5.8 5 8.4a5 5 0 11-10 0c0-2.6 1.8-5 5-8.4z" {...S} />
          <path d="M9.5 13.2a2.6 2.6 0 002.5 2.4" {...S} />
        </>
      )}
    </svg>
  )
}
