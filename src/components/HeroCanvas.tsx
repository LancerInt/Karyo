import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/hooks'

type Capsule = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  spin: number
  phase: number
  cores: { a: number; d: number; s: number; hot: boolean }[]
}

/**
 * Conceptual hero animation: clusters of actives held within a protective
 * matrix, drifting toward a leaf surface. Purely illustrative — no claim of a
 * real mechanism. Falls back to a static poster under reduced-motion.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let capsules: Capsule[] = []
    let raf = 0
    let running = true

    const COUNT = () => (window.innerWidth < 760 ? 7 : 12)

    const makeCapsule = (seedTop = false): Capsule => {
      const r = 26 + Math.random() * 46
      const coreN = 3 + Math.floor(Math.random() * 4)
      const cores = Array.from({ length: coreN }, (_, i) => ({
        a: Math.random() * Math.PI * 2,
        d: Math.random() * (r * 0.5),
        s: 1.6 + Math.random() * 2.2,
        hot: i === 0 && Math.random() > 0.45,
      }))
      return {
        x: w * (0.45 + Math.random() * 0.6),
        y: seedTop ? -r - Math.random() * h * 0.5 : Math.random() * h,
        vx: -0.08 - Math.random() * 0.14,
        vy: 0.14 + Math.random() * 0.22,
        r,
        spin: (Math.random() - 0.5) * 0.004,
        phase: Math.random() * Math.PI * 2,
        cores,
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      capsules = Array.from({ length: COUNT() }, () => makeCapsule(false))
    }

    const drawLeaf = () => {
      // faint leaf-surface arc near the bottom the actives drift toward
      ctx.save()
      ctx.globalAlpha = 0.5
      const baseY = h * 0.98
      const grad = ctx.createLinearGradient(0, baseY - 180, 0, h)
      grad.addColorStop(0, 'rgba(30,107,73,0)')
      grad.addColorStop(1, 'rgba(23,84,59,0.55)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(0, h)
      ctx.lineTo(0, baseY)
      ctx.quadraticCurveTo(w * 0.5, baseY - 150, w, baseY - 40)
      ctx.lineTo(w, h)
      ctx.closePath()
      ctx.fill()
      // central vein
      ctx.globalAlpha = 0.16
      ctx.strokeStyle = 'rgba(167,195,168,1)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(w * 0.5, baseY - 150)
      ctx.lineTo(w * 0.78, h)
      ctx.stroke()
      ctx.restore()
    }

    const render = (t: number) => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      drawLeaf()

      for (const c of capsules) {
        c.x += c.vx
        c.y += c.vy
        c.phase += c.spin + 0.01
        // dissolve into the leaf surface, then respawn at top
        if (c.y - c.r > h * 0.9 || c.x + c.r < -40) {
          Object.assign(c, makeCapsule(true))
        }

        const breathe = 1 + Math.sin(t * 0.0012 + c.phase) * 0.04

        // protective matrix — concentric translucent rings
        ctx.save()
        ctx.translate(c.x, c.y)
        for (let ring = 0; ring < 3; ring++) {
          const rr = c.r * breathe * (1 - ring * 0.2)
          ctx.beginPath()
          ctx.arc(0, 0, rr, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(167,195,168,${0.14 + ring * 0.06})`
          ctx.lineWidth = ring === 2 ? 1.2 : 0.8
          ctx.stroke()
        }
        // soft inner glow
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, c.r * breathe)
        g.addColorStop(0, 'rgba(30,107,73,0.22)')
        g.addColorStop(1, 'rgba(30,107,73,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(0, 0, c.r * breathe, 0, Math.PI * 2)
        ctx.fill()

        // actives held inside
        for (const core of c.cores) {
          const ca = core.a + c.phase * 1.4
          const cx = Math.cos(ca) * core.d
          const cy = Math.sin(ca) * core.d
          ctx.beginPath()
          ctx.arc(cx, cy, core.s, 0, Math.PI * 2)
          ctx.fillStyle = core.hot ? 'rgba(217,107,43,0.95)' : 'rgba(227,235,220,0.9)'
          ctx.fill()
          if (core.hot) {
            ctx.beginPath()
            ctx.arc(cx, cy, core.s * 2.4, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(232,155,94,0.18)'
            ctx.fill()
          }
        }
        ctx.restore()
      }
      raf = requestAnimationFrame(render)
    }

    resize()
    raf = requestAnimationFrame(render)

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    const onVis = () => {
      running = !document.hidden
      if (running) raf = requestAnimationFrame(render)
      else cancelAnimationFrame(raf)
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduced])

  if (reduced) return null
  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />
}
