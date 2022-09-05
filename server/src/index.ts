import { app } from './app'
import { connectDb } from './mongo'

const port = process.env.PORT || 8000

connectDb().then(() =>
  app.listen(port, () => {
    console.log(`App is live at port ${port}`)
  })
)
