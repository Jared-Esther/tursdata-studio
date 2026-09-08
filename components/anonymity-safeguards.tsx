import { EyeOffIcon, KeyRoundIcon, ShieldCheckIcon, UserXIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const SAFEGUARDS = [
  {
    icon: UserXIcon,
    title: 'Survivors stay anonymous',
    description:
      'Fosters are never given the survivor’s name, contact details, or location. A pet arrives through a coordinator, never a direct handover.',
  },
  {
    icon: EyeOffIcon,
    title: 'Foster homes stay hidden',
    description:
      'The survivor is never told which household or suburb is caring for their pet, so the placement address can never be disclosed under pressure.',
  },
  {
    icon: KeyRoundIcon,
    title: 'Coordinators are the only link',
    description:
      'All welfare updates, photos and logistics pass through a single trained placement coordinator who holds both sides confidentially.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Minimal, protected records',
    description:
      'We store only what is essential, under an alias where possible, and every carer signs a confidentiality agreement after police and identity checks.',
  },
]

export function AnonymitySafeguards() {
  return (
    <section
      aria-labelledby="safeguards-heading"
      className="border-t border-border bg-card"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold tracking-wide text-care uppercase">
            Operational Safeguards
          </span>
          <h2
            id="safeguards-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl"
          >
            100% mutual anonymity, by design.
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
            The safety of our program depends on a strict information barrier
            between the survivor and the foster household. Neither side can
            identify the other — not by accident, and not under coercion.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {SAFEGUARDS.map((item) => (
            <Card key={item.title} className="border-l-4 border-l-care">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-care/15 text-care"
                  >
                    <item.icon className="size-5" />
                  </span>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
