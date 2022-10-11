export type UserDocument = {
  _id: string
  roles: string[]
  email?: string
}

export enum UserProfileRole {
  Read = 'read:profile',
  Write = 'write:profile',
}
