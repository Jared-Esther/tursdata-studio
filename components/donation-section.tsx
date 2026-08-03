'use client'

import { useState } from 'react'
import { CreditCardIcon, HeartIcon, LockIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const PRESET_AMOUNTS = ['25', '50', '100']

export function DonationSection() {
  const [frequency, setFrequency] = useState<string[]>(['monthly'])
  const [amount, setAmount] = useState<string[]>(['50'])
  const [customAmount, setCustomAmount] = useState('')

  const isCustom = amount[0] === 'custom'
  const resolvedAmount = isCustom ? customAmount || '0' : amount[0]
  const isMonthly = frequency[0] === 'monthly'

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    toast.success('Demo checkout only', {
      description: `This layout is a mock. No payment of $${resolvedAmount} was processed.`,
    })
  }

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
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Make a donation</CardTitle>
            <CardDescription>
              Australian non-profit. Card details below are a demonstration layout only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="donation-frequency">Giving frequency</FieldLabel>
                  <ToggleGroup
                    id="donation-frequency"
                    value={frequency}
                    onValueChange={(value) => setFrequency(value.length ? value : ['monthly'])}
                    variant="outline"
                    className="w-full"
                  >
                    <ToggleGroupItem value="once" className="flex-1">
                      One-time
                    </ToggleGroupItem>
                    <ToggleGroupItem value="monthly" className="flex-1">
                      Monthly
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <FieldDescription>
                    {isMonthly
                      ? 'Monthly giving lets us commit to placements before donations arrive.'
                      : 'A single gift, charged once.'}
                  </FieldDescription>
                </Field>

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
                <Button type="button" variant="outline" size="lg" className="w-full" onClick={() =>
                  toast.info('Apple Pay is not enabled in this demo')
                }>
                  Pay with Apple Pay
                </Button>
                <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">or pay by card</span>
                  <Separator className="flex-1" />
                </div>
              </div>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="card-number">Card number</FieldLabel>
                  <Input
                    id="card-number"
                    name="cardNumber"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="4242 4242 4242 4242"
                  />
                </Field>
                <Field orientation="responsive">
                  <Field>
                    <FieldLabel htmlFor="card-expiry">Expiry</FieldLabel>
                    <Input
                      id="card-expiry"
                      name="cardExpiry"
                      autoComplete="cc-exp"
                      placeholder="MM / YY"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="card-cvc">CVC</FieldLabel>
                    <Input
                      id="card-cvc"
                      name="cardCvc"
                      autoComplete="cc-csc"
                      placeholder="123"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="card-postcode">Postcode</FieldLabel>
                    <Input id="card-postcode" name="cardPostcode" placeholder="2229" />
                  </Field>
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <CreditCardIcon data-icon="inline-start" />
                Donate ${resolvedAmount}
                {isMonthly ? ' monthly' : ''}
              </Button>

              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <LockIcon aria-hidden="true" className="size-3.5" />
                Demonstration checkout — no card data is transmitted or stored.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
