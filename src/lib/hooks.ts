import { useEffect, useRef, useState, type RefObject } from 'react'

/** Reveal elements with `.reveal` as they scroll into view (reduced-motion → instant). */
export function useRevealObserver(): void {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reveal = (el: Element) => el.classList.add('is-visible')
    if (reduce || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(reveal)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )
    const observeAll = () =>
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el))
    observeAll()
    // catch .reveal nodes added later (e.g. the mobile story after a layout switch)
    const mo = new MutationObserver(observeAll)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

/** Reactive media-query boolean. */
export function useMediaQuery(query: string): boolean {
  const [match, setMatch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatch(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return match
}

/** Whether an element is on screen (for pausing offscreen animation). */
export function useInView<T extends Element>(ref: RefObject<T>, rootMargin = '0px'): boolean {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => setInView(entries[0].isIntersecting), {
      rootMargin,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])
  return inView
}

/** Document scroll progress 0..1, rAF-throttled. */
export function useScrollProgress(): number {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const h = document.documentElement
        const max = h.scrollHeight - h.clientHeight
        setP(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return p
}

/**
 * Smooth pointer parallax: translates the target element up to `max` px toward
 * the pointer, lerped. Desktop + enabled only. Never moves anything else.
 */
export function usePointerParallax(
  ref: RefObject<HTMLElement>,
  max = 10,
  enabled = true,
): void {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let raf = 0
    let running = true

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      tx = nx * max
      ty = ny * max
    }
    const tick = () => {
      if (!running) return
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      el.style.transform = ''
    }
  }, [ref, max, enabled])
}
