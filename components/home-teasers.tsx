import Link from 'next/link'
import {
  ArrowRightIcon,
  HeartHandshakeIcon,
  LifeBuoyIcon,
  TargetIcon,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const TEASERS = [
  {
    icon: TargetIcon,
    title: 'Our Mission & Governance',
    description:
      'How our registered Constitution shapes three charitable purposes — welfare, animal relief, and community education.',
    href: '/our-mission',
    cta: 'Read our mission',
  },
  {
    icon: HeartHandshakeIcon,
    title: 'Programs & Field Operations',
    description:
      'From same-day veterinary intake to a confidential foster network and frontline training — see the work in action.',
    href: '/programs',
    cta: 'Explore our programs',
  },
  {
    icon: LifeBuoyIcon,
    title: 'Get Emergency Help',
    description:
      'A confidential, three-minute request for emergency foster care. No address, no identification, no cost.',
    href: '/get-help',
    cta: 'Request help now',
  },
]

export function HomeTeasers() {
  return (
    <section
      aria-labelledby="teasers-heading"
      className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20"
    >
      <h2 id="teasers-heading" className="sr-only">
        Explore Press Paws Project
      </h2>
      <ul className="grid gap-6 md:grid-cols-3">
        {TEASERS.map((teaser) => (
          <li key={teaser.href}>
            <Card className="h-full transition-colors hover:border-accent/50">
              <CardHeader>
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-xl bg-secondary text-accent"
                >
                  <teaser.icon className="size-5" />
                </span>
                <CardTitle className="mt-3">{teaser.title}</CardTitle>
                <CardDescription>{teaser.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={teaser.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {teaser.cta}
                  <ArrowRightIcon aria-hidden="true" className="size-4" />
                </Link>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
