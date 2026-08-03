'use client'

import Image from 'next/image'
import { useState } from 'react'
import { CheckCircle2Icon, HeartHandshakeIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const HOUSING_TYPES = [
  { value: 'house-yard', label: 'House with fenced yard' },
  { value: 'house-no-yard', label: 'House, no yard' },
  { value: 'apartment', label: 'Apartment or unit' },
  { value: 'rural', label: 'Rural or acreage' },
]

export function FosterSection() {
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    document.getElementById('foster')?.scrollIntoView({ behavior: 'smooth' })
    toast.success('Thank you for offering a safe home', {
      description: 'Our volunteer team will be in touch about screening and training.',
    })
  }

  return (
    <section id="foster" className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold tracking-wide text-care uppercase">
              Become a Foster
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl">
              Open your home. Change two lives at once.
            </h2>
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
              Fosters give a pet a calm place to wait while their person finds
              safe permanent housing. Most placements run four to twelve weeks,
              and we cover food, bedding and veterinary costs.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <Image
              src="/foster-home.png"
              alt="A calm foster living room with a cat resting on an armchair and a dog bed nearby"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>

          <ul className="flex flex-col gap-3">
            {[
              'All food, bedding and veterinary care is reimbursed.',
              'You are never given the survivor’s name or location.',
              'Free induction training and a 24/7 coordinator contact.',
              'You choose which species, sizes and timeframes suit you.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
                <CheckCircle2Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-care" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Foster interest form</CardTitle>
            <CardDescription>
              No commitment — this simply starts a conversation with our volunteer team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="flex flex-col gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-xl bg-care/10 text-care"
                >
                  <HeartHandshakeIcon className="size-6" />
                </span>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Thank you. A volunteer coordinator will email you about
                  screening, a home check and induction training. You can
                  withdraw at any stage.
                </p>
                <Button variant="outline" className="w-fit" onClick={() => setSubmitted(false)}>
                  Submit another form
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <FieldGroup>
                  <Field orientation="responsive">
                    <Field>
                      <FieldLabel htmlFor="foster-name">Full name</FieldLabel>
                      <Input id="foster-name" name="fosterName" required autoComplete="name" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="foster-email">Email</FieldLabel>
                      <Input
                        id="foster-email"
                        name="fosterEmail"
                        type="email"
                        required
                        autoComplete="email"
                      />
                    </Field>
                  </Field>

                  <Field orientation="responsive">
                    <Field>
                      <FieldLabel htmlFor="foster-location">Suburb and state</FieldLabel>
                      <Input
                        id="foster-location"
                        name="fosterLocation"
                        required
                        placeholder="e.g. Caringbah South, NSW"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="foster-housing">Housing type</FieldLabel>
                <Select name="fosterHousing" defaultValue="house-yard" items={HOUSING_TYPES}>
                  <SelectTrigger id="foster-housing" className="w-full">
                    <SelectValue placeholder="Select housing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {HOUSING_TYPES.map((housing) => (
                        <SelectItem key={housing.value} value={housing.value}>
                          {housing.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                    </Field>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="foster-experience">Experience with pets</FieldLabel>
                    <Textarea
                      id="foster-experience"
                      name="fosterExperience"
                      rows={4}
                      placeholder="Species you have cared for, current pets in the home, and any fostering or veterinary experience."
                    />
                  </Field>

                  <Field orientation="horizontal" className="rounded-lg border border-border p-4">
                    <Checkbox
                      id="foster-consent"
                      name="fosterConsent"
                      required
                      checked={agreed}
                      onCheckedChange={(checked) => setAgreed(checked === true)}
                    />
                    <FieldContent>
                      <FieldTitle>
                        <FieldLabel htmlFor="foster-consent">
                          I agree to privacy and background checks
                        </FieldLabel>
                      </FieldTitle>
                      <FieldDescription>
                        Because we protect survivors, all carers complete an
                        identity and police check and sign a confidentiality
                        agreement.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldGroup>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-care text-care-foreground hover:bg-care/90"
                >
                  <HeartHandshakeIcon data-icon="inline-start" />
                  Register My Interest
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
