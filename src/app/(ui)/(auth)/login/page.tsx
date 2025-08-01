import { redirect } from 'next/navigation'
import { nullableCurrentUser } from '@features/auth/use-cases/get-resource'
import LoginForm from '@features/auth/components/forms/login'
import { DASHBOARD_PATH } from '@config/constants/routes'
import { GalleryVerticalEnd } from 'lucide-react'
import Image from 'next/image'

export default async function PageAuthLogin() {
  const user = await nullableCurrentUser()
  if (user) return redirect(DASHBOARD_PATH)

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Ha Vuong Khai
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:flex items-center justify-center">
        <Image
          src="/images/auth/login.svg"
          alt="Image"
          fill
          className="bg-muted"
        />
      </div>
    </div>
  )
}
