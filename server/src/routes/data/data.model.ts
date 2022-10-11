export type DataSuccess = {
  success: true
  fromCache: boolean
  data: any
  time: number
}

export type DataFailure = {
  success: false
  message: string
}
