import React, { useEffect, useState } from 'react'
import { Button, Divider, Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import axios, { AxiosPromise } from 'axios'

const Placeholder = () => {
  const [response, setResponse] = useState(
    'Click on a request to make a request'
  )
  const [error, setError] = useState('Error messages appear here')

  const makeRequest = async (requestType: string, promise: AxiosPromise) => {
    promise
      .then((res) => {
        setResponse(`Request type: ${requestType}; to: ${url}; result: ${JSON.stringify(res.data)}`)
      })
      .catch((err) => {
        setError(err)
      })
  }

  const url = `http://localhost:5000/placeholder`

  const getRequest = axios.get(url)
  const postRequest = axios.post(url)
  const putRequest = axios.put(url)
  const deleteRequest = axios.delete(url)

  return (
    <>
      <Layout>
        <Content>
          <h1>Make request:</h1>

          <Button onClick={() => makeRequest("GET", getRequest)}>GET Request</Button>
          <Divider type="vertical" />

          <Button onClick={() => makeRequest("POST", postRequest)}>POST Request</Button>
          <Divider type="vertical" />

          <Button onClick={() => makeRequest("PUT", putRequest)}>PUT Request</Button>
          <Divider type="vertical" />

          <Button onClick={() => makeRequest("DELETE", deleteRequest)}>
            DELETE Request
          </Button>

          <h1>Response:</h1>
          <p>{response}</p>

          <h1>Error:</h1>
          <p>{error}</p>
        </Content>
      </Layout>
    </>
  )
}

export default Placeholder
