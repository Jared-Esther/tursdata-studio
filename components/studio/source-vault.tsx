'use client'

import {
  Check,
  Database,
  FileSpreadsheet,
  FileStack,
  Layers,
  PenTool,
  Plus,
  Search,
  Sparkles,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { dataSources, type DataSource, type SourceStatus } from '@/lib/studio-data'
import { cn } from '@/lib/utils'

const statusStyles: Record<SourceStatus, { label: string; className: string; dot: string }> = {
  synced: {
    label: 'Synced',
    className: 'border-primary/30 bg-primary/10 text-primary',
    dot: 'bg-primary',
  },
  streaming: {
    label: 'Streaming',
    className: 'border-accent/30 bg-accent/10 text-accent',
    dot: 'bg-accent animate-pulse',
  },
  stale: {
    label: 'Stale',
    className: 'border-chart-5/30 bg-chart-5/10 text-chart-5',
    dot: 'bg-chart-5',
  },
}

const kindIcon = {
  CSV: FileSpreadsheet,
  SQLite: Database,
  DXF: PenTool,
  Parquet: FileStack,
}

type Props = {
  selected: string[]
  onToggle: (id: string) => void
}

export function SourceVault({ selected, onToggle }: Props) {
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return dataSources
    return dataSources.filter(
      (s) => s.file.toLowerCase().includes(q) || s.label.toLowerCase().includes(q),
    )
  }, [query])

  const joinKeys = Array.from(
    new Set(dataSources.filter((s) => selected.includes(s.id)).map((s) => s.joinKey)),
  )

  return (
    <aside
      aria-label="Data Source Vault"
      className="flex h-full w-full flex-col gap-4 overflow-hidden border-border bg-panel/60 p-4 backdrop-blur-md lg:w-[320px] lg:shrink-0 lg:border-r"
    >
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
            <Layers className="size-4" aria-hidden="true" />
          </span>
          <h2 className="text-sm font-semibold tracking-tight">Data Source Vault</h2>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          数据来源库 · Stage 1 — select tables to compose a join
        </p>
      </header>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter sources…"
          aria-label="Filter data sources"
          className="h-9 w-full rounded-xl border border-border bg-background/60 pl-9 pr-3 text-xs text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="scroll-thin -mx-1 flex-1 space-y-2 overflow-y-auto px-1">
        {visible.map((source) => (
          <SourceCard
            key={source.id}
            source={source}
            checked={selected.includes(source.id)}
            onToggle={() => onToggle(source.id)}
          />
        ))}
        {visible.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
            No sources match “{query}”
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/12 via-panel to-panel p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
            <Sparkles className="size-3" aria-hidden="true" />
            Multi-Table Join Engine
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">{selected.length}/5</span>
        </div>
        <dl className="mt-3 space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Active join keys</dt>
            <dd className="font-mono text-foreground">{joinKeys.join(' · ') || '—'}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Engine</dt>
            <dd className="font-mono text-foreground">Marimo DAG v2.4</dd>
          </div>
        </dl>
        <button
          type="button"
          className="mt-3 flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-background/60 text-[11px] font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
        >
          <Plus className="size-3.5" aria-hidden="true" />
          Register new source
        </button>
      </div>
    </aside>
  )
}

function SourceCard({
  source,
  checked,
  onToggle,
}: {
  source: DataSource
  checked: boolean
  onToggle: () => void
}) {
  const Icon = kindIcon[source.kind]
  const status = statusStyles[source.status]

  return (
    <label
      className={cn(
        'group flex cursor-pointer gap-3 rounded-2xl border p-3 transition',
        checked
          ? 'border-primary/40 bg-gradient-to-br from-primary/10 to-panel/80 shadow-[0_0_0_1px_rgba(56,189,248,0.08)]'
          : 'border-border bg-panel/50 hover:border-primary/25 hover:bg-panel',
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="peer sr-only"
        aria-label={`Include ${source.label} ${source.file} in join`}
      />
      <span
        aria-hidden="true"
        className={cn(
          'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[5px] border transition',
          checked ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background',
        )}
      >
        {checked && <Check className="size-3" strokeWidth={3} />}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <Icon className={cn('size-3.5', checked ? 'text-primary' : 'text-muted-foreground')} aria-hidden="true" />
          <span className="font-mono text-[11px] font-medium text-muted-foreground">{source.label}</span>
          <span
            className={cn(
              'ml-auto inline-flex items-center gap-1 rounded-full border px-1.5 py-px text-[9px] font-medium uppercase tracking-wide',
              status.className,
            )}
          >
            <span className={cn('size-1 rounded-full', status.dot)} />
            {status.label}
          </span>
        </span>
        <span className="mt-1 block truncate text-[13px] font-medium text-foreground">{source.file}</span>
        <span className="mt-1.5 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
          <span>{source.rows} rows</span>
          <span className="text-border">|</span>
          <span>{source.size}</span>
          <span className="text-border">|</span>
          <span className="text-accent">{source.joinKey}</span>
        </span>
      </span>
    </label>
  )
}
