export type UserRole = {
  _id: string
  roles: string[]
}

export type UserSuccess = {
  success: true
  data: UserRole
}
