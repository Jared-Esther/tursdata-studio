import Link from 'next/link'
import { MailIcon, MapPinIcon, PhoneIcon, UserIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BrandMark } from '@/components/site-header'
import { Separator } from '@/components/ui/separator'

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <BrandMark className="bg-primary-foreground text-primary" />
              <span className="text-lg font-bold">Press Paws Project</span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/75">
              Registered Australian non-profit removing a critical safety barrier
              for domestic violence survivors, so people and their companion
              animals escape abuse together.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-primary-foreground/60">
              Contact
            </h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <UserIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary-foreground/60" />
                Johnston Alex — Key Contact
              </li>
              <li className="flex items-start gap-3">
                <MailIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary-foreground/60" />
                <a
                  href="mailto:info@presspawsproject.org.au"
                  className="underline underline-offset-4 hover:text-primary-foreground/80"
                >
                  info@presspawsproject.org.au
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary-foreground/60" />
                4 Ash Ave, Caringbah South, NSW 2229, Australia
              </li>
            </ul>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-primary-foreground/75">
                <li>
                  <Link href="/#mission" className="underline underline-offset-4 hover:text-primary-foreground">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link href="/get-help" className="underline underline-offset-4 hover:text-primary-foreground">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="/#foster" className="underline underline-offset-4 hover:text-primary-foreground">
                    Become a Foster
                  </Link>
                </li>
                <li>
                  <Link href="/#donate" className="underline underline-offset-4 hover:text-primary-foreground">
                    Donate
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <Alert variant="destructive" className="bg-background">
            <PhoneIcon />
            <AlertTitle>In immediate danger? Call 000.</AlertTitle>
            <AlertDescription>
              <p>
                National Domestic Violence Line:{' '}
                <a href="tel:1800737732" className="font-semibold underline underline-offset-4">
                  1800 737 732
                </a>{' '}
                (1800RESPECT) — free and confidential, 24 hours a day.
              </p>
              <p>
                Lifeline:{' '}
                <a href="tel:131114" className="font-semibold underline underline-offset-4">
                  13 11 14
                </a>
              </p>
            </AlertDescription>
          </Alert>
        </div>

        <Separator className="my-8 bg-primary-foreground/15" />

        <div className="flex flex-col gap-2 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Press Paws Project. All rights reserved.</p>
          <p>presspawsproject.org.au · Press ESC twice to leave this site instantly.</p>
        </div>
      </div>
    </footer>
  )
}
