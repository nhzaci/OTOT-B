export type LoginRequest = {
  email: string
  password: string
}

export type SignupRequest = {
  email: string
  password: string
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
  }
}
