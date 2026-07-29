'use client'

import { ChevronLeft, ChevronRight, Maximize2, Presentation } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Slide = {
  kicker: string
  title: string
  body: string
  stats: { k: string; v: string }[]
}

const slides: Slide[] = [
  {
    kicker: 'Q2 2026 · Board Review',
    title: 'Multi-table pipeline delivered 38.2% blended margin',
    body: 'Three sources joined deterministically on SKU_ID. Marimo recomputes 42 cells on every source mutation, so this deck is always current with the vault.',
    stats: [
      { k: 'Revenue', v: '$418.2M' },
      { k: 'Margin', v: '38.2%' },
      { k: 'Fill rate', v: '96.4%' },
    ],
  },
  {
    kicker: 'Operations',
    title: 'Lead time compressed by 2.1 days',
    body: 'Vendor consolidation toward Helios Forge and Tessera Ltd removed two handoffs from the inbound lane, releasing $6.4M of working capital.',
    stats: [
      { k: 'Lead time', v: '17.8d' },
      { k: 'Lanes', v: '128' },
      { k: 'Capital freed', v: '$6.4M' },
    ],
  },
  {
    kicker: 'Risk',
    title: 'Single-source exposure on PN-5120-D',
    body: 'A -6.2% cost variance and a 31-day lead time concentrate risk in one part. Dual-sourcing is recommended before the August tooling window.',
    stats: [
      { k: 'Variance', v: '-6.2%' },
      { k: 'Lead', v: '31d' },
      { k: 'Exposure', v: '34%' },
    ],
  },
  {
    kicker: 'Next',
    title: 'Promote the margin model to nightly production',
    body: 'The reactive DAG runs in 1.8s across 1.28M rows with 38/42 cache hits — ready to schedule without a rewrite.',
    stats: [
      { k: 'Runtime', v: '1.8s' },
      { k: 'Cache hits', v: '38/42' },
      { k: 'Rows', v: '1.28M' },
    ],
  },
]

export function PptDeck() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-panel/70 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          <Presentation className="size-3.5 text-primary" aria-hidden="true" />
          Board_Deck_Q2.pptx · 16:9
        </span>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Previous slide"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-panel/70 text-muted-foreground transition hover:text-foreground disabled:opacity-40"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <span className="px-2 font-mono text-[11px] text-muted-foreground">
            {index + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
            disabled={index === slides.length - 1}
            aria-label="Next slide"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-panel/70 text-muted-foreground transition hover:text-foreground disabled:opacity-40"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Present full screen"
            className="ml-1 inline-flex size-8 items-center justify-center rounded-lg border border-border bg-panel/70 text-muted-foreground transition hover:text-primary"
          >
            <Maximize2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="scroll-thin flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl">
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-panel via-background to-panel p-6 backdrop-blur-md sm:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{slide.kicker}</p>
            <h3 className="mt-3 max-w-2xl text-xl font-semibold leading-snug tracking-tight text-balance sm:text-3xl">
              {slide.title}
            </h3>
            <p className="mt-3 max-w-xl text-[12px] leading-relaxed text-muted-foreground sm:text-sm">
              {slide.body}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {slide.stats.map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 backdrop-blur"
                >
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.k}</p>
                  <p className="mt-0.5 font-mono text-lg tabular-nums text-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-4 gap-3">
            {slides.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index}
                  className={cn(
                    'aspect-video w-full rounded-xl border p-2 text-left transition',
                    i === index
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-border bg-panel/60 hover:border-primary/30',
                  )}
                >
                  <span className="font-mono text-[9px] text-muted-foreground">{i + 1}</span>
                  <span className="mt-1 line-clamp-2 block text-[10px] leading-tight text-foreground">
                    {s.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
