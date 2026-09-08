import Link from 'next/link'
import { GlobeIcon, MailIcon, MapPinIcon, UserIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-footer text-footer-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-lg font-bold tracking-tight">Press Paws Project</span>
            <p className="text-sm leading-relaxed text-footer-foreground/75">
              Registered Australian charity removing a critical safety barrier for
              domestic violence survivors, so people and their companion animals
              escape abuse together.
            </p>
            <dl className="flex flex-col gap-2 text-sm text-footer-foreground/75">
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs tracking-wide uppercase text-footer-foreground/50">
                  Legal entity
                </dt>
                <dd className="font-semibold text-footer-foreground">
                  PRESS PAWS PROJECT INCORPORATED
                </dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs tracking-wide uppercase text-footer-foreground/50">
                  ABN
                </dt>
                <dd className="font-semibold text-footer-foreground">83 100 528 601</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs tracking-wide uppercase text-footer-foreground/50">
                  Registration
                </dt>
                <dd>
                  Registered Australian charity with the Australian Charities and
                  Not-for-profits Commission (ACNC).
                </dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs tracking-wide uppercase text-footer-foreground/50">
                  Governing law
                </dt>
                <dd>
                  Incorporated in NSW under the Associations Incorporation Act 2009.
                </dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs tracking-wide uppercase text-footer-foreground/50">
                  Charitable subtypes
                </dt>
                <dd>
                  Advancing Social or Public Welfare · Preventing or Relieving the
                  Suffering of Animals
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-footer-foreground/60">
              Contact
            </h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <UserIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-footer-foreground/60" />
                Johnston Alex — Key Contact
              </li>
              <li className="flex items-start gap-3">
                <MailIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-footer-foreground/60" />
                <a
                  href="mailto:info@presspawsproject.org.au"
                  className="no-underline transition-colors hover:text-footer-foreground/80 hover:underline hover:underline-offset-4"
                >
                  info@presspawsproject.org.au
                </a>
              </li>
              <li className="flex items-start gap-3">
                <GlobeIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-footer-foreground/60" />
                <span className="font-semibold">presspawsproject.org.au</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-footer-foreground/60" />
                4 Ash Ave, Caringbah South, NSW 2229, Australia
              </li>
            </ul>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-footer-foreground/75">
                <li>
                  <Link href="/#mission" className="no-underline transition-colors hover:text-footer-foreground hover:underline hover:underline-offset-4">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link href="/get-help" className="no-underline transition-colors hover:text-footer-foreground hover:underline hover:underline-offset-4">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="/#foster" className="no-underline transition-colors hover:text-footer-foreground hover:underline hover:underline-offset-4">
                    Become a Foster
                  </Link>
                </li>
                <li>
                  <Link href="/#donate" className="no-underline transition-colors hover:text-footer-foreground hover:underline hover:underline-offset-4">
                    Donate
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

        </div>

        <Separator className="my-8 bg-footer-foreground/15" />

        <p className="text-sm leading-relaxed text-footer-foreground/75">
          Press Paws Project operates strictly on a not-for-profit basis. All
          foster placements, crisis relief, and volunteer opportunities are
          provided without discrimination based on race, religion, gender, sexual
          orientation, disability, or national origin.
        </p>

        <Separator className="my-8 bg-footer-foreground/15" />

        <div className="flex flex-col gap-2 text-xs text-footer-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Press Paws Project Incorporated · ABN 83 100 528 601.</p>
          <p>presspawsproject.org.au · Press ESC twice to leave this site instantly.</p>
        </div>
      </div>
    </footer>
  )
}
