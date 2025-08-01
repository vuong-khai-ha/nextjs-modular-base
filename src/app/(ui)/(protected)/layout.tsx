import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { AuthProvider } from '@shared/contexts/auth-context'
import { ThemeProvider } from '@shared/components/ui/theme-provider'
import { nullableCurrentUser } from '@features/auth/use-cases/get-resource'

import { AppSidebar } from '@shared/layouts/authenticated/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@shared/components/ui/breadcrumb'
import { Separator } from '@shared/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@shared/components/ui/sidebar'

import { LOGIN_PATH } from '@config/constants/routes'

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const user = await nullableCurrentUser()
  if (!user) return redirect(LOGIN_PATH)

  return (
    <AuthProvider user={user}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            <div className="container flex-1 mx-auto max-w-[134rem]">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
