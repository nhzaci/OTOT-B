import React, { useState, createContext, ReactNode, useContext } from 'react'
import { useCookies } from 'react-cookie'
import { AuthContextType } from './auth.model'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const authContextValue = useAuthProvider()
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthProvider = () => {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined)
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    undefined
  )
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [cookies, setCookie, removeCookie] = useCookies(['auth', 'refresh'])

  const loginHandler = () => {
    setIsAuthenticated(true)
  }

  const logoutHandler = () => {
    removeCookie('auth')
    removeCookie('refresh')
    setAuthToken(undefined)
    setRefreshToken(undefined)
    setIsAuthenticated(false)
  }

  return {
    authToken,
    refreshToken,
    isAuthenticated,
    login: loginHandler,
    logout: logoutHandler,
  }
}

export const useAuth = () => {
  return useContext(AuthContext)
}
