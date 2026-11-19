import sharp from 'sharp'
import { mkdir, readdir, unlink } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ASSETS = join(__dirname, '..', 'assets')
const OUT = join(__dirname, '..', 'public', 'img')

/* Photographic assets for the editorial rebuild. All opaque — no alpha.
   Primary (largest usable width) gets the base name; smaller widths feed srcset. */
const JOBS = [
  { src: 'Water droplet on a green leaf-4.png', base: 'karyo-hero-leaf', widths: [1600, 1280, 800] },
  { src: 'Soft dawn over young crop rows-1.png', base: 'karyo-application', widths: [1600, 1280, 800] },
  { src: 'Botanical Samples in Warm Ivory Light-5.png', base: 'karyo-contact', widths: [1600, 1280, 800] },
  { src: 'Swirling Ivory Liquid in Glass Vessel-2.png', base: 'karyo-formulation-study', widths: [1400, 900, 600] },
  { src: 'Glass petri dishes on ivory stone-6.png', base: 'karyo-microbial-study', widths: [900, 560] },
  { src: 'Neem sprig beside amber vial-3.png', base: 'karyo-botanical-study', widths: [900, 560] },
]

await mkdir(OUT, { recursive: true })

// clear previous outputs so stale images never ship
for (const f of await readdir(OUT)) {
  if (f.endsWith('.webp')) await unlink(join(OUT, f))
}

for (const job of JOBS) {
  const input = join(ASSETS, job.src)
  const meta = await sharp(input).metadata()
  const usable = job.widths.filter((w) => w <= meta.width).sort((a, b) => b - a)
  const widths = usable.length ? usable : [Math.min(meta.width, ...job.widths)]
  const primary = Math.max(...widths)
  for (const w of widths) {
    const name = w === primary ? `${job.base}.webp` : `${job.base}-${w}.webp`
    await sharp(input).resize({ width: w }).webp({ quality: 80 }).toFile(join(OUT, name))
    console.log('✓', name, `(${w}w of ${meta.width})`)
  }
}
console.log('Done.')
