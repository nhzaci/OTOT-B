import { Request, Response } from 'express'
import { UserDocument } from '../mongo/user/user.model'
import { InternalAuthSuccess } from '../routes/auth/auth.model'
import { authProvider } from '../routes/auth/auth.provider'
import { UserFailure, UserSuccess } from '../routes/user/user.model'
import { UserService, userService } from '../routes/user/user.service'

export type RequestWithUser = {
  user: UserDocument
} & Request

export class AuthenticationError extends Error {
  constructor(message: string, public readonly status = 500) {
    super(message)
  }
}

const reject = (
  message: string = 'Auth token is required for authenticated routes',
  status: number = 401
) => Promise.reject(new AuthenticationError(message, status))

const resolve = <Type>(arg: Type) => Promise.resolve(arg)

export const expressAuthentication = async (
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<UserDocument> => {
  if (securityName === 'jwt') {
    const authToken = request.cookies?.auth
    const refreshToken = request.cookies?.refresh

    if (authToken === undefined || refreshToken === undefined) {
      return reject()
    }

    return authProvider.verifyAccessToken(authToken).match(
      async ({ userUuid }) => {
        const maybeUser = await userService.findById(userUuid)

        if (!maybeUser.success)
          return reject('Unable to retrieve user document')

        if (scopes === undefined) return resolve(maybeUser.data)

        for (let scope of scopes) {
          if (!maybeUser.data.roles.includes(scope))
            return reject(`User does not have the role of [${scope}]`, 403)
        }

        return resolve(maybeUser.data)
      },
      (failure) => reject(failure.message)
    )
  }

  return reject('Invalid security name')
}
