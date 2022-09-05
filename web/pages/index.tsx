import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useAuth } from '../src/modules/auth/auth.context'

const Home: NextPage = () => {
  const router = useRouter()
  const { isAuthenticated, logout } = useAuth()

  const logoutHandler = () => {
    logout()
    router.replace('./auth/login')
  }

  return (
    <>
      <button onClick={logoutHandler}>Log out</button>
    </>
  )
}

export default Home
