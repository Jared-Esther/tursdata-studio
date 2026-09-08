import { HeroSection } from '@/components/hero-section'
import { HomeTeasers } from '@/components/home-teasers'
import { StatsSection } from '@/components/stats-section'

export default function Page() {
  return (
    <main id="main">
      <HeroSection />
      <StatsSection />
      <HomeTeasers />
    </main>
  )
}
