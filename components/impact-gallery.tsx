import Image from 'next/image'

const GALLERY = [
  {
    src: '/impact-vet-checkup.png',
    alt: 'A veterinarian gently examining a calm rescue dog during an intake health check.',
    title: 'Intake & veterinary checkups',
    caption:
      'Every animal receives a health assessment and prompt veterinary care on arrival, so foster placements start safe and stress-free.',
  },
  {
    src: '/impact-care-supplies.png',
    alt: 'A volunteer preparing crates, pet food and blankets for an emergency placement.',
    title: 'Essential care supplies',
    caption:
      'Volunteers pack crates, food and bedding ahead of time so an emergency placement can happen the same day it is needed.',
  },
  {
    src: '/impact-foster-cat.png',
    alt: 'A relaxed cat settled comfortably into an accredited volunteer foster home.',
    title: 'Safe foster homes',
    caption:
      'Screened, accredited foster households give pets a calm, temporary home while their family finds safety — locations kept strictly confidential.',
  },
  {
    src: '/impact-advocacy.png',
    alt: 'A community training workshop with pet-safety planning flyers on a table.',
    title: 'Community advocacy',
    caption:
      'We train frontline services and run public workshops on pet safety planning in domestic and family violence situations.',
  },
]

export function ImpactGallery() {
  return (
    <section id="impact" className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-semibold tracking-wide text-accent uppercase">
          Community Impact
        </span>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl">
          Community Impact &amp; Field Operations
        </h2>
        <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
          A look at the work behind every placement — from intake and veterinary
          care to foster homes and frontline advocacy. Survivor identities and
          foster locations are always protected.
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {GALLERY.map((item) => (
          <li
            key={item.title}
            className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="relative aspect-4/3 w-full">
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 p-5">
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.caption}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
