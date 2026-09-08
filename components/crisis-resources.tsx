import { AmbulanceIcon, PhoneCallIcon, UsersIcon } from 'lucide-react'

const RESOURCES = [
  {
    icon: AmbulanceIcon,
    name: 'Emergency (Police, Fire, Ambulance)',
    detail: 'In immediate danger',
    phone: '000',
    href: 'tel:000',
    urgent: true,
  },
  {
    icon: PhoneCallIcon,
    name: '1800RESPECT',
    detail: '24/7 confidential DV counselling',
    phone: '1800 737 732',
    href: 'tel:1800737732',
    urgent: false,
  },
  {
    icon: UsersIcon,
    name: "Men's Referral Service",
    detail: 'Support to stop using violence',
    phone: '1300 766 491',
    href: 'tel:1300766491',
    urgent: false,
  },
]

export function CrisisResources() {
  return (
    <section
      aria-label="Crisis support phone lines"
      className="rounded-xl border border-border bg-secondary/40 p-4 md:p-5"
    >
      <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        External national crisis helplines (24/7)
      </h2>
      <ul className="grid gap-3 sm:grid-cols-3">
        {RESOURCES.map((resource) => (
          <li key={resource.name}>
            <a
              href={resource.href}
              className="flex h-full flex-col gap-1 rounded-lg border border-border bg-background p-4 transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <resource.icon
                  aria-hidden="true"
                  className={
                    resource.urgent
                      ? 'size-4 shrink-0 text-destructive'
                      : 'size-4 shrink-0 text-accent'
                  }
                />
                {resource.name}
              </span>
              <span
                className={
                  resource.urgent
                    ? 'text-2xl font-bold text-destructive'
                    : 'text-2xl font-bold text-accent'
                }
              >
                {resource.phone}
              </span>
              <span className="text-xs text-muted-foreground">{resource.detail}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
