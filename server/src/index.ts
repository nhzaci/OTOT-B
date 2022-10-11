import { app } from './app'
import { connectRedis } from './middleware/redis'
import { connectDb } from './mongo'

const port = process.env.PORT || 5000

const start = async () => {
  await connectDb()
  await connectRedis()
  app.listen(port, () => {
    console.log(`App is live at port ${port}`)
  })
}

start()
