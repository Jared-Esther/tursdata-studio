'use client'

import { Box, Eye, EyeOff, Ruler, Square } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type LayerId = 'geometry' | 'dimensions' | 'hidden' | 'annotations'

const layers: { id: LayerId; label: string; color: string }[] = [
  { id: 'geometry', label: 'GEOMETRY', color: 'var(--chart-1)' },
  { id: 'dimensions', label: 'DIMENSIONS', color: 'var(--chart-2)' },
  { id: 'hidden', label: 'HIDDEN_EDGES', color: 'var(--muted-foreground)' },
  { id: 'annotations', label: 'ANNOTATIONS', color: 'var(--chart-5)' },
]

export function CadBlueprint() {
  const [mode, setMode] = useState<'2d' | '3d'>('2d')
  const [visible, setVisible] = useState<Record<LayerId, boolean>>({
    geometry: true,
    dimensions: true,
    hidden: true,
    annotations: true,
  })

  return (
    <div className="flex h-full flex-col gap-3 lg:flex-row">
      <div className="flex-1 overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur-md">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <span className="font-mono text-[11px] text-muted-foreground">CAD_Specs.dxf · PN-5120-A</span>
          <div className="ml-auto inline-flex rounded-lg border border-border bg-panel/70 p-0.5">
            {(['2d', '3d'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  'inline-flex h-6 items-center gap-1 rounded-md px-2 font-mono text-[10px] uppercase transition',
                  mode === m ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {m === '2d' ? <Square className="size-3" aria-hidden="true" /> : <Box className="size-3" aria-hidden="true" />}
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-backdrop relative h-[calc(100%-37px)] min-h-[320px] w-full">
          <svg
            viewBox="0 0 480 320"
            className="absolute inset-0 size-full"
            role="img"
            aria-label={`${mode.toUpperCase()} vector blueprint of part PN-5120-A with visible layers`}
          >
            {visible.hidden && (
              <g stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="5 4" fill="none" opacity="0.55">
                <line x1="240" y1="40" x2="240" y2="280" />
                <line x1="100" y1="160" x2="380" y2="160" />
                <circle cx="240" cy="160" r="88" />
              </g>
            )}

            {visible.geometry && mode === '2d' && (
              <g stroke="var(--chart-1)" strokeWidth="1.75" fill="var(--chart-1)" fillOpacity="0.06">
                <rect x="130" y="70" width="220" height="180" rx="14" />
                <circle cx="240" cy="160" r="56" fill="none" />
                <circle cx="240" cy="160" r="26" fill="none" />
                <circle cx="166" cy="106" r="9" fill="none" />
                <circle cx="314" cy="106" r="9" fill="none" />
                <circle cx="166" cy="214" r="9" fill="none" />
                <circle cx="314" cy="214" r="9" fill="none" />
                <path d="M130 130 L100 130 L100 190 L130 190" fill="none" />
                <path d="M350 130 L380 130 L380 190 L350 190" fill="none" />
              </g>
            )}

            {visible.geometry && mode === '3d' && (
              <g stroke="var(--chart-1)" strokeWidth="1.75" fill="var(--chart-1)" fillOpacity="0.07">
                <path d="M150 200 L240 150 L330 200 L240 250 Z" />
                <path d="M150 200 L150 120 L240 70 L240 150 Z" fillOpacity="0.12" />
                <path d="M330 200 L330 120 L240 70 L240 150 Z" fillOpacity="0.04" />
                <ellipse cx="240" cy="110" rx="42" ry="22" fill="none" />
              </g>
            )}

            {visible.dimensions && (
              <g stroke="var(--chart-2)" strokeWidth="1" fill="var(--chart-2)">
                <line x1="130" y1="288" x2="350" y2="288" />
                <line x1="130" y1="282" x2="130" y2="294" />
                <line x1="350" y1="282" x2="350" y2="294" />
                <text x="240" y="304" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)">
                  220.00 mm
                </text>
                <line x1="398" y1="70" x2="398" y2="250" />
                <line x1="392" y1="70" x2="404" y2="70" />
                <line x1="392" y1="250" x2="404" y2="250" />
                <text x="410" y="164" fontSize="10" fontFamily="var(--font-mono)">
                  180.00
                </text>
              </g>
            )}

            {visible.annotations && (
              <g fill="var(--chart-5)" fontFamily="var(--font-mono)" fontSize="10">
                <line x1="266" y1="134" x2="330" y2="96" stroke="var(--chart-5)" strokeWidth="1" />
                <circle cx="266" cy="134" r="2.5" />
                <text x="334" y="93">Ø52 H7 bore</text>
                <line x1="166" y1="106" x2="96" y2="72" stroke="var(--chart-5)" strokeWidth="1" />
                <circle cx="166" cy="106" r="2.5" />
                <text x="18" y="68">4× Ø9 thru</text>
              </g>
            )}
          </svg>
        </div>
      </div>

      <div className="w-full shrink-0 space-y-3 lg:w-[220px]">
        <div className="rounded-2xl border border-border bg-panel/60 p-4 backdrop-blur-md">
          <h3 className="inline-flex items-center gap-1.5 text-xs font-semibold">
            <Ruler className="size-3.5 text-primary" aria-hidden="true" />
            Layer Controls
          </h3>
          <ul className="mt-3 space-y-1.5">
            {layers.map((layer) => {
              const on = visible[layer.id]
              return (
                <li key={layer.id}>
                  <button
                    type="button"
                    onClick={() => setVisible((v) => ({ ...v, [layer.id]: !v[layer.id] }))}
                    aria-pressed={on}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-xl border px-2.5 py-2 font-mono text-[10px] transition',
                      on
                        ? 'border-primary/30 bg-primary/5 text-foreground'
                        : 'border-border bg-background/50 text-muted-foreground',
                    )}
                  >
                    <span className="size-2 rounded-sm" style={{ background: layer.color, opacity: on ? 1 : 0.3 }} />
                    <span className="flex-1 text-left">{layer.label}</span>
                    {on ? (
                      <Eye className="size-3.5 text-primary" aria-hidden="true" />
                    ) : (
                      <EyeOff className="size-3.5" aria-hidden="true" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-panel/60 p-4 backdrop-blur-md">
          <h3 className="text-xs font-semibold">Entity Summary</h3>
          <dl className="mt-3 space-y-1.5 text-[11px]">
            {[
              { k: 'Entities', v: '2,148' },
              { k: 'Units', v: 'mm' },
              { k: 'Tolerance', v: '±0.05' },
              { k: 'Scale', v: '1:2' },
            ].map((row) => (
              <div key={row.k} className="flex items-center justify-between">
                <dt className="text-muted-foreground">{row.k}</dt>
                <dd className="font-mono text-foreground">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
