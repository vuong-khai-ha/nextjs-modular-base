import { getCurrentUser } from '@features/auth/use-cases/get-resource'

export default async function PageProtectedAccountProfile() {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center">
          <h3 className="text-lg font-semibold">
            Welcome, {user?.email || 'Guest'}!
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            You are viewing the protected dashboard page.
          </p>
        </div>
      </div>
    </div>
  )
}
