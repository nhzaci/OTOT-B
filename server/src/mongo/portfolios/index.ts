import { model, Schema, Model } from 'mongoose'
import { PortfolioDocument, educations, skills, works } from './portfolio.model'

const portfolioSchema: Schema = new Schema(
  {
    about: String,
    works,
    educations,
    skills,
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const portfolios: Model<PortfolioDocument> = model(
  'portfolios',
  portfolioSchema
)
