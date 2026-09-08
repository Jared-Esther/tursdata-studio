export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 md:px-6 md:py-16">
        <span className="text-sm font-semibold tracking-wide text-accent uppercase">
          {eyebrow}
        </span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance text-foreground md:text-5xl">
          {title}
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  )
}
