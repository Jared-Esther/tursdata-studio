'use client'

import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { useState } from 'react'
import { gridRows } from '@/lib/studio-data'
import { cn } from '@/lib/utils'

const totalPages = 12

export function PdfReport() {
  const [page, setPage] = useState(1)

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-panel/70 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          <FileText className="size-3.5 text-primary" aria-hidden="true" />
          TursData_Executive_Report_Q2.pdf
        </span>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-panel/70 text-muted-foreground transition hover:text-foreground disabled:opacity-40"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <span className="px-2 font-mono text-[11px] text-muted-foreground">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-panel/70 text-muted-foreground transition hover:text-foreground disabled:opacity-40"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="scroll-thin flex-1 overflow-y-auto rounded-2xl border border-border bg-background/40 p-4 backdrop-blur-md sm:p-8">
        <article className="mx-auto max-w-3xl rounded-2xl border border-border bg-panel/80 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] sm:p-10">
          <header className="border-b border-border pb-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              TursData Studio · Marimo Deterministic Run snap_0f41
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-balance">
              Q2 2026 Supply Chain &amp; Pricing Executive Summary
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Composed from 3 joined sources (SupplyChain_2026, Pricing_Q2, CAD_Specs) on{' '}
              <span className="font-mono text-accent">SKU_ID</span> with inner-join semantics.
            </p>
          </header>

          <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: 'Net Revenue', v: '$418.2M' },
              { k: 'Gross Margin', v: '38.2%' },
              { k: 'Fill Rate', v: '96.4%' },
              { k: 'Cost Variance', v: '-2.8%' },
            ].map((m) => (
              <div key={m.k} className="rounded-xl border border-border bg-background/50 p-3">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{m.k}</p>
                <p className="mt-1 font-mono text-lg tabular-nums text-foreground">{m.v}</p>
              </div>
            ))}
          </section>

          <section className="mt-7 space-y-3">
            <h4 className="text-sm font-semibold text-foreground">1. Findings</h4>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              Blended margin expanded 110 bps quarter over quarter, driven by Helios Forge volume
              consolidation and a 2.1-day reduction in weighted lead time. Nordwind AG remains the
              largest exposure at 34% of landed units; a single-source dependency on{' '}
              <span className="font-mono text-foreground">PN-5120-D</span> continues to carry a
              -6.2% cost variance.
            </p>
            <h4 className="pt-2 text-sm font-semibold text-foreground">2. Top contributors</h4>
            <table className="w-full border-collapse text-[12px]">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-2 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    SKU_ID
                  </th>
                  <th scope="col" className="py-2 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Vendor
                  </th>
                  <th scope="col" className="py-2 text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Units
                  </th>
                  <th scope="col" className="py-2 text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Margin
                  </th>
                </tr>
              </thead>
              <tbody>
                {gridRows.slice(0, 5).map((r) => (
                  <tr key={r.sku} className="border-b border-border/50">
                    <td className="py-2 font-mono text-primary">{r.sku}</td>
                    <td className="py-2 text-foreground">{r.vendor}</td>
                    <td className="py-2 text-right font-mono tabular-nums text-foreground">
                      {r.units.toLocaleString('en-US')}
                    </td>
                    <td className="py-2 text-right font-mono tabular-nums text-accent">
                      {(r.margin * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4 className="pt-2 text-sm font-semibold text-foreground">3. Recommendations</h4>
            <ul className="space-y-1.5 text-[13px] leading-relaxed text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                Dual-source PN-5120-D before the August tooling window.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                Re-tier Kaito Metals pricing against the Q2 volume band.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                Promote the reactive margin model to the nightly production DAG.
              </li>
            </ul>
          </section>

          <footer className="mt-8 flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] text-muted-foreground">
            <span>Generated by Marimo reactive pipeline · deterministic</span>
            <span className={cn('text-primary')}>Page {page} of {totalPages}</span>
          </footer>
        </article>
      </div>
    </div>
  )
}
