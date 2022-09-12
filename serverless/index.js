const axios = require('axios')

const makeJsonResponse = (body, code) => ({
  statusCode: code,
  headers: {
    'Content-Type': 'application/json',
  },
  body,
})

const makeErrorResponse = (message) => ({
  statusCode: 400,
  headers: {
    'Content-Type': 'application/json',
  },
  body: message,
})

const NEA_TEMPERATURE_API_URL =
  'https://api.data.gov.sg/v1/environment/air-temperature'
const getTemperature = async (event) => {
  try {
    const params = {}
    if (event.date !== undefined) params.date = event.date
    if (event.date_time !== undefined) params.date_time = event.date_time

    const result = await axios.get(NEA_TEMPERATURE_API_URL, { params })

    return makeJsonResponse({ data: result.data })
  } catch (err) {
    return makeErrorResponse({ message: err?.response?.message })
  }
}

/**
 * Returns an HTML page containing an interactive Web-based
 * tutorial. Visit the function URL to see it and learn how
 * to build with lambda.
 * tab space
 */
exports.handler = async (request) => {
  const event = request.queryStringParameters

  try {
    switch (event.type) {
      case 'temperature':
        return getTemperature(event)
      default:
        return makeErrorResponse({
          message: `Event ${event.type} is not recognized.`,
          params: event,
        })
    }
  } catch (err) {
    return makeErrorResponse({
      message: `Event resulted in error: ${err}`,
      params: event,
    })
  }
}
