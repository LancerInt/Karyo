import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'assets')
const outDir = join(root, 'public', 'img')
mkdirSync(outDir, { recursive: true })

// source PNG → [intended output base, responsive widths]
const jobs = [
  { src: 'Emerald protective sphere above a leaf-1.png', base: 'karyo-hero', widths: [1600, 1280, 800], q: 80 },
  { src: 'Sage hydrogel matrix revealing active core-2.png', base: 'karyo-matrix', widths: [1100, 700], q: 82 },
  { src: 'Dew-kissed crops at dawn-3.png', base: 'karyo-field', widths: [1600, 1280, 800], q: 80 },
]

for (const job of jobs) {
  const input = join(srcDir, job.src)
  const meta = await sharp(input).metadata()
  // widths we can actually produce (never upscale); ensure at least the native width
  let usable = job.widths.filter((w) => w <= meta.width)
  if (usable.length === 0) usable = [meta.width]
  const primary = Math.max(...usable)
  for (const w of usable) {
    // the largest produced width keeps the intended output name (e.g. karyo-hero.webp)
    const name = w === primary ? `${job.base}.webp` : `${job.base}-${w}.webp`
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: job.q, effort: 5 })
      .toFile(join(outDir, name))
    console.log(`${name}  (${w}w)`)
  }
}
console.log('done')
