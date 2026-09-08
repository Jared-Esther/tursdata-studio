'use client'

import { useState } from 'react'
import { HeartIcon, LandmarkIcon, MailIcon, ShieldCheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const PRESET_AMOUNTS = ['25', '50', '100']

const DONATE_EMAIL = 'info@presspawsproject.org.au'

export function DonationSection() {
  const [amount, setAmount] = useState<string[]>(['50'])
  const [customAmount, setCustomAmount] = useState('')

  const isCustom = amount[0] === 'custom'
  const resolvedAmount = isCustom ? customAmount || '0' : amount[0]

  const mailtoHref = `mailto:${DONATE_EMAIL}?subject=${encodeURIComponent(
    'Donation enquiry — bank transfer details',
  )}&body=${encodeURIComponent(
    `Hello Press Paws Project,\n\nI would like to donate $${resolvedAmount} (AUD) by direct bank transfer. Please send me your secure EFT details.\n\nThank you.`,
  )}`

  return (
    <section
      aria-labelledby="donate-heading"
      className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold tracking-wide text-accent uppercase">
              Impact Tiers
            </span>
            <h2
              id="donate-heading"
              className="text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl"
            >
              Your donation buys a survivor time to leave safely.
            </h2>
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
              Every placement is free to the person escaping abuse. Donations pay
              for the transport, food, bedding, boarding and veterinary care that
              make that possible.
            </p>
          </div>

          <Card className="border-l-4 border-l-care bg-care/5">
            <CardContent className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-care/15 text-care"
              >
                <HeartIcon className="size-5" />
              </span>
              <p className="text-base leading-relaxed text-foreground">
                <strong>$50 provides one week</strong> of emergency food, shelter
                and basic veterinary care for a rescued pet.
              </p>
            </CardContent>
          </Card>

          <dl className="grid gap-4 sm:grid-cols-3">
            {[
              { value: '$25', label: 'Emergency transport to a foster home' },
              { value: '$50', label: 'One week of full care for one pet' },
              { value: '$100', label: 'Vaccination and vet check on intake' },
            ].map((item) => (
              <div key={item.value} className="rounded-xl border border-border bg-card p-4">
                <dt className="text-xl font-bold text-accent">{item.value}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheckIcon aria-hidden="true" className="size-4 shrink-0 text-care" />
            Registered Australian charity — donations directly fund crisis pet care.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Give by bank transfer</CardTitle>
            <CardDescription>
              Choose an amount, then request our secure EFT details by email.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="donation-amount">Amount (AUD)</FieldLabel>
                <ToggleGroup
                  id="donation-amount"
                  value={amount}
                  onValueChange={(value) => setAmount(value.length ? value : ['50'])}
                  variant="outline"
                  className="w-full"
                >
                  {PRESET_AMOUNTS.map((preset) => (
                    <ToggleGroupItem key={preset} value={preset} className="flex-1">
                      ${preset}
                    </ToggleGroupItem>
                  ))}
                  <ToggleGroupItem value="custom" className="flex-1">
                    Custom
                  </ToggleGroupItem>
                </ToggleGroup>
                <FieldDescription>
                  This amount is included in your email so we can thank you.
                </FieldDescription>
              </Field>

              {isCustom ? (
                <Field>
                  <FieldLabel htmlFor="custom-amount">Custom amount</FieldLabel>
                  <Input
                    id="custom-amount"
                    name="customAmount"
                    type="number"
                    min={1}
                    step={1}
                    value={customAmount}
                    onChange={(event) => setCustomAmount(event.target.value)}
                    placeholder="Enter an amount in AUD"
                  />
                </Field>
              ) : null}
            </FieldGroup>

            <Separator />

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <LandmarkIcon aria-hidden="true" className="size-5 text-accent" />
                <h3 className="text-base font-semibold text-foreground">
                  Discrete direct transfer (EFT)
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                For your security and ours, we share bank details privately. Email
                us and we&apos;ll reply with our account name, BSB and account
                number so you can transfer{' '}
                <strong className="text-foreground">${resolvedAmount}</strong>{' '}
                directly.
              </p>
            </div>

            <Button
              nativeButton={false}
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              render={<a href={mailtoHref} />}
            >
              <MailIcon data-icon="inline-start" />
              Email us for transfer details
            </Button>

            <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
              <ShieldCheckIcon aria-hidden="true" className="size-3.5 shrink-0" />
              PRESS PAWS PROJECT INCORPORATED · ABN 83 100 528 601 · Registered ACNC charity.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
