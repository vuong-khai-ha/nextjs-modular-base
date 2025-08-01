'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/components/ui/form'
import { Input } from '@shared/components/ui/input'
import { Button } from '@shared/components/ui/button'
import { useLogin } from '@features/auth/hooks/use-login'
import { DASHBOARD_PATH } from '@config/constants/routes'

export default function LoginForm() {
  const t = useTranslations('components.forms.login')
  const router = useRouter()
  const { isLoggingIn, login } = useLogin()

  const validationRules = z.object({
    email: z
      .string()
      .nonempty(t('validation.email_required'))
      .min(1, t('validation.email_required'))
      .email(t('validation.email_invalid')),
    password: z
      .string()
      .nonempty(t('validation.password_required'))
      .min(1, t('validation.password_required')),
  })

  const form = useForm<z.infer<typeof validationRules>>({
    resolver: zodResolver(validationRules),
    defaultValues: { email: '', password: '' },
  })

  const handleSubmit = form.handleSubmit(
    async (data: z.infer<typeof validationRules>) => {
      if (isLoggingIn) return

      const { status, message } = await login(data)
      if (!status) return toast.error(message as string)

      toast.success(message as string)
      router.push(DASHBOARD_PATH)
    },
  )

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={(e) => void handleSubmit(e)}
        autoComplete="off"
        method="POST"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('lbl_email')}</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('lbl_password')}</FormLabel>
              <FormControl>
                <Input {...field} type="password" autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {t('btn_sign_in')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
