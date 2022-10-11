import { ErrorRequestHandler, RequestHandler } from 'express'
import { Logger } from '../utils/logger'

const requestLogger: RequestHandler = (req, _, next) => {
  Logger.info(`Incoming request to ${req.url} with`, req.body, req.params)
  next()
}

const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  Logger.error(`Request ended with error ${err.message}`, err)
  const statusCode = err.status || 500
  return res.status(statusCode).send()
}

export { requestLogger, errorHandler }
