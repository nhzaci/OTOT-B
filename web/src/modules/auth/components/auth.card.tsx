import { Card } from 'antd'
import React from 'react'
import styled from 'styled-components'

type AuthCardProps = {
  children: React.ReactNode
}

const AuthCard: React.FunctionComponent<AuthCardProps> = ({ children }) => {
  return <AntCardStyles>{children}</AntCardStyles>
}

export default AuthCard

const AntCardStyles = styled(Card)`
  width: 400px;
  height: 400px;
  padding: 2em 3em;
`
