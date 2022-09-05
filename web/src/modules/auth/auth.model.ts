export type LoginInputData = {
  email: string
  password: string
}

export type AuthContextType = {
  authToken: string | null
  isAuthenticated: boolean
  refreshToken: string | null
  login: (authToken: string, refreshToken: string) => void
  logout: () => void
}

export type AuthCookies = {
  access?: string
  refresh?: string
}
