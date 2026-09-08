import { BoneIcon, MailIcon, PackageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const WISHLIST = [
  'New or gently used collars, leads and harnesses',
  'Sturdy pet crates and carriers (all sizes)',
  'Unopened dry and wet food (dog and cat)',
  'Clean blankets, towels and pet bedding',
  'Food and water bowls',
  'Unopened flea, tick and worming treatments',
]

const DONATE_EMAIL = 'info@presspawsproject.org.au'

export function MaterialsWishlist() {
  return (
    <section
      aria-labelledby="wishlist-heading"
      className="border-t border-border bg-card"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2 text-sm font-semibold tracking-wide text-care uppercase">
              <PackageIcon aria-hidden="true" className="size-4" />
              Material Donations
            </span>
            <h2
              id="wishlist-heading"
              className="text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl"
            >
              Prefer to give supplies?
            </h2>
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
              Practical items go straight to pets in emergency placements. If you
              can donate any of the following, email us and we&apos;ll arrange a
              safe drop-off or collection point.
            </p>
            <Button
              nativeButton={false}
              size="lg"
              variant="outline"
              className="w-fit"
              render={
                <a
                  href={`mailto:${DONATE_EMAIL}?subject=${encodeURIComponent(
                    'Material donation offer',
                  )}`}
                />
              }
            >
              <MailIcon data-icon="inline-start" />
              Offer a material donation
            </Button>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {WISHLIST.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground"
              >
                <BoneIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-care" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
