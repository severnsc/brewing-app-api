require('dotenv').config()
import { dbConnection } from './adapters/databaseAdapter'
import app from './app'

app.listen(process.env.PORT, () => {
  dbConnection(() => {
    console.log(`Go to http://localhost:${process.env.PORT}/graphiql to run queries!`)
  })
})