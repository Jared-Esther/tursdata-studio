'use client'

import { Check, Link2, Loader2, Send, Sparkles, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { quickPrompts, reasoningSteps } from '@/lib/studio-data'
import { cn } from '@/lib/utils'

type Message =
  | { id: number; role: 'user'; text: string }
  | { id: number; role: 'ai'; text: string; step: number }

const initialMessages: Message[] = [
  { id: 1, role: 'user', text: '把两张表按 SKU_ID 关联，找出毛利率低于 25% 的物料。' },
  {
    id: 2,
    role: 'ai',
    text: '已完成关联，命中 3 组低毛利 SKU（最低 19.6%）。分析表与图表已渲染至中间画布，可直接导出。',
    step: 3,
  },
]

type Props = {
  selectedTables: string[]
  running: boolean
  onExecute: () => void
}

export function AiAssistant({ selectedTables, running, onExecute }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [draft, setDraft] = useState('')
  const streamRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(3)

  useEffect(() => {
    streamRef.current?.scrollTo({ top: streamRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  function send(text: string) {
    const value = text.trim()
    if (!value || running) return
    const userId = idRef.current++
    const aiId = idRef.current++
    setMessages((prev) => [
      ...prev,
      { id: userId, role: 'user', text: value },
      { id: aiId, role: 'ai', text: '', step: 0 },
    ])
    setDraft('')
    onExecute()

    reasoningSteps.forEach((_, i) => {
      window.setTimeout(
        () => {
          setMessages((prev) =>
            prev.map((m) => (m.id === aiId && m.role === 'ai' ? { ...m, step: i + 1 } : m)),
          )
        },
        (i + 1) * 600,
      )
    })
    window.setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiId && m.role === 'ai'
            ? {
                ...m,
                text: '计算完成。Marimo 已确定性重算 42 个 cell，成品已同步至右侧成品库与中间画布。',
              }
            : m,
        ),
      )
    }, 1900)
  }

  return (
    <aside
      aria-label="TursData Copilot"
      className="flex max-h-[55vh] w-full shrink-0 flex-col overflow-hidden border-t border-border bg-panel/60 backdrop-blur-md md:h-full md:max-h-none md:w-[300px] md:border-t-0 md:border-l xl:w-[360px]"
    >
      <header className="flex items-center gap-2.5 border-b border-border px-4 py-3.5">
        <span className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Sparkles className="size-4" aria-hidden="true" />
          <span className="absolute -inset-1 animate-ping rounded-xl border border-primary/50" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold tracking-tight">TursData Copilot</h2>
          <p className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
            Marimo Reactive Engine Ready
          </p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[9px] text-primary">
          <Zap className="size-2.5" aria-hidden="true" />
          v2.4
        </span>
      </header>

      <div className="border-b border-border bg-primary/5 px-4 py-2.5">
        <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
          <Link2 className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
          <span>
            正在针对{' '}
            {selectedTables.length === 0 ? (
              <span className="text-foreground">未选中数据表</span>
            ) : (
              selectedTables.map((t, i) => (
                <span key={t}>
                  {i > 0 && <span className="text-primary"> + </span>}
                  <span className="font-mono text-foreground">[{t}]</span>
                </span>
              ))
            )}{' '}
            进行 AI 分析
          </span>
        </p>
      </div>

      <div ref={streamRef} className="scroll-thin flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m) =>
          m.role === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-[12px] leading-relaxed text-primary-foreground">
                {m.text}
              </p>
            </div>
          ) : (
            <div key={m.id} className="space-y-2">
              <div className="rounded-2xl rounded-bl-md border border-border bg-background/50 p-3">
                <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-primary">
                  Reasoning
                </p>
                <ol className="space-y-1.5">
                  {reasoningSteps.map((step, i) => {
                    const done = m.step > i
                    const active = m.step === i
                    return (
                      <li key={step} className="flex items-center gap-2 text-[11px]">
                        <span
                          aria-hidden="true"
                          className={cn(
                            'flex size-4 shrink-0 items-center justify-center rounded-full border font-mono text-[8px]',
                            done
                              ? 'border-primary bg-primary text-primary-foreground'
                              : active
                                ? 'border-primary text-primary'
                                : 'border-border text-muted-foreground',
                          )}
                        >
                          {done ? <Check className="size-2.5" strokeWidth={3} /> : i + 1}
                        </span>
                        <span className={done || active ? 'text-foreground' : 'text-muted-foreground'}>
                          {step}
                        </span>
                        {active && (
                          <Loader2 className="size-3 animate-spin text-primary" aria-hidden="true" />
                        )}
                      </li>
                    )
                  })}
                </ol>
              </div>
              {m.text && (
                <p className="max-w-[92%] rounded-2xl rounded-bl-md border border-primary/25 bg-primary/5 px-3 py-2 text-[12px] leading-relaxed">
                  {m.text}
                </p>
              )}
            </div>
          ),
        )}
      </div>

      <div className="border-t border-border p-3">
        <div className="scroll-thin mb-2 flex gap-1.5 overflow-x-auto pb-0.5">
          {quickPrompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => send(p)}
              className="shrink-0 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10px] text-muted-foreground transition hover:border-primary/50 hover:text-primary"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-background/60 p-2 transition focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20">
          <label htmlFor="copilot-prompt" className="sr-only">
            输入提示词
          </label>
          <textarea
            id="copilot-prompt"
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                e.preventDefault()
                send(draft)
              }
            }}
            placeholder="输入提示词，让 AI 自动生成分析图表、PPT 或 CAD 图纸..."
            className="w-full resize-none bg-transparent px-1.5 text-[12px] leading-relaxed outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-2 px-1.5 pt-1">
            <span className="font-mono text-[9px] text-muted-foreground">
              Enter 发送 · Shift+Enter 换行
            </span>
            <button
              type="button"
              onClick={() => send(draft)}
              disabled={running || draft.trim().length === 0}
              className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-xl bg-primary px-3 text-[11px] font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40"
            >
              {running ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Sparkles className="size-4 text-white" aria-hidden="true" />
              )}
              生成成品
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
