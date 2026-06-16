export type LoginExpectedResult = 'success' | 'locked' | 'invalid'

export interface LoginCredentials {
  username: string
  password: string
  expectedResult: LoginExpectedResult
}
