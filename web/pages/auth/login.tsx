import { Card, Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { NextPage } from 'next/types'
import React from 'react'
import { Login } from '../../src/modules/auth/Login'

const LoginPage: NextPage = () => {
  return <Login />
}

export default LoginPage
