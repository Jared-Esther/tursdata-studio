'use client'

import { Boxes, CircleUser, Command, Radio } from 'lucide-react'
import { useState } from 'react'
import { dataSources } from '@/lib/studio-data'
import { ArtifactCanvas } from './artifact-canvas'
import { ConversionWorkshop } from './conversion-workshop'
import { SourceVault } from './source-vault'

export function StudioWorkspace() {
  const [selected, setSelected] = useState<string[]>(
    dataSources.filter((s) => s.defaultSelected).map((s) => s.id),
  )
  const [running, setRunning] = useState(false)
  const [lastRun, setLastRun] = useState('14:08:22')

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  function execute() {
    setRunning(true)
    window.setTimeout(() => {
      setRunning(false)
      setLastRun(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      )
    }, 1800)
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-panel/60 px-4 backdrop-blur-md">
        <span className="flex size-8 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <Boxes className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold tracking-tight">TursData Studio</h1>
          <p className="hidden font-mono text-[10px] text-muted-foreground sm:block">
            Reactive multi-table data workspace
          </p>
        </div>

        <span className="ml-3 hidden h-8 items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 font-mono text-[11px] text-accent md:inline-flex">
          <Radio className="size-3.5 animate-pulse" aria-hidden="true" />
          Marimo kernel online
        </span>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden h-8 items-center gap-1.5 rounded-lg border border-border bg-background/60 px-2.5 font-mono text-[10px] text-muted-foreground lg:inline-flex">
            <Command className="size-3" aria-hidden="true" />K
          </span>
          <button
            type="button"
            aria-label="Account"
            className="inline-flex size-8 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition hover:text-foreground"
          >
            <CircleUser className="size-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <SourceVault selected={selected} onToggle={toggle} />
        <main className="flex min-h-0 flex-1 flex-col">
          <ConversionWorkshop
            selectedCount={selected.length}
            running={running}
            onExecute={execute}
            lastRun={lastRun}
          />
          <ArtifactCanvas running={running} />
        </main>
      </div>
    </div>
  )
}
