import React, { Children } from 'react'
import styled from 'styled-components'

type AuthContainerProps = {
  children: React.ReactNode
}

const AuthContainer: React.FunctionComponent<AuthContainerProps> = ({
  children,
}) => {
  return <ContainerStyles>{children}</ContainerStyles>
}

export default AuthContainer

const ContainerStyles = styled.div`
  min-height: 500px;
  height: 100vh;
  /* background: grey; */
  display: flex;
  justify-content: center;
  align-items: center;
`
