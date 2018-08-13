import { dbConnection } from './adapters/databaseAdapter'
import app from './app'

app.listen(process.env.BREWING_APP_PORT, () => {
  dbConnection(() => {
    console.log(`Go to http://localhost:${process.env.BREWING_APP_PORT}/graphiql to run queries!`)
  })
})