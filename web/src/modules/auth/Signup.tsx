import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Input, message, Typography } from 'antd'

import AuthService from '../../services/auth/auth.service'
import AuthCard from './components/auth.card'
import AuthContainer from './components/auth.container'
import { LoginInputData } from './auth.model'
import { useAuth } from './auth.context'
import { routes } from '../../routes'
const { Title } = Typography

export const Signup = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signupHandler = async (data: LoginInputData) => {
    setIsLoading(true)

    const { email, password } = data
    const res = await AuthService.signup(email, password).match(
      ({ authToken, refreshToken }) => {
        login(authToken, refreshToken)
        return true
      },
      (responseFail) => {
        message.error(responseFail.message, 7)
        return false
      }
    )

    if (res) {
      router.push(routes.home)
    }

    setIsLoading(false)
  }

  const navigateLoginHandler = () => {
    router.push(routes.login)
  }

  const [form] = Form.useForm()
  return (
    <AuthContainer>
      <AuthCard>
        <Title level={2}>Signup</Title>
        <Form
          form={form}
          name="signupForm"
          onFinish={signupHandler}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Sign up
            </Button>
          </Form.Item>
        </Form>
        <Button type="text" htmlType="button" onClick={navigateLoginHandler}>
          Login
        </Button>
      </AuthCard>
    </AuthContainer>
  )
}
