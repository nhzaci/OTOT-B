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
  const params = {}
  if (event?.date !== undefined) params.date = event.date
  if (event?.date_time !== undefined) params.date_time = event.date_time

  try {
    const result = await axios.get(NEA_TEMPERATURE_API_URL, { params })
    return makeJsonResponse(result)
  } catch (err) {
    return makeErrorResponse(err)
  }
}

/**
 * Returns an HTML page containing an interactive Web-based
 * tutorial. Visit the function URL to see it and learn how
 * to build with lambda.
 * tab space
 */
exports.handler = async (event) => {
  if (event?.type === undefined)
    return makeErrorResponse("No event type was passed in 'type' key of event")

  switch (event.type) {
    case 'temperature':
      return getTemperature(event)
    default:
      return makeErrorResponse(`Event {event.type} is not recognized.`)
  }
}
