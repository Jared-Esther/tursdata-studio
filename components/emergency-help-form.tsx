'use client'

import { useState } from 'react'
import { CheckCircle2Icon, PhoneCallIcon, SendIcon, TriangleAlertIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const CONTACT_METHODS = [
  { value: 'text', label: 'Text message' },
  { value: 'phone', label: 'Phone call' },
  { value: 'email', label: 'Email' },
]

const CONTACT_WINDOWS = [
  { value: 'morning', label: 'Morning (8am – 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm – 5pm)' },
  { value: 'evening', label: 'Evening (5pm – 9pm)' },
  { value: 'any', label: 'Any time is safe' },
]

const ANIMAL_TYPES = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'both', label: 'Dogs and cats' },
  { value: 'small', label: 'Small animal or bird' },
  { value: 'other', label: 'Other or multiple species' },
]

export function EmergencyHelpForm() {
  const [contactMethod, setContactMethod] = useState<string[]>(['text'])
  const [immediateDanger, setImmediateDanger] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    toast.success('Confidential request received', {
      description: 'A placement coordinator will make contact only in your chosen window.',
    })
  }

  if (submitted) {
    return (
      <Card className="border-care/40">
        <CardHeader>
          <span
            aria-hidden="true"
            className="flex size-11 items-center justify-center rounded-xl bg-care/10 text-care"
          >
            <CheckCircle2Icon className="size-6" />
          </span>
          <CardTitle className="mt-3 text-2xl">Your request has been sent</CardTitle>
          <CardDescription>
            Reference held under your alias only. Nothing identifying has been stored.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-base leading-relaxed text-muted-foreground">
            A trained placement coordinator will reach out using only the contact
            method and time window you selected. If someone answers who is not
            you, we will end the call without naming this organisation.
          </p>
          <Alert>
            <TriangleAlertIcon />
            <AlertTitle>Please clear your browsing history now</AlertTitle>
            <AlertDescription>
              If there is any chance your device is monitored, clear your history
              or use the Quick Escape button to leave this page.
            </AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => setSubmitted(false)} className="w-fit">
            Send another request
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Confidential intake request</CardTitle>
          <CardDescription>
            Only fill in what feels safe. Every field except a contact method is
            optional, and you never have to use your real name.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="alias">Preferred alias or name</FieldLabel>
              <Input
                id="alias"
                name="alias"
                autoComplete="off"
                placeholder="Anything you would like us to call you"
              />
              <FieldDescription>
                Use a nickname or a made-up name. We will only ever use this.
              </FieldDescription>
            </Field>

            <FieldSet>
              <FieldLegend variant="label">Safe contact method</FieldLegend>
              <FieldDescription>
                Choose the method least likely to be seen by anyone else.
              </FieldDescription>
              <ToggleGroup
                value={contactMethod}
                onValueChange={(value) => setContactMethod(value.length ? value : ['text'])}
                variant="outline"
                className="w-full"
              >
                {CONTACT_METHODS.map((method) => (
                  <ToggleGroupItem key={method.value} value={method.value} className="flex-1">
                    {method.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </FieldSet>

            <Field>
              <FieldLabel htmlFor="contact-info">Safe contact details</FieldLabel>
              <Input
                id="contact-info"
                name="contactInfo"
                required
                autoComplete="off"
                placeholder="Number or email we can reach safely"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="contact-window">Safe contact window</FieldLabel>
              <Select name="contactWindow" defaultValue="any" items={CONTACT_WINDOWS}>
                <SelectTrigger id="contact-window" className="w-full">
                  <SelectValue placeholder="When is it safe to contact you?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {CONTACT_WINDOWS.map((window) => (
                      <SelectItem key={window.value} value={window.value}>
                        {window.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="location">General location, suburb or postcode</FieldLabel>
              <Input
                id="location"
                name="location"
                autoComplete="off"
                placeholder="e.g. Sutherland Shire NSW, or 2229"
              />
              <FieldDescription>
                A suburb or postcode is enough — we do not need your address.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">About your pets</CardTitle>
          <CardDescription>
            This helps us match the right foster household before we call you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
              <Field>
                <FieldLabel htmlFor="animal-type">Type of animal</FieldLabel>
                <Select name="animalType" defaultValue="dog" items={ANIMAL_TYPES}>
                  <SelectTrigger id="animal-type" className="w-full">
                    <SelectValue placeholder="Select animal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ANIMAL_TYPES.map((animal) => (
                        <SelectItem key={animal.value} value={animal.value}>
                          {animal.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="pet-count">Number of pets</FieldLabel>
                <Input
                  id="pet-count"
                  name="petCount"
                  type="number"
                  min={1}
                  max={20}
                  defaultValue={1}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="pet-needs">Medical or special needs</FieldLabel>
              <Textarea
                id="pet-needs"
                name="petNeeds"
                rows={4}
                placeholder="Medications, anxiety, injuries, dietary needs, or anything a carer should know."
              />
              <FieldDescription>
                Leave blank if you are not sure — a coordinator can go through this with you.
              </FieldDescription>
            </Field>

            <FieldSet>
              <FieldLegend variant="label">Your immediate safety</FieldLegend>
              <Field orientation="horizontal" className="rounded-lg border border-border p-4">
                <Checkbox
                  id="immediate-danger"
                  name="immediateDanger"
                  checked={immediateDanger}
                  onCheckedChange={(checked) => setImmediateDanger(checked === true)}
                />
                <FieldContent>
                  <FieldTitle>
                    <FieldLabel htmlFor="immediate-danger">
                      I am currently in immediate danger
                    </FieldLabel>
                  </FieldTitle>
                  <FieldDescription>
                    Ticking this flags your request as urgent, but it is not an
                    emergency service.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldSet>

            {immediateDanger ? (
              <Alert variant="destructive">
                <PhoneCallIcon />
                <AlertTitle>Please call emergency services first</AlertTitle>
                <AlertDescription>
                  If you are in immediate danger, call{' '}
                  <strong>000</strong> now, or 1800RESPECT on{' '}
                  <strong>1800 737 732</strong> for 24/7 confidential support.
                  We cannot respond in real time.
                </AlertDescription>
              </Alert>
            ) : null}
          </FieldGroup>
        </CardContent>
      </Card>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-fit"
      >
        <SendIcon data-icon="inline-start" />
        Send Confidential Request
      </Button>
    </form>
  )
}
