import { ResultAsync } from 'neverthrow'
import { models } from '../../mongo'
import { PortfolioDocument } from '../../mongo/portfolios/portfolio.model'
import { Failure } from '../../shared/shared.model'
import {
  PortfolioError,
  PortfolioResultSuccess,
  PortfolioListResultSuccess,
} from './portfolio.model'

export class PortfolioService {
  getAllSorted(userId: string): Promise<PortfolioListResultSuccess | Failure> {
    const user = models.portfolios
      .find({ userId })
      .sort({
        _id: -1,
      })
      .exec()

    return ResultAsync.fromPromise(user, this.catchMongooseErrors).match<
      PortfolioListResultSuccess | Failure
    >(this.maybeUserInfoToResults, this.errorToFailResult)
  }

  private maybeUserInfoToResults(
    maybeUserInfo: PortfolioDocument[]
  ): PortfolioListResultSuccess {
    if (maybeUserInfo.length === 0) {
      return {
        success: true,
        empty: true,
      }
    }

    return {
      success: true,
      empty: false,
      data: maybeUserInfo,
    }
  }

  getMostRecent(userId: string): Promise<PortfolioResultSuccess | Failure> {
    const user = models.portfolios
      .findOne({ userId })
      .sort({
        _id: -1,
      })
      .exec()

    return ResultAsync.fromPromise(user, this.catchMongooseErrors).match<
      PortfolioResultSuccess | Failure
    >(this.maybeUserInfoToResult, this.errorToFailResult)
  }

  private maybeUserInfoToResult(
    maybeUserInfo: PortfolioDocument | null
  ): PortfolioResultSuccess {
    if (maybeUserInfo === null) {
      return {
        success: true,
        empty: true,
      }
    }

    return {
      success: true,
      empty: false,
      data: maybeUserInfo,
    }
  }

  add(
    userId: string,
    userInformation: PortfolioDocument,
    returnUpdatedUser: boolean = false
  ): Promise<PortfolioResultSuccess | Failure> {
    const user = models.portfolios.create({
      ...userInformation,
      userId,
    })

    return ResultAsync.fromPromise(user, this.catchMongooseErrors).match<
      PortfolioResultSuccess | Failure
    >((result) => {
      if (returnUpdatedUser) {
        return {
          success: true,
          empty: false,
          data: result.toObject(),
        }
      }

      return {
        success: true,
        empty: false,
      }
    }, this.errorToFailResult)
  }

  private errorToFailResult(error: PortfolioError): Failure {
    return {
      success: false,
      message: error.message,
    }
  }

  private catchMongooseErrors(e: unknown): PortfolioError {
    // TODO: Actually catch Mongoose Error
    if (e instanceof Error) {
      return new PortfolioError(e.message)
    }
    return new PortfolioError('Unknown error from User Service')
  }
}

/** Singleton instance of portfolioService */
export const portfolioService = new PortfolioService()
