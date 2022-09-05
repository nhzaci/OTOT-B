import '../styles/globals.css'
import type { AppProps } from 'next/app'

import 'antd/dist/antd.css'
import { AuthContextProvider } from '../src/modules/auth/auth.context'
import { useEffect, useState } from 'react'
import Layout from 'antd/lib/layout/layout'
import { useCookies } from 'react-cookie'
import { UserService } from '../src/services/user/user.service'
import { UserRole } from '../src/services/user/user.model'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserRole | undefined>(undefined)

  useEffect(() => {
    // Retrieve user using cookies here
    // Send to backend with access token to get user identity
    const fetchAndSetUserFromCookies = async () => {
      if (!user) {
        const user = await UserService.getUser().match(
          (user) => user.data,
          () => undefined // do nothing on error
        )

        console.log('completed request', { user })

        setUser(user)
      }
    }

    fetchAndSetUserFromCookies().catch((err) => console.error(err))
  })

  if (pageProps.protected && !user) {
    return <Layout>Loading...</Layout>
  }

  if (pageProps.protected && user && pageProps.roles) {
    return (
      <Layout>
        Sorry, you don't have access, please contact your admin for more
        information.
      </Layout>
    )
  }

  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
