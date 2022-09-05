import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa'
import { RequestWithUser } from '../../middleware/authentication'
import { PortfolioDocument } from '../../mongo/portfolios/portfolio.model'
import { Failure } from '../../shared/shared.model'
import {
  PortfolioResultSuccess,
  PortfolioListResultSuccess,
} from './portfolio.model'
import { portfolioService, PortfolioService } from './portfolio.service'

@Route('portfolio')
@Tags('Portfolio')
export class UserInformationController extends Controller {
  private readonly portfolioService: PortfolioService

  constructor() {
    super()
    this.portfolioService = portfolioService
  }

  @Get()
  @Security('jwt')
  @SuccessResponse(200)
  @Response<Failure>(500)
  @Response(401)
  public async get(
    @Request() request: RequestWithUser
  ): Promise<PortfolioListResultSuccess | Failure> {
    const result = await this.portfolioService.getAllSorted(
      request.user.userUuid
    )
    if (result.success) {
      return result as PortfolioListResultSuccess
    }

    this.setStatus(500)
    return result as Failure
  }

  /**
   * Get the most recent user information associated with the user's Authorization token
   */
  @Get('recent')
  @Security('jwt')
  @SuccessResponse(200)
  @Response<Failure>(500)
  @Response(401)
  public async getRecent(
    @Request() request: RequestWithUser
  ): Promise<PortfolioResultSuccess | Failure> {
    const result = await this.portfolioService.getMostRecent(
      request.user.userUuid
    )
    if (result.success) {
      return result as PortfolioResultSuccess
    }

    this.setStatus(500)
    return result as Failure
  }

  /**
   * Add new user information, user information cannot be mutated, only added to
   */
  @Post()
  @Security('jwt')
  @SuccessResponse(201)
  @Response<Failure>(500)
  public async add(
    @Request() request: RequestWithUser,
    @Body() body: PortfolioDocument,
    @Query() returnUpdatedUser?: boolean
  ): Promise<PortfolioResultSuccess | Failure> {
    const result = await this.portfolioService.add(
      request.user.userUuid,
      body,
      returnUpdatedUser
    )
    if (result.success) {
      this.setStatus(201)
      return result as PortfolioResultSuccess
    }

    this.setStatus(500)
    return result as Failure
  }
}
