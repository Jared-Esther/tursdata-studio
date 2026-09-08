import type { Metadata } from 'next'
import { AnonymitySafeguards } from '@/components/anonymity-safeguards'
import { FosterSection } from '@/components/foster-section'
import { ImpactGallery } from '@/components/impact-gallery'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Programs & Field Operations — Press Paws Project',
  description:
    'See how Press Paws Project works: veterinary intake, crisis supply packing, a confidential foster network, frontline worker training, safe reunions and public seminars — with 100% mutual anonymity between survivors and foster homes.',
}

export default function ProgramsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Programs & Field Operations"
        title="How a pet gets from danger to a safe temporary home."
        description="Every placement moves through the same careful pipeline — rapid intake, veterinary care, a screened foster home, and eventually a safe reunion — all protected by a strict two-way information barrier."
      />
      <ImpactGallery />
      <AnonymitySafeguards />
      <FosterSection />
    </main>
  )
}
