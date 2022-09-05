import { Button, Form, Input, InputRef, message, Typography } from 'antd'
import React, { useRef, useState } from 'react'
import AuthCard from './components/auth.card'
import AuthContainer from './components/auth.container'
import { useRouter } from 'next/router'

import { LoginInputData } from './auth.model'
import AuthService from '../../services/auth/auth.service'
import { useAuth } from './auth.context'
import { routes } from '../../routes'
const { Title } = Typography

export const Login = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { login } = useAuth()

  const loginHandler = async (data: LoginInputData) => {
    setIsLoading(true)
    const { email, password } = data

    const res = await AuthService.login(email, password).match(
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

  const navigateSignupHandler = () => {
    router.push(routes.signup)
  }

  return (
    <AuthContainer>
      <AuthCard>
        <Title level={2}>Login</Title>
        <Form
          form={form}
          name="loginForm"
          onFinish={loginHandler}
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
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="text"
          htmlType="button"
          onClick={navigateSignupHandler}
          loading={isLoading}
        >
          Sign Up
        </Button>
      </AuthCard>
    </AuthContainer>
  )
}
