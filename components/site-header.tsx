'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MenuIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EscapeButton } from '@/components/quick-escape'

const NAV_LINKS = [
  { label: 'Home', href: '/#top' },
  { label: 'Our Mission', href: '/#mission' },
  { label: 'Get Emergency Help', href: '/get-help' },
  { label: 'Become a Foster', href: '/#foster' },
  { label: 'Donate', href: '/#donate' },
  { label: 'Contact', href: '/#contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-80 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href="/#top"
          className="flex flex-col rounded-md leading-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span className="text-base font-bold tracking-tight whitespace-nowrap text-foreground sm:text-lg">
            Press Paws Project
          </span>
          <span className="hidden text-xs text-muted-foreground sm:block">
            Pets &amp; survivors escape together
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
          <EscapeButton />
          <Button
            variant="outline"
            size="icon"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <XIcon /> : <MenuIcon />}
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
