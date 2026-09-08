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

const BANK_DETAILS = [
  { label: 'Account name', value: 'PRESS PAWS PROJECT INCORPORATED' },
  { label: 'Bank', value: 'Commonwealth Bank of Australia' },
  { label: 'BSB', value: '[To be configured]' },
  { label: 'Account number', value: '[To be configured]' },
]

export function DonationSection() {
  const [amount, setAmount] = useState<string[]>(['50'])
  const [customAmount, setCustomAmount] = useState('')

  const isCustom = amount[0] === 'custom'
  const resolvedAmount = isCustom ? customAmount || '0' : amount[0]

  return (
    <section id="donate" className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold tracking-wide text-accent uppercase">
              Donate
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl">
              Your donation buys a survivor time to leave safely.
            </h2>
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
              Every placement is free to the person escaping abuse. Donations pay
              for the food, bedding, boarding and veterinary care that make that
              possible.
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
            <CardTitle className="text-2xl">Make a donation</CardTitle>
            <CardDescription>
              Choose an amount, then give securely by direct bank transfer (EFT).
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
                  Use the amount below as your transfer reference so we can thank you.
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
                  Direct bank transfer (EFT)
                </h3>
              </div>
              <dl className="divide-y divide-border rounded-xl border border-border bg-secondary/40">
                {BANK_DETAILS.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <dt className="text-sm text-muted-foreground">{detail.label}</dt>
                    <dd className="text-sm font-semibold text-foreground sm:text-right">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-sm text-muted-foreground">
                Please use <strong className="text-foreground">${resolvedAmount}</strong> as
                a guide for your gift and add &ldquo;Donation&rdquo; as the reference.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                nativeButton={false}
                size="lg"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                render={
                  <a href="mailto:info@presspawsproject.org.au?subject=Donation%20via%20Secure%20Portal" />
                }
              >
                Donate via Secure Portal
              </Button>
              <Button
                nativeButton={false}
                size="lg"
                variant="outline"
                className="w-full"
                render={<a href="mailto:info@presspawsproject.org.au?subject=Donation%20enquiry" />}
              >
                <MailIcon data-icon="inline-start" />
                Contact Us to Donate
              </Button>
            </div>

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
