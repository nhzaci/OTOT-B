import { PortfolioDocument } from '../../mongo/portfolios/portfolio.model'

export class PortfolioError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export type PortfolioListResultSuccess = {
  success: true
  /** true if user has no info created yet, otherwise false */
  empty: boolean
  data?: PortfolioDocument[]
}

export type PortfolioResultSuccess = {
  success: true
  /** true if user has no info created yet, otherwise false */
  empty: boolean
  data?: PortfolioDocument
}
