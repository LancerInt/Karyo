import { useEffect } from 'react'

/** Reveal elements marked `data-rise` once as they enter view. Used sparingly,
 *  only on a few lead blocks — not on every element. Reduced motion is handled
 *  in CSS, which keeps `[data-rise]` fully visible regardless. */
export function useReveal(): void {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-rise]').forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    )
    document.querySelectorAll('[data-rise]:not(.in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
