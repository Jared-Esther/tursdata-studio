'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MenuIcon, PawPrintIcon, ShieldIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { escapeNow } from '@/components/quick-escape'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '/#top' },
  { label: 'Our Mission', href: '/#mission' },
  { label: 'Get Emergency Help', href: '/get-help' },
  { label: 'Become a Foster', href: '/#foster' },
  { label: 'Donate', href: '/#donate' },
  { label: 'Contact', href: '/#contact' },
]

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground',
        className,
      )}
    >
      <ShieldIcon className="size-6" strokeWidth={1.75} />
      <PawPrintIcon className="absolute size-3.5 translate-y-[-1px] text-primary-foreground" />
    </span>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-80 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href="/#top"
          className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <BrandMark />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-foreground">
              Press Paws Project
            </span>
            <span className="text-xs text-muted-foreground">
              Pets &amp; survivors escape together
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => escapeNow()}
            aria-label="Quick escape — leave this site immediately and go to Google"
            className="hidden items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-bold text-destructive-foreground transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destructive md:inline-flex lg:hidden xl:inline-flex"
          >
            <XIcon aria-hidden="true" className="size-4" />
            Quick Escape
          </button>
          <Button
            variant="outline"
            size="icon"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <MenuIcon /> : <MenuIcon />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-border bg-background lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
