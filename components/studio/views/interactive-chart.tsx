'use client'

import { Activity, TrendingUp } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { throughputSeries } from '@/lib/studio-data'

const metrics = [
  { label: 'Landed Volume', value: '10.6M', delta: '+8.2%', unit: 'units / mo' },
  { label: 'Blended Margin', value: '38.2%', delta: '+1.1 pt', unit: 'gross' },
  { label: 'Forecast Error', value: '3.4%', delta: '-0.6 pt', unit: 'MAPE' },
  { label: 'Lead Time', value: '17.8d', delta: '-2.1d', unit: 'weighted avg' },
]

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-panel/95 px-3 py-2 shadow-lg backdrop-blur">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="flex items-center gap-2 font-mono text-[11px] text-foreground">
          <span className="size-1.5 rounded-full" style={{ background: p.color }} />
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

export function InteractiveChart() {
  return (
    <div className="scroll-thin flex h-full flex-col gap-3 overflow-y-auto">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-border bg-gradient-to-br from-panel to-background/60 p-4 backdrop-blur-md"
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</p>
            <p className="mt-1 font-mono text-2xl tabular-nums text-foreground">{m.value}</p>
            <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-accent">
              <TrendingUp className="size-3" aria-hidden="true" />
              {m.delta}
              <span className="text-muted-foreground">· {m.unit}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-panel/50 p-4 backdrop-blur-md">
        <header className="mb-3 flex items-center justify-between">
          <h3 className="inline-flex items-center gap-1.5 text-sm font-semibold">
            <Activity className="size-4 text-primary" aria-hidden="true" />
            Landed volume vs. reactive forecast
          </h3>
          <span className="font-mono text-[11px] text-muted-foreground">cell_04 · margin_model</span>
        </header>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={throughputSeries} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="landedFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="landed"
                name="Landed (M)"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#landedFill)"
              />
              <Area
                type="monotone"
                dataKey="forecast"
                name="Forecast (M)"
                stroke="var(--chart-2)"
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="url(#forecastFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-panel/50 p-4 backdrop-blur-md">
        <header className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Blended margin distribution</h3>
          <span className="font-mono text-[11px] text-muted-foreground">joined on SKU_ID</span>
        </header>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={throughputSeries} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                domain={[24, 40]}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--muted)' }} />
              <Bar dataKey="margin" name="Margin %" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="margin" stroke="var(--chart-1)" dot={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
