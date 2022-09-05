import mongoose from 'mongoose'
import { SchemaDefinitionProperty } from 'mongoose'

export enum WorkType {
  PartTime = 'PartTime',
  FullTime = 'FullTime',
  Internship = 'Internship',
  Contract = 'Contract',
  SelfEmployed = 'SelfEmployed',
  Freelance = 'Freelance',
  Apprenticeship = 'Apprenticeship',
  Seasonal = 'Seasonal',
}

export type Work = {
  company: string
  title: string
  description: string
  workType: WorkType
  start: Date
  end?: Date
  country: string
}

export type Education = {
  institution: string
  level: string
  start: Date
  description: string
  end?: Date
}

export type PortfolioDocument = {
  _id?: string
  userId?: string
  works: Work[]
  educations: Education[]
  skills: string[]
}

export const works: SchemaDefinitionProperty = {
  type: [
    {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
      },
      company: {
        type: String,
        required: true,
      },
      workType: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  ],
}

export const educations = {
  type: [
    {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
      },
      institution: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        required: true,
      },
    },
  ],
}

export const skills = {
  type: [String],
}
