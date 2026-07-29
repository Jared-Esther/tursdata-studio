'use client'

import { ArrowDown, ArrowUp, Filter, Rows3 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { gridRows } from '@/lib/studio-data'
import { cn } from '@/lib/utils'

type Key = keyof (typeof gridRows)[number]

const columns: { key: Key; label: string; numeric?: boolean }[] = [
  { key: 'sku', label: 'SKU_ID' },
  { key: 'part', label: 'PART_NO' },
  { key: 'vendor', label: 'VENDOR' },
  { key: 'units', label: 'UNITS', numeric: true },
  { key: 'unitCost', label: 'UNIT_COST', numeric: true },
  { key: 'margin', label: 'MARGIN', numeric: true },
  { key: 'lead', label: 'LEAD_DAYS', numeric: true },
  { key: 'variance', label: 'VARIANCE_%', numeric: true },
]

export function AnalyticalTable() {
  const [sort, setSort] = useState<{ key: Key; dir: 'asc' | 'desc' }>({ key: 'units', dir: 'desc' })

  const rows = useMemo(() => {
    const copy = [...gridRows]
    copy.sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      if (typeof av === 'number' && typeof bv === 'number') {
        return sort.dir === 'asc' ? av - bv : bv - av
      }
      return sort.dir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av))
    })
    return copy
  }, [sort])

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-panel/70 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          <Rows3 className="size-3.5 text-primary" aria-hidden="true" />
          10 of 1,284,502 rows materialized
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-panel/70 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          <Filter className="size-3.5 text-accent" aria-hidden="true" />
          margin &gt; 0.15
        </span>
      </div>

      <div className="scroll-thin flex-1 overflow-auto rounded-2xl border border-border bg-panel/50 backdrop-blur-md">
        <table className="w-full border-collapse text-left text-[12px]">
          <thead className="sticky top-0 z-10 bg-panel/95 backdrop-blur">
            <tr>
              {columns.map((col) => {
                const active = sort.key === col.key
                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                    className="border-b border-border px-3 py-2.5"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setSort((s) =>
                          s.key === col.key
                            ? { key: col.key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
                            : { key: col.key, dir: 'desc' },
                        )
                      }
                      className={cn(
                        'inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider transition',
                        col.numeric && 'w-full justify-end',
                        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {col.label}
                      {active &&
                        (sort.dir === 'asc' ? (
                          <ArrowUp className="size-3" aria-hidden="true" />
                        ) : (
                          <ArrowDown className="size-3" aria-hidden="true" />
                        ))}
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.sku}
                className={cn(
                  'transition hover:bg-primary/5',
                  i % 2 === 1 && 'bg-background/40',
                )}
              >
                <td className="border-b border-border/60 px-3 py-2 font-mono text-primary">{row.sku}</td>
                <td className="border-b border-border/60 px-3 py-2 font-mono text-muted-foreground">{row.part}</td>
                <td className="border-b border-border/60 px-3 py-2 text-foreground">{row.vendor}</td>
                <td className="border-b border-border/60 px-3 py-2 text-right font-mono tabular-nums text-foreground">
                  {row.units.toLocaleString('en-US')}
                </td>
                <td className="border-b border-border/60 px-3 py-2 text-right font-mono tabular-nums text-foreground">
                  ${row.unitCost.toFixed(2)}
                </td>
                <td className="border-b border-border/60 px-3 py-2 text-right">
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="h-1 w-10 overflow-hidden rounded-full bg-border">
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${Math.round(row.margin * 200)}%` }}
                      />
                    </span>
                    <span className="font-mono tabular-nums text-foreground">
                      {(row.margin * 100).toFixed(1)}%
                    </span>
                  </span>
                </td>
                <td className="border-b border-border/60 px-3 py-2 text-right font-mono tabular-nums text-muted-foreground">
                  {row.lead}
                </td>
                <td
                  className={cn(
                    'border-b border-border/60 px-3 py-2 text-right font-mono tabular-nums',
                    row.variance >= 0 ? 'text-accent' : 'text-destructive',
                  )}
                >
                  {row.variance > 0 ? '+' : ''}
                  {row.variance.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
