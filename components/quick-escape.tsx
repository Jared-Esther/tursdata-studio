'use client'

import { useCallback, useEffect, useRef } from 'react'
import { XIcon } from 'lucide-react'

const SAFE_URL = 'https://www.google.com.au'
const DOUBLE_TAP_WINDOW_MS = 500

/**
 * Replaces the current history entry so the visit to this site is not left as
 * the previous page in the browser's back button — a basic protection for
 * survivors whose devices may be monitored.
 */
export function escapeNow() {
  try {
    window.sessionStorage.clear()
    window.localStorage.clear()
  } catch {
    // Storage may be unavailable; escaping still takes priority.
  }
  window.location.replace(SAFE_URL)
}

export function useQuickEscape() {
  const lastEscapePress = useRef(0)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      const now = Date.now()
      if (now - lastEscapePress.current <= DOUBLE_TAP_WINDOW_MS) {
        lastEscapePress.current = 0
        escapeNow()
        return
      }
      lastEscapePress.current = now
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return escapeNow
}

function EscapeButton({ className }: { className?: string }) {
  const escape = useCallback(() => escapeNow(), [])

  return (
    <button
      type="button"
      onClick={escape}
      aria-label="Quick escape — leave this site immediately and go to Google"
      className={`pointer-events-auto flex items-center gap-2 rounded-full bg-destructive px-4 py-2.5 text-sm font-bold text-destructive-foreground shadow-lg ring-2 ring-destructive/25 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destructive ${className ?? ''}`}
    >
      <XIcon aria-hidden="true" className="size-4" />
      Quick Escape
      <span className="rounded border border-destructive-foreground/40 px-1 text-[10px] leading-4 font-semibold tracking-wide">
        ESC
      </span>
    </button>
  )
}

export function QuickEscape() {
  useQuickEscape()

  return (
    <>
      <div className="pointer-events-none fixed top-3 right-3 z-90 hidden md:block">
        <EscapeButton />
      </div>
      <div className="pointer-events-none fixed right-3 bottom-3 z-90 md:hidden">
        <EscapeButton />
      </div>
      <p className="sr-only" aria-live="polite">
        Press the Escape key twice quickly to leave this site immediately.
      </p>
    </>
  )
}
