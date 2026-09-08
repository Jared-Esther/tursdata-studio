import type { Metadata } from 'next'
import {
  GraduationCapIcon,
  PawPrintIcon,
  ScrollTextIcon,
  UsersIcon,
} from 'lucide-react'
import { AcncCard } from '@/components/acnc-card'
import { PageHero } from '@/components/page-hero'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Our Mission & Governance — Press Paws Project',
  description:
    'Press Paws Project pursues three charitable purposes set out in Clause A2.1 of our Constitution: advancing social and public welfare, relieving the suffering of animals, and community education. A registered ACNC charity, ABN 83 100 528 601.',
}

const PURPOSES = [
  {
    clause: 'A2.1 (a)',
    icon: UsersIcon,
    title: 'Advancing Social & Public Welfare',
    description:
      'Removing the pet barrier that keeps victim-survivors in danger, by providing free emergency accommodation for companion animals so people can leave without abandoning them.',
    points: [
      'Same-day and next-day emergency placements',
      'Zero cost to the person seeking safety',
      'Support coordinated with refuges, hotlines and police',
    ],
  },
  {
    clause: 'A2.1 (b)',
    icon: PawPrintIcon,
    title: 'Relieving the Suffering of Animals',
    description:
      'Protecting vulnerable pets from retaliatory violence, neglect and abandonment, and providing veterinary care and safe temporary homes for as long as it takes.',
    points: [
      'Health assessment and veterinary care on intake',
      'Screened, background-checked foster households',
      'Care continues until safe permanent housing is found',
    ],
  },
  {
    clause: 'A2.1 (c)',
    icon: GraduationCapIcon,
    title: 'Community Education & Sector Training',
    description:
      'Educating the community and training frontline services to recognise the well-documented link between animal abuse and domestic and family violence.',
    points: [
      'Pet safety planning built into shelter intake protocols',
      'Public workshops and awareness campaigns',
      'Advocacy for pet-inclusive crisis housing reform',
    ],
  },
]

export default function OurMissionPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Our Mission & Governance"
        title="A charity built on a clear, constitutional purpose."
        description="Every part of our work traces back to the charitable purposes set out in our registered Constitution — so survivors, fosters and donors know exactly what we exist to do and how we are held accountable."
      />

      <section
        aria-labelledby="purposes-heading"
        className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20"
      >
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase">
            <ScrollTextIcon aria-hidden="true" className="size-4" />
            Constitution · Appendix A · Clause A2.1
          </span>
          <h2
            id="purposes-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl"
          >
            Our three charitable purposes.
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Clause A2.1 of our Constitution defines the objects of the
            association. Each purpose below quotes its clause reference directly.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PURPOSES.map((purpose) => (
            <Card key={purpose.clause} className="flex flex-col border-t-4 border-t-accent">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-xl bg-secondary text-accent"
                  >
                    <purpose.icon className="size-5" />
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 font-mono text-xs font-semibold text-muted-foreground">
                    {purpose.clause}
                  </span>
                </div>
                <CardTitle className="mt-3 text-xl">{purpose.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {purpose.description}
                </p>
                <ul className="flex flex-col gap-2 border-t border-border pt-4">
                  {purpose.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="governance-heading"
        className="border-t border-border bg-card"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold tracking-wide text-care uppercase">
              Governance & Accountability
            </span>
            <h2
              id="governance-heading"
              className="text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl"
            >
              Registered, regulated, and transparent.
            </h2>
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
              As an incorporated association and registered charity, we are bound
              by our Constitution and answerable to the Australian Charities and
              Not-for-profits Commission. Donations and placements are handled
              strictly on a not-for-profit basis.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              We operate without discrimination based on race, religion, gender,
              sexual orientation, disability, or national origin — for the people
              we help and the volunteers who make the work possible.
            </p>
          </div>

          <AcncCard />
        </div>
      </section>
    </main>
  )
}
