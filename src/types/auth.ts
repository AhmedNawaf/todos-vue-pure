export interface IUser {
  id: number
  name: string
  email: string
  password: string
}

export interface IRegisterPayload {
  name: string
  email: string
  password: string
  confirmPassword: string
}
