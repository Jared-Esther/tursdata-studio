import { BadgeCheckIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const REGISTRY = [
  { label: 'Legal entity', value: 'PRESS PAWS PROJECT INCORPORATED' },
  { label: 'Entity type', value: 'Incorporated Association' },
  { label: 'ABN', value: '83 100 528 601' },
  { label: 'Regulator', value: 'Australian Charities & Not-for-profits Commission (ACNC)' },
  { label: 'Governing law', value: 'Associations Incorporation Act 2009 (NSW)' },
]

const SUBTYPES = [
  'Advancing Social or Public Welfare',
  'Preventing or Relieving the Suffering of Animals',
]

export function AcncCard() {
  return (
    <Card className="border-care/40 bg-care/5">
      <CardHeader>
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-xl bg-care/15 text-care"
        >
          <BadgeCheckIcon className="size-5" />
        </span>
        <CardTitle className="mt-3 text-2xl">Registered &amp; accountable</CardTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Press Paws Project is a registered Australian charity, accountable to
          the ACNC and governed by a formal Constitution.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <dl className="divide-y divide-border rounded-xl border border-border bg-background">
          {REGISTRY.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <dt className="text-sm text-muted-foreground">{row.label}</dt>
              <dd className="text-sm font-semibold text-foreground sm:text-right">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Registered charitable subtypes
          </h3>
          <ul className="flex flex-col gap-2">
            {SUBTYPES.map((subtype) => (
              <li key={subtype} className="flex items-start gap-2.5 text-sm text-foreground">
                <BadgeCheckIcon
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-care"
                />
                {subtype}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
