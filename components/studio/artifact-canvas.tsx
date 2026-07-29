'use client'

import {
  BarChart3,
  Box,
  ChevronDown,
  Download,
  FileText,
  Loader2,
  Package,
  Presentation,
  Table2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { exportTargets } from '@/lib/studio-data'
import { cn } from '@/lib/utils'
import { AnalyticalTable } from './views/analytical-table'
import { CadBlueprint } from './views/cad-blueprint'
import { InteractiveChart } from './views/interactive-chart'
import { PdfReport } from './views/pdf-report'
import { PptDeck } from './views/ppt-deck'

const tabs = [
  { id: 'table', label: 'Analytical Table', icon: Table2 },
  { id: 'chart', label: 'Interactive Chart', icon: BarChart3 },
  { id: 'pdf', label: 'PDF Report', icon: FileText },
  { id: 'ppt', label: 'PPT Presentation', icon: Presentation },
  { id: 'cad', label: 'CAD Blueprint', icon: Box },
] as const

type TabId = (typeof tabs)[number]['id']

export function ArtifactCanvas({ running }: { running: boolean }) {
  const [tab, setTab] = useState<TabId>('table')

  return (
    <section aria-label="Finished Product Vault and Artifacts Canvas" className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-panel/40 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
            <Package className="size-4" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold tracking-tight">Finished Product Vault</h2>
            <p className="text-[11px] text-muted-foreground">生产成品库 · Stage 3 — Artifacts canvas</p>
          </div>
        </div>
        <div className="ml-auto">
          <ExportMenu />
        </div>
      </div>

      <div className="scroll-thin flex gap-1 overflow-x-auto border-b border-border bg-background/40 px-3 py-2" role="tablist" aria-label="Artifact views">
        {tabs.map((t) => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={cn(
                'inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border px-3 text-xs font-medium transition',
                active
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-transparent text-muted-foreground hover:border-border hover:bg-panel/60 hover:text-foreground',
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {t.label}
            </button>
          )
        })}
      </div>

      <div className="relative min-h-0 flex-1 p-4">
        {running && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <p className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-panel/90 px-4 py-2.5 font-mono text-xs text-accent">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Marimo recomputing artifacts…
            </p>
          </div>
        )}
        <div role="tabpanel" className="h-full">
          {tab === 'table' && <AnalyticalTable />}
          {tab === 'chart' && <InteractiveChart />}
          {tab === 'pdf' && <PdfReport />}
          {tab === 'ppt' && <PptDeck />}
          {tab === 'cad' && <CadBlueprint />}
        </div>
      </div>
    </section>
  )
}

function ExportMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-panel/70 px-3 text-xs font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
      >
        <Download className="size-4" aria-hidden="true" />
        Export Artifacts
        <ChevronDown className={cn('size-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-panel/95 p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md"
        >
          {exportTargets.map((t) => (
            <button
              key={t.ext}
              type="button"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition hover:bg-primary/10"
            >
              <span className="inline-flex w-12 shrink-0 justify-center rounded-lg border border-primary/25 bg-primary/10 py-1 font-mono text-[10px] text-primary">
                {t.ext}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-medium text-foreground">{t.label}</span>
                <span className="block font-mono text-[10px] text-muted-foreground">{t.detail}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
