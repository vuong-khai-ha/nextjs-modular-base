import type { ReactNode } from 'react'
import { ThemeProvider } from '@shared/components/ui/theme-provider'

export default function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
