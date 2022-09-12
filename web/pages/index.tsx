import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Divider,
  DatePicker,
  Input,
  Row,
  DatePickerProps,
  TimePicker,
  TimePickerProps,
} from 'antd'
import moment from 'moment'
import axios, { AxiosPromise } from 'axios'

const Placeholder = () => {
  const [response, setResponse] = useState(
    'Click on a request to make a request'
  )
  const [error, setError] = useState('Error messages appear here')

  const makeRequest = async (
    requestType: string,
    promise: () => AxiosPromise
  ) => {
    try {
      const res = await promise()
      setResponse(
        `  Request type: ${requestType};

  URI: ${axios.getUri(res.config)};

  Data: ${JSON.stringify(res.data)}`
      )
    } catch (err) {
      console.error(`Error making API req: ${err}`)
      setError(`${err}`)
    }
  }

  const backendUrl =
    process.env.BACKEND_URL || `http://localhost:5000/placeholder`

  const serverlessUrl =
    'https://rnibelxibpw3taq5ovabffkhke0zulwd.lambda-url.us-east-1.on.aws/'

  const getRequest = () => axios.get(backendUrl)
  const postRequest = () => axios.post(backendUrl)
  const putRequest = () => axios.put(backendUrl)
  const deleteRequest = () => axios.delete(backendUrl)

  const [date, setDate] = useState<string>('2022-09-11')
  const [time, setTime] = useState<string>('00:00:00')
  const onChangeDate: DatePickerProps['onChange'] = (_, dateS) => {
    setDate(dateS)
  }
  const onChangeTime: TimePickerProps['onChange'] = (_, timeS) => {
    setTime(timeS)
  }
  const makeDateTime = (dateString: string, timeString: string) =>
    `${dateString}T${timeString}`
  const makeServerlessRequest = () => {
    const params: any = {
      type: 'temperature',
    }
    if (date === undefined || time === undefined)
      return axios.get(serverlessUrl, { params })
    params.date_time = makeDateTime(date, time)
    return axios.get(serverlessUrl, { params })
  }

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: '100vh',
          paddingRight: '20vw',
          paddingLeft: '20vw',
          whiteSpace: 'pre-wrap',
        }}
      >
        <Col>
          <h1>Make request:</h1>

          <Button onClick={() => makeRequest('GET', getRequest)}>
            GET Request
          </Button>
          <Divider type="vertical" />

          <Button onClick={() => makeRequest('POST', postRequest)}>
            POST Request
          </Button>
          <Divider type="vertical" />

          <Button onClick={() => makeRequest('PUT', putRequest)}>
            PUT Request
          </Button>
          <Divider type="vertical" />

          <Button onClick={() => makeRequest('DELETE', deleteRequest)}>
            DELETE Request
          </Button>

          <Divider type="horizontal" />

          <h1>Serverless Function</h1>

          <DatePicker
            onChange={onChangeDate}
            defaultValue={moment(date, 'YYYY-MM-dd')}
            style={{ width: '50%' }}
          />
          <TimePicker
            onChange={onChangeTime}
            defaultValue={moment(time, 'HH:mm:ss')}
            style={{ width: '50%' }}
          />

          <Button
            onClick={() =>
              makeRequest('Serverless Request', makeServerlessRequest)
            }
          >
            Call Serverless Function
          </Button>

          <Divider type="horizontal" />

          <h1>Response:</h1>
          <p>{response}</p>

          <h1>Error:</h1>
          <p>{error}</p>
        </Col>
      </Row>
    </>
  )
}

export default Placeholder
