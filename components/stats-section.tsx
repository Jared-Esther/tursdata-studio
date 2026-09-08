const STATS = [
  {
    value: 'Up to 48%',
    label:
      'of survivors delay leaving a violent home out of fear for a pet left behind.',
  },
  {
    value: '1 in 3',
    label:
      'women report their abuser threatened or harmed an animal to control them.',
  },
  {
    value: '< 10%',
    label:
      'of domestic and family violence refuges in Australia can accommodate pets on-site.',
  },
  {
    value: '20+ days',
    label:
      'is the average wait for crisis housing — time a pet needs somewhere safe to stay.',
  },
]

export function StatsSection() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="border-y border-border bg-card"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold tracking-wide text-accent uppercase">
            The National Picture
          </span>
          <h2
            id="stats-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl"
          >
            Pets are a hidden barrier to escaping domestic violence.
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Abusers know how much a pet matters. For thousands of Australians
            each year, the choice between their own safety and their animal&apos;s
            is the reason they stay. Press Paws Project exists to remove that
            choice.
          </p>
        </div>

        <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 rounded-xl border border-border bg-background p-6"
            >
              <dt className="text-3xl font-bold text-accent">{stat.value}</dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-xs text-muted-foreground">
          Figures reflect widely reported Australian and international research on
          the link between companion animals and domestic and family violence.
        </p>
      </div>
    </section>
  )
}
