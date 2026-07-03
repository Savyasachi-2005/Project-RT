import { useState, type FormEvent } from 'react'
import { siteContent } from '@/content/siteContent'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const formUrl =
  import.meta.env.VITE_CONTACT_FORM_URL 

const inputClass =
  'w-full border border-border/60 bg-muted/30 px-4 py-3 font-sans text-sm text-primary placeholder:text-tertiary transition-colors duration-300 focus:border-accent-bright/50 focus:bg-muted/50 focus:outline-none'

export function ContactForm() {
  const { contact } = siteContent
  const { form } = contact

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!formUrl) {
      setStatus('error')
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    data.set('_subject', `ForRaise contact — ${name}`)

    setStatus('sending')

    try {
      const res = await fetch(formUrl, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      const result = await res.json().catch(() => null)

      if (res.ok || result?.ok) {
        setStatus('success')
        form.reset()
        return
      }

      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (!formUrl) {
    return (
      <p className="mt-8 text-sm text-secondary">{form.configError}</p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-eyebrow text-tertiary">
            {form.nameLabel}
          </span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder={form.namePlaceholder}
            className={inputClass}
            disabled={status === 'sending' || status === 'success'}
          />
        </label>

        <label className="block space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-eyebrow text-tertiary">
            {form.emailLabel}
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={form.emailPlaceholder}
            className={inputClass}
            disabled={status === 'sending' || status === 'success'}
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-eyebrow text-tertiary">
          {form.companyLabel}
        </span>
        <input
          type="text"
          name="company"
          autoComplete="organization"
          placeholder={form.companyPlaceholder}
          className={inputClass}
          disabled={status === 'sending' || status === 'success'}
        />
      </label>

      <label className="block space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-eyebrow text-tertiary">
          {form.messageLabel}
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={form.messagePlaceholder}
          className={cn(inputClass, 'resize-y min-h-[120px]')}
          disabled={status === 'sending' || status === 'success'}
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={status === 'sending' || status === 'success'}
          className="rounded-md px-8 font-mono text-[11px] uppercase tracking-eyebrow"
        >
          {status === 'sending' ? form.sending : form.submit}
        </Button>

        {status === 'success' && (
          <p className="text-sm text-accent-bright">{form.success}</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-destructive">{form.error}</p>
        )}
      </div>
    </form>
  )
}
