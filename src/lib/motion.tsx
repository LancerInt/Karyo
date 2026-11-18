import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type MotionState = {
  reduced: boolean
  paused: boolean
  setPaused: (b: boolean) => void
  /** true when continuous/decorative motion should not run */
  motionOff: boolean
}

const MotionCtx = createContext<MotionState>({
  reduced: false,
  paused: false,
  setPaused: () => {},
  motionOff: false,
})

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const motionOff = reduced || paused
  return (
    <MotionCtx.Provider value={{ reduced, paused, setPaused, motionOff }}>{children}</MotionCtx.Provider>
  )
}

export const useMotion = () => useContext(MotionCtx)

/** Floating-dot "Pause motion" control (hidden when reduced-motion is on). */
export function PauseMotionButton() {
  const { reduced, paused, setPaused } = useMotion()
  if (reduced) return null
  return (
    <button
      className="motionbtn"
      type="button"
      aria-pressed={paused}
      onClick={() => setPaused(!paused)}
      title={paused ? 'Resume decorative motion' : 'Pause decorative motion'}
    >
      <span className="motionbtn__ic" aria-hidden="true">
        {paused ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M3 2l9 5-9 5z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="3" y="2" width="3" height="10" rx="1" />
            <rect x="8" y="2" width="3" height="10" rx="1" />
          </svg>
        )}
      </span>
      {paused ? 'Resume motion' : 'Pause motion'}
    </button>
  )
}
