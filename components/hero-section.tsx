import Image from 'next/image'
import Link from 'next/link'
import { HeartHandshakeIcon, LifeBuoyIcon, LockIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section id="top" className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:px-6 md:py-20 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            <LockIcon aria-hidden="true" className="size-3.5" />
            Registered Australian non-profit · 100% confidential
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-balance text-foreground md:text-5xl">
            Escape Abuse Together. No Pet Left Behind.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Providing emergency, confidential foster care for pets of domestic
            violence survivors across Australia — at no cost, and with no
            questions that put your safety at risk.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/get-help" />}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <LifeBuoyIcon data-icon="inline-start" />
              Get Emergency Help Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/#foster" />}
            >
              <HeartHandshakeIcon data-icon="inline-start" />
              Become a Foster Caregiver
            </Button>
            <Button
              size="lg"
              variant="ghost"
              nativeButton={false}
              render={<Link href="/#donate" />}
            >
              Donate Today
            </Button>
          </div>

          <dl className="grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {[
              { value: '48%', label: 'of survivors delay leaving because of a pet' },
              { value: '$0', label: 'cost to survivors, always' },
              { value: '24/7', label: 'confidential intake requests' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="text-2xl font-bold text-accent">{stat.value}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border">
          <Image
            src="/hero-safe-together.png"
            alt="A survivor sitting on a sunlit porch with her rescue dog and cat, safe together"
            width={1200}
            height={900}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
