import Image from 'next/image'

const GALLERY = [
  {
    src: '/impact-vet-checkup.png',
    alt: 'A veterinarian gently examining a calm rescue dog during an intake health check.',
    title: 'Veterinary care',
    caption:
      'Every animal receives a health assessment and prompt veterinary treatment on arrival, so placements start safe and stress-free.',
  },
  {
    src: '/impact-care-supplies.png',
    alt: 'A volunteer preparing crates, pet food and blankets for an emergency placement.',
    title: 'Crisis supplies packaging',
    caption:
      'Volunteers pack crates, food and bedding ahead of time so an emergency placement can happen the same day it is needed.',
  },
  {
    src: '/impact-foster-cat.png',
    alt: 'A relaxed cat settled comfortably into an accredited volunteer foster home.',
    title: 'Foster home network',
    caption:
      'Screened, accredited households give pets a calm temporary home while their family finds safety — locations kept strictly confidential.',
  },
  {
    src: '/impact-advocacy.png',
    alt: 'A frontline worker training session with pet-safety planning materials on a table.',
    title: 'Frontline worker training',
    caption:
      'We train refuge, hotline and police staff to build pet safety planning into their intake and crisis-response protocols.',
  },
  {
    src: '/impact-safe-reunion.png',
    alt: 'A person joyfully reunited with their rescue dog in a bright, safe outdoor setting.',
    title: 'Safe reunions',
    caption:
      'When a survivor reaches secure housing, we coordinate a calm, private reunion so families and their pets can rebuild together.',
  },
  {
    src: '/impact-public-seminar.png',
    alt: 'Attendees seated at a community seminar about pet safety planning.',
    title: 'Public seminars',
    caption:
      'Community seminars raise awareness of the link between animal abuse and domestic violence, and show how the public can help.',
  },
]

export function ImpactGallery() {
  return (
    <section
      aria-labelledby="gallery-heading"
      className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20"
    >
      <div className="flex flex-col gap-4">
        <span className="text-sm font-semibold tracking-wide text-accent uppercase">
          Field Operations
        </span>
        <h2
          id="gallery-heading"
          className="max-w-3xl text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl"
        >
          The work behind every safe placement.
        </h2>
        <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
          From intake and veterinary care to reunions and community advocacy —
          survivor identities and foster locations are always protected.
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY.map((item) => (
          <li
            key={item.title}
            className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="relative aspect-4/3 w-full">
              <Image
                src={item.src || '/placeholder.svg'}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
