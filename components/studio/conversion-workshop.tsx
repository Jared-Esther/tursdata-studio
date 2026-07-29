'use client'

import {
  ChevronDown,
  CircleDot,
  Clock,
  Cpu,
  GitMerge,
  History,
  Loader2,
  Play,
  Workflow,
} from 'lucide-react'
import { useState } from 'react'
import { pipelineCells, snapshots } from '@/lib/studio-data'
import { cn } from '@/lib/utils'

type Props = {
  selectedCount: number
  running: boolean
  onExecute: () => void
  lastRun: string
}

export function ConversionWorkshop({ selectedCount, running, onExecute, lastRun }: Props) {
  const [open, setOpen] = useState(true)
  const [historyOpen, setHistoryOpen] = useState(false)

  return (
    <section
      aria-label="Conversion Workshop"
      className="border-b border-border bg-panel/50 backdrop-blur-md"
    >
      <div className="flex flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
            <Workflow className="size-4" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold tracking-tight">Conversion Workshop</h2>
            <p className="text-[11px] text-muted-foreground">生产转化车间 · Stage 2</p>
          </div>
        </div>

        <span className="hidden h-8 items-center gap-2 rounded-full border border-border bg-background/60 px-3 font-mono text-[11px] text-muted-foreground md:inline-flex">
          <GitMerge className="size-3.5 text-primary" aria-hidden="true" />
          Inner Join on <span className="text-foreground">SKU_ID</span>
        </span>

        <span
          className={cn(
            'inline-flex h-8 items-center gap-2 rounded-full border px-3 font-mono text-[11px]',
            running
              ? 'border-accent/40 bg-accent/10 text-accent'
              : 'border-primary/30 bg-primary/10 text-primary',
          )}
        >
          {running ? (
            <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <CircleDot className="size-3.5" aria-hidden="true" />
          )}
          Marimo {running ? 'recomputing DAG…' : 'reactive · up to date'}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHistoryOpen((v) => !v)}
            aria-expanded={historyOpen}
            className={cn(
              'inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-xs font-medium transition',
              historyOpen
                ? 'border-primary/40 bg-primary/10 text-primary'
                : 'border-border bg-background/60 text-muted-foreground hover:border-primary/30 hover:text-foreground',
            )}
          >
            <History className="size-4" aria-hidden="true" />
            Snapshot History
          </button>
          <button
            type="button"
            onClick={onExecute}
            disabled={running || selectedCount === 0}
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {running ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Play className="size-4" aria-hidden="true" />
            )}
            Execute Marimo Calculation
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle pipeline details"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition hover:text-foreground"
          >
            <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div className="grid gap-3 border-t border-border/70 px-4 py-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-border bg-background/40 p-4">
            <div className="flex items-center justify-between">
              <h3 className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Cpu className="size-3.5 text-primary" aria-hidden="true" />
                Reactive Pipeline · {selectedCount} tables bound
              </h3>
              <span className="font-mono text-[11px] text-muted-foreground">last run {lastRun}</span>
            </div>
            <ol className="mt-3 flex flex-wrap items-center gap-2">
              {pipelineCells.map((cell, i) => {
                const active = running && i === 2
                return (
                  <li key={cell.id} className="flex items-center gap-2">
                    <span
                      className={cn(
                        'flex items-center gap-2 rounded-xl border px-2.5 py-1.5 font-mono text-[11px]',
                        active
                          ? 'border-accent/40 bg-accent/10 text-accent'
                          : 'border-border bg-panel/70 text-muted-foreground',
                      )}
                    >
                      <span className="text-[9px] text-border">{cell.id}</span>
                      {cell.name}
                      {cell.ms > 0 && <span className="text-foreground/70">{cell.ms}ms</span>}
                    </span>
                    {i < pipelineCells.length - 1 && (
                      <span aria-hidden="true" className="h-px w-4 bg-border" />
                    )}
                  </li>
                )
              })}
            </ol>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { k: 'Join strategy', v: 'INNER' },
                { k: 'Deterministic', v: 'true' },
                { k: 'Cache hits', v: '38/42' },
              ].map((m) => (
                <div key={m.k} className="rounded-xl border border-border bg-panel/60 p-2.5">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{m.k}</p>
                  <p className="mt-0.5 font-mono text-sm text-foreground">{m.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background/40 p-4">
            <h3 className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Clock className="size-3.5 text-accent" aria-hidden="true" />
              Snapshot Timeline
            </h3>
            <ul className="mt-3 space-y-2">
              {snapshots.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-panel/60 px-3 py-2 transition hover:border-primary/30"
                >
                  <span className="font-mono text-[10px] text-primary">{s.id}</span>
                  <span className="min-w-0 flex-1 truncate text-[12px] text-foreground">{s.label}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{s.time}</span>
                  <span className="font-mono text-[10px] text-accent">{s.delta}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {historyOpen && (
        <div className="border-t border-border/70 bg-background/50 px-4 py-3">
          <p className="font-mono text-[11px] text-muted-foreground">
            42 cells tracked · 3 snapshots retained · restore is non-destructive
          </p>
        </div>
      )}
    </section>
  )
}
