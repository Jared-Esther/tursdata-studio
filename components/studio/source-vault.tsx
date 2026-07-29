'use client'

import {
  Box,
  Check,
  ChevronDown,
  Database,
  FileSpreadsheet,
  FileStack,
  FileText,
  Package,
  PenTool,
  Plus,
  Presentation,
  Search,
  Settings2,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  artifactVault,
  dataSources,
  pipelineCells,
  type DataSource,
  type SourceStatus,
} from '@/lib/studio-data'
import { cn } from '@/lib/utils'

const statusStyles: Record<SourceStatus, { label: string; className: string; dot: string }> = {
  synced: {
    label: 'SYNCED',
    className: 'border-primary/30 bg-primary/10 text-primary',
    dot: 'bg-primary',
  },
  streaming: {
    label: 'CONNECTED',
    className: 'border-primary/25 bg-primary/5 text-primary/90',
    dot: 'bg-primary animate-pulse',
  },
  stale: {
    label: 'STALE',
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

const artifactIcon = {
  PDF: FileText,
  PPT: Presentation,
  CAD: Box,
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

  const runningCells = pipelineCells.filter((c) => c.state === 'running').length

  return (
    <aside
      aria-label="数据源库房"
      className="flex max-h-[45vh] w-full shrink-0 flex-col overflow-hidden border-b border-border bg-panel/60 backdrop-blur-md md:h-full md:max-h-none md:w-[240px] md:border-b-0 md:border-r xl:w-[280px]"
    >
      <header className="flex flex-col gap-1 border-b border-border px-4 py-3.5">
        <div className="flex items-center gap-2">
          <Database className="size-4 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold tracking-tight">数据源库房</h2>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">Data Vault</span>
        </div>
        <div className="relative mt-1.5">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索数据表…"
            aria-label="搜索数据表"
            className="h-8 w-full rounded-lg border border-border bg-background/60 pl-9 pr-3 text-xs outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </header>

      <div className="scroll-thin flex-1 space-y-1 overflow-y-auto p-3">
        <VaultSection title="生产原料库" caption="Raw Data" defaultOpen count={visible.length}>
          <div className="space-y-2 pt-1">
            {visible.map((source) => (
              <SourceCard
                key={source.id}
                source={source}
                checked={selected.includes(source.id)}
                onToggle={() => onToggle(source.id)}
              />
            ))}
            {visible.length === 0 && (
              <p className="rounded-lg border border-dashed border-border p-3 text-center text-[11px] text-muted-foreground">
                未匹配到数据表
              </p>
            )}
            <button
              type="button"
              className="flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border text-[11px] text-muted-foreground transition hover:border-primary/50 hover:text-primary"
            >
              <Plus className="size-3.5" aria-hidden="true" />
              注册新数据源
            </button>
          </div>
        </VaultSection>

        <VaultSection title="生产转化车间" caption="Pipelines" defaultOpen>
          <div className="space-y-2 pt-1">
            <div className="rounded-xl border border-primary/25 bg-primary/5 p-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-wide text-primary">
                  <Workflow className="size-3" aria-hidden="true" />
                  Marimo DAG
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/15 px-1.5 py-px font-mono text-[9px] text-primary">
                  <span className="size-1 animate-pulse rounded-full bg-primary" />
                  ACTIVE
                </span>
              </div>
              <p className="mt-1.5 font-mono text-[10px] text-muted-foreground">
                {pipelineCells.length} cells · {runningCells} running · reactive
              </p>
            </div>
            {pipelineCells.map((cell) => (
              <div
                key={cell.id}
                className="flex items-center gap-2 rounded-lg border border-border bg-background/40 px-2.5 py-1.5"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-1.5 shrink-0 rounded-full',
                    cell.state === 'running'
                      ? 'animate-pulse bg-primary'
                      : cell.state === 'idle'
                        ? 'bg-muted-foreground/60'
                        : 'bg-border',
                  )}
                />
                <span className="truncate font-mono text-[10px] text-muted-foreground">
                  {cell.name}
                </span>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground/70">
                  {cell.ms ? `${cell.ms}ms` : '—'}
                </span>
              </div>
            ))}
          </div>
        </VaultSection>

        <VaultSection title="生产成品库" caption="Artifact Vault">
          <div className="space-y-2 pt-1">
            {artifactVault.map((a) => {
              const Icon = artifactIcon[a.kind as keyof typeof artifactIcon]
              return (
                <button
                  key={a.id}
                  type="button"
                  className="flex w-full items-center gap-2 rounded-lg border border-border bg-background/40 px-2.5 py-2 text-left transition hover:border-primary/40"
                >
                  <Icon className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] font-medium">{a.name}</span>
                    <span className="block font-mono text-[9px] text-muted-foreground">
                      {a.time}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </VaultSection>
      </div>

      <div className="border-t border-border bg-gradient-to-br from-primary/10 to-transparent p-3">
        <p className="flex items-center gap-1.5 text-[11px] leading-relaxed">
          <Sparkles className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            已选中{' '}
            <span className="font-mono font-semibold text-primary">{selected.length}</span>{' '}
            张数据表，准备唤醒 AI
          </span>
        </p>
        <button
          type="button"
          className="mt-2 flex h-7 w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-background/60 font-mono text-[10px] text-muted-foreground transition hover:border-primary/40 hover:text-primary"
        >
          <Settings2 className="size-3" aria-hidden="true" />
          Join 策略：INNER · SKU_ID
        </button>
      </div>
    </aside>
  )
}

function VaultSection({
  title,
  caption,
  count,
  defaultOpen = false,
  children,
}: {
  title: string
  caption: string
  count?: number
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-lg px-1.5 py-2 text-left transition hover:bg-background/50"
      >
        <Package className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
        <span className="text-[12px] font-semibold tracking-tight">{title}</span>
        <span className="font-mono text-[9px] uppercase text-muted-foreground">{caption}</span>
        {typeof count === 'number' && (
          <span className="font-mono text-[9px] text-muted-foreground">({count})</span>
        )}
        <ChevronDown
          className={cn(
            'ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>
      {open && children}
    </section>
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
        'flex cursor-pointer gap-2.5 rounded-xl border p-2.5 transition',
        checked
          ? 'border-primary/50 bg-primary/8 shadow-[0_0_0_1px_rgba(248,0,97,0.12)]'
          : 'border-border bg-background/40 hover:border-primary/30',
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="peer sr-only"
        aria-label={`选择 ${source.file}`}
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
          <Icon
            className={cn('size-3 shrink-0', checked ? 'text-primary' : 'text-muted-foreground')}
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] text-muted-foreground">{source.label}</span>
          <span
            className={cn(
              'ml-auto inline-flex items-center gap-1 rounded-full border px-1.5 py-px font-mono text-[8px] tracking-wide',
              status.className,
            )}
          >
            <span className={cn('size-1 rounded-full', status.dot)} />
            {status.label}
          </span>
        </span>
        <span className="mt-1 block truncate text-[12px] font-medium">{source.file}</span>
        <span className="mt-1 flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground">
          <span>{source.rows} rows</span>
          <span className="text-border">|</span>
          <span>{source.size}</span>
          <span className="text-border">|</span>
          <span className="text-primary/80">{source.joinKey}</span>
        </span>
      </span>
    </label>
  )
}
