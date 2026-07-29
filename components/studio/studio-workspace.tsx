'use client'

import { Boxes, CircleUser, Command, Radio } from 'lucide-react'
import { useState } from 'react'
import { dataSources } from '@/lib/studio-data'
import { AiAssistant } from './ai-assistant'
import { ArtifactCanvas } from './artifact-canvas'
import { SourceVault } from './source-vault'

export function StudioWorkspace() {
  const [selected, setSelected] = useState<string[]>(
    dataSources.filter((s) => s.defaultSelected).map((s) => s.id),
  )
  const [running, setRunning] = useState(false)

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  function execute() {
    setRunning(true)
    window.setTimeout(() => setRunning(false), 1900)
  }

  const selectedTables = dataSources
    .filter((s) => selected.includes(s.id))
    .map((s) => s.file.replace(/\.[a-z]+$/i, ''))

  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-panel/60 px-4 backdrop-blur-md">
        <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Boxes className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold tracking-tight">TursData Studio</h1>
          <p className="hidden font-mono text-[10px] text-muted-foreground sm:block">
            AI-Native Data Workspace
          </p>
        </div>

        <span className="ml-3 hidden h-8 items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 font-mono text-[11px] text-primary md:inline-flex">
          <Radio className="size-3.5 animate-pulse" aria-hidden="true" />
          Marimo kernel online
        </span>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden h-8 items-center gap-1.5 rounded-lg border border-border bg-background/60 px-2.5 font-mono text-[10px] text-muted-foreground lg:inline-flex">
            <Command className="size-3" aria-hidden="true" />K
          </span>
          <button
            type="button"
            aria-label="账户"
            className="inline-flex size-8 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
          >
            <CircleUser className="size-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <SourceVault selected={selected} onToggle={toggle} />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          <ArtifactCanvas running={running} />
        </main>
        <AiAssistant selectedTables={selectedTables} running={running} onExecute={execute} />
      </div>
    </div>
  )
}
