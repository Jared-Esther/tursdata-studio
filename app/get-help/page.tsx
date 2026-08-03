import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeftIcon, PhoneCallIcon, TriangleAlertIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { EmergencyHelpForm } from '@/components/emergency-help-form'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Get Emergency Help — Press Paws Project',
  description:
    'Send a confidential request for emergency foster care for your pet. Free, private, and available to domestic violence survivors across Australia.',
  robots: { index: false, follow: false },
}

export default function GetHelpPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <Alert variant="destructive" className="mb-8">
          <TriangleAlertIcon />
          <AlertTitle>Safety warning</AlertTitle>
          <AlertDescription>
            If your device may be monitored, please use a safe computer or phone —
            such as a library, a friend&apos;s device, or a private browsing
            window — or clear your browser history after visiting. Press{' '}
            <strong>ESC twice</strong> or use the red Quick Escape button to leave
            this page immediately.
          </AlertDescription>
        </Alert>

        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link href="/#top" />}
          className="mb-6 w-fit"
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Back to home
        </Button>

        <div className="mb-8 flex flex-col gap-4">
          <span className="text-sm font-semibold tracking-wide text-accent uppercase">
            Get Emergency Help
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl">
            A safe place for your pet, so you can leave safely.
          </h1>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            This form is confidential and free. We do not ask for identification,
            an address, or details of what has happened to you. Answer only what
            feels safe.
          </p>
        </div>

        <Alert className="mb-8">
          <PhoneCallIcon />
          <AlertTitle>This is not an emergency service</AlertTitle>
          <AlertDescription>
            If you are in immediate danger, call <strong>000</strong>. For 24/7
            confidential support, call 1800RESPECT on{' '}
            <strong>1800 737 732</strong>.
          </AlertDescription>
        </Alert>

        <EmergencyHelpForm />
      </main>
      <SiteFooter />
    </>
  )
}
