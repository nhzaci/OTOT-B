import { LoginRequest, SignupRequest } from './auth.model'
import customAxios from '../../utils/customAxios'
import axios, { AxiosResponse } from 'axios'
import { ResultAsync } from 'neverthrow'
import { Failure, Success } from '../../shared/shared.model'
class AuthService {
  private static endpoint = '/auth'

  public static login(
    email: string,
    password: string
  ): ResultAsync<Success, Failure> {
    const data: LoginRequest = {
      email,
      password,
    }

    const responsePromise: Promise<AxiosResponse<Success>> = customAxios.post(
      `${AuthService.endpoint}/login`,
      data
    )

    return ResultAsync.fromPromise(responsePromise, AuthService.mapFailure).map(
      (axiosResponse) => axiosResponse.data
    )
  }

  public static signup(
    email: string,
    password: string
  ): ResultAsync<Success, Failure> {
    const data: SignupRequest = {
      email,
      password,
    }

    const responsePromise: Promise<AxiosResponse<Success>> = customAxios.post(
      `${AuthService.endpoint}/signup`,
      data
    )

    return ResultAsync.fromPromise(responsePromise, AuthService.mapFailure).map(
      (axiosResponse) => axiosResponse.data
    )
  }

  private static mapFailure(e: unknown): Failure {
    if (axios.isAxiosError(e)) {
      const failResponse: Failure | undefined = e.response?.data
      return {
        success: false,
        message: failResponse?.message ?? e.message,
      }
    }
    return {
      success: false,
      message: 'Unknown authentication failure',
    }
  }
}

export default AuthService
