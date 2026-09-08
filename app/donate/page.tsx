import type { Metadata } from 'next'
import { DonationSection } from '@/components/donation-section'
import { MaterialsWishlist } from '@/components/materials-wishlist'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Donate & Support — Press Paws Project',
  description:
    'Support emergency foster care for the pets of domestic violence survivors. Give by discrete bank transfer or donate supplies. PRESS PAWS PROJECT INCORPORATED, ABN 83 100 528 601, a registered ACNC charity.',
}

export default function DonatePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Donate & Support"
        title="Fund the safety net for survivors and their pets."
        description="Every dollar and every donated item goes directly to keeping animals safe while their families escape abuse. Choose an impact tier, give by discrete bank transfer, or contribute supplies."
      />
      <DonationSection />
      <MaterialsWishlist />
    </main>
  )
}
