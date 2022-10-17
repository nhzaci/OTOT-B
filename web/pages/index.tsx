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
  Table,
  notification,
} from 'antd'
import moment from 'moment'
import axios from 'axios'

const Placeholder = () => {
  const [response, setResponse] = useState(
    'Click on a request to make a request'
  )
  const [error, setError] = useState('Error messages appear here')

  enum NotificationType {
    Info = 'info',
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
  }

  const makeRequest = async (
    requestType: string,
    promise: () => Promise<any>
  ) => {
    try {
      const res = await promise()
      console.log(`${requestType} success`, { res })
    } catch (e) {
      console.error(`${requestType} Error`, { e })
    }
  }

  const backendUrl =
    process.env.BACKEND_URL || `http://localhost:5000/placeholder`

  const serverlessUrl =
    'https://rnibelxibpw3taq5ovabffkhke0zulwd.lambda-url.us-east-1.on.aws/'

  type TodoBody = {
    title: string
    description: string
  }
  type Todo = { id: string } & TodoBody

  const [todoInput, setTodoInput] = useState<TodoBody | {}>({})
  const [amendTodoInput, setAmendTodoInput] = useState<TodoBody | {}>({})
  const [amendTodoInputId, setAmendTodoInputId] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [todosSize, setTodosSize] = useState(0)
  const getRequest = async () => {
    try {
      const result = await axios.get(backendUrl)
      setTodos(result?.data?.data)
      setTodosSize(result?.data?.data?.length)
      openNotification(
        'GET request',
        `Code: ${result.status}, ${
          result?.data?.success
            ? 'Success'
            : `Failure; Message: ${result?.data?.message}`
        }`,
        result?.data?.success
          ? NotificationType.Success
          : NotificationType.Error
      )
    } catch (e) {
      openNotification(
        'GET request',
        `Unsuccessful; ${e}; Error Message: ${e?.response?.data?.message}`,
        NotificationType.Error
      )
    }
  }
  const postRequest = async () => {
    if (!todoInput || !todoInput?.title || !todoInput?.description) {
      openNotification(
        'POST Request',
        'Incomplete body, please fill up both title and description'
      )
      return
    }
    try {
      const result = await axios.post(backendUrl, todoInput)
      openNotification(
        'POST request',
        `Code: ${result.status}, ${
          result?.data?.success
            ? 'Success'
            : `Failure; Message: ${result?.data?.message}`
        }`,
        result?.data?.success
          ? NotificationType.Success
          : NotificationType.Error
      )
    } catch (e) {
      console.log({ e })
      openNotification(
        'POST request',
        `Unsuccessful; ${e}; Error Message: ${e?.response?.data?.message}`,
        NotificationType.Error
      )
    }
  }
  const putRequest = async () => {
    if (!amendTodoInputId) {
      openNotification(
        'PUT Request',
        'Please fill in ID for todo',
        NotificationType.Warning
      )
      return
    }
    if (
      !amendTodoInput ||
      !amendTodoInput?.title ||
      !amendTodoInput?.description
    ) {
      openNotification(
        'PUT Request',
        'Incomplete body, please fill up both title and description',
        NotificationType.Warning
      )
      return
    }
    try {
      const result = await axios.put(
        `${backendUrl}/${amendTodoInputId}`,
        amendTodoInput
      )
      openNotification(
        'PUT request',
        `Code: ${result.status}, ${
          result?.data?.success
            ? 'Success'
            : `Failure; Message: ${result?.data?.message}`
        }`,
        result?.data?.success
          ? NotificationType.Success
          : NotificationType.Error
      )
    } catch (e) {
      openNotification(
        'PUT request',
        `Unsuccessful; ${e}; Error Message: ${e?.response?.data?.message}`,
        NotificationType.Error
      )
    }
  }

  const [deleteTodoId, setDeleteTodoId] = useState('')
  const deleteRequest = async () => {
    if (!deleteTodoId) {
      openNotification('DELETE Request', 'Please fill in an id to delete')
      return
    }
    try {
      const result = await axios.delete(`${backendUrl}/${deleteTodoId}`)
      openNotification(
        'DELETE request',
        `Code: ${result.status}, ${
          result?.data?.success
            ? 'Success'
            : `Failure; Message: ${result?.data?.message}`
        }`,
        result?.data?.success
          ? NotificationType.Success
          : NotificationType.Error
      )
    } catch (e) {
      openNotification(
        'DELETE request',
        `Unsuccessful; ${e}; Error Message: ${e?.response?.data?.message}`,
        NotificationType.Error
      )
    }
  }

  const TodoTable = () => {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
    ]
    return (
      <>
        <Table dataSource={todos} columns={columns} />
      </>
    )
  }

  const TodoInput = (state: any, changeStateFn: any) => (
    <>
      <Input
        placeholder="Todo Title"
        onChange={(e) => changeStateFn({ ...state, title: e.target.value })}
      />
      <Input
        placeholder="Todo Description"
        onChange={(e) =>
          changeStateFn({ ...state, description: e.target.value })
        }
      />
    </>
  )

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
  const makeServerlessRequestAndDisplay = async () => {
    try {
      const result = await makeServerlessRequest()
      openNotification(
        'Serverless request',
        `${result.statusText}, Code: ${result.status}`
      )
      console.log({ result })
      setResponse(`Response: ${JSON.stringify(result)}`)
    } catch (e) {
      openNotification('Serverless request', `Failed, Code: ${e?.status}`)
      setError(`${JSON.stringify(e)}`)
      console.error({ serverlessError: e })
    }
  }

  const openNotification = (
    title: string,
    description: string,
    type: string = 'info'
  ) => {
    notification[type]({
      message: title,
      description,
      onClick: () => {},
    })
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
          <h1>Simple Http Backend</h1>
          <p>Url: {backendUrl}</p>
          <h2>GET request:</h2>
          <Button onClick={() => makeRequest('GET', getRequest)}>
            Get all Todos
          </Button>
          <p>Number of records: {todosSize}</p>
          {TodoTable()}
          <Divider type="horizontal" />

          <h2>POST request:</h2>
          {TodoInput(todoInput, setTodoInput)}
          <Button onClick={() => makeRequest('POST', postRequest)}>
            Create a new TODO POST Request
          </Button>
          <Divider type="horizontal" />

          <h2>PUT request:</h2>
          <Input
            placeholder="Todo ID"
            onChange={(e) => setAmendTodoInputId(e.target.value)}
          />
          {TodoInput(amendTodoInput, setAmendTodoInput)}
          <Button onClick={() => makeRequest('PUT', putRequest)}>
            Amend Todo
          </Button>
          <Divider type="horizontal" />

          <h2>DELETE request:</h2>
          <Input
            placeholder="Todo ID to delete"
            onChange={(e) => {
              setDeleteTodoId(e.target.value)
            }}
          />
          <Button onClick={() => makeRequest('DELETE', deleteRequest)}>
            DELETE Request
          </Button>

          <Divider type="horizontal" />
          <Divider type="horizontal" />

          <h1>Serverless Function</h1>
          <p>Url: {serverlessUrl}</p>
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
          <Button onClick={() => makeServerlessRequestAndDisplay()}>
            Call Serverless Function
          </Button>

          <h1>Response:</h1>
          <p>{response}</p>

          <Divider type="horizontal" />

          <h1>Error:</h1>
          <p>{error}</p>
        </Col>
      </Row>
    </>
  )
}

export default Placeholder
