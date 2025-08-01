'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { IPublicUser } from '@features/users/types.d'

type AuthContextType = {
  user: IPublicUser | null | undefined
  setUser: (user: IPublicUser | null | undefined) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({
  user: initialUser,
  children,
}: {
  user: IPublicUser | null | undefined
  children: ReactNode
}) {
  const [user, setUser] = useState<IPublicUser | null | undefined>(initialUser)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
