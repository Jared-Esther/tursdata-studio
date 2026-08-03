import Link from 'next/link'
import { LifeBuoyIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { DonationSection } from '@/components/donation-section'
import { FosterSection } from '@/components/foster-section'
import { HeroSection } from '@/components/hero-section'
import { MissionSection } from '@/components/mission-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <MissionSection />

        <section className="mx-auto max-w-6xl px-4 pb-14 md:px-6 md:pb-20">
          <Alert className="border-accent/40 bg-accent/5">
            <LifeBuoyIcon />
            <AlertTitle>Need a safe place for your pet right now?</AlertTitle>
            <AlertDescription>
              <p>
                Our confidential intake takes about three minutes and never asks
                for your address or identification.
              </p>
              <Button
                nativeButton={false}
                render={<Link href="/get-help" />}
                className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Get Emergency Help Now
              </Button>
            </AlertDescription>
          </Alert>
        </section>

        <FosterSection />
        <DonationSection />
      </main>
      <SiteFooter />
    </>
  )
}
