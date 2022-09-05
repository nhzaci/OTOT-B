import { AxiosResponse } from 'axios'
import { ResultAsync } from 'neverthrow'
import customAxios from '../../utils/customAxios'
import axios from 'axios'
import { UserSuccess } from './user.model'
import { Failure } from '../../shared/shared.model'

// TODO: Add refresh tokens route
export class UserService {
  private static endpoint = '/user'

  public static getUser(): ResultAsync<UserSuccess, Failure> {
    const responsePromise: Promise<AxiosResponse<UserSuccess>> =
      customAxios.get(`${UserService.endpoint}`)

    return ResultAsync.fromPromise(responsePromise, UserService.mapFailure).map(
      (res) => res.data
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
      message: 'Unknown user failure',
    }
  }
}
