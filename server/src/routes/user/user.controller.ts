import { Controller, Get, Request, Route, Security, Tags } from 'tsoa'
import { RequestWithUser } from '../../middleware/authentication'
import { UserFailure, UserSuccess } from './user.model'
import { userService, UserService } from './user.service'

@Route('user')
@Tags('User')
export class UserController extends Controller {
  private readonly userService: UserService

  constructor() {
    super()
    this.userService = userService
  }

  @Get()
  @Security('jwt')
  public async get(@Request() request: RequestWithUser) {
    console.log(`UserController: request user: `, request.user)
    const result = await this.userService.findById(request.user._id)
    if (result.success) {
      this.setStatus(200)
      return result as UserSuccess
    }
    this.setStatus(401)
    return result as UserFailure
  }

  @Get('unauthorized')
  @Security('jwt', ['somescope:scope'])
  public async unauthorized(@Request() request: RequestWithUser) {
    const result = await this.userService.findById(request.user._id)
    if (result.success) {
      this.setStatus(200)
      return result as UserSuccess
    }
    this.setStatus(401)
    return result as UserFailure
  }
}
