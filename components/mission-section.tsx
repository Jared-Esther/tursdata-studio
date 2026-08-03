import {
  BanknoteIcon,
  ClockIcon,
  EyeOffIcon,
  HomeIcon,
  ShieldCheckIcon,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const IMPACT = [
  {
    icon: EyeOffIcon,
    title: '100% Confidential',
    description:
      'We never publish your name, location, or story. Records are minimal, encrypted, and only seen by trained placement coordinators.',
  },
  {
    icon: BanknoteIcon,
    title: 'Zero Cost to Survivors',
    description:
      'Food, bedding, boarding and essential veterinary care are covered by donations — never invoiced to the person seeking safety.',
  },
  {
    icon: ClockIcon,
    title: 'Immediate Pet Placement',
    description:
      'Our on-call foster network across Australia is built for same-day and next-day emergency placements, including after hours.',
  },
]

export function MissionSection() {
  return (
    <section id="mission" className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-semibold tracking-wide text-accent uppercase">
          Our Mission
        </span>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl">
          Removing a critical safety barrier for domestic violence survivors.
        </h2>
        <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
          Press Paws Project arranges emergency housing and foster care for
          companion animals, ensuring humans and pets escape abuse together.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card className="border-l-4 border-l-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldCheckIcon aria-hidden="true" className="size-5 text-destructive" />
              The barrier
            </CardTitle>
            <CardDescription>Why people stay longer than they want to.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Up to <strong className="text-foreground">48% of survivors delay leaving</strong>{' '}
              an abusive environment because domestic violence shelters rarely
              accommodate pets. Leaving an animal behind can mean leaving it in
              danger, and that is a decision no one should be forced to make.
            </p>
            <p>
              Boarding kennels are expensive, ask for paperwork, and often
              require a fixed address — exactly what a person fleeing abuse
              cannot provide.
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-care">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <HomeIcon aria-hidden="true" className="size-5 text-care" />
              Our solution
            </CardTitle>
            <CardDescription>Safe, temporary, anonymous foster homes.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
            <p>
              We match each pet with a screened, background-checked foster
              household. Fosters are never told the survivor&apos;s identity or
              location, and the survivor is never told the foster address.
            </p>
            <p>
              Care continues for as long as it takes to find safe permanent
              housing, with regular welfare updates passed through our
              coordinators so you always know your animal is well.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {IMPACT.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <span
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-xl bg-secondary text-accent"
              >
                <item.icon className="size-5" />
              </span>
              <CardTitle className="mt-3">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
