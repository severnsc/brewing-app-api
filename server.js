import "@babel/polyfill";
import { dbConnection } from './adapters/databaseAdapter'
import app from './app'
import { decrementTimers } from "./compose"

app.listen(process.env.BREWING_APP_PORT || process.env.PORT, () => {
  dbConnection(() => {
  	setInterval(() => decrementTimers(), 1000)
    console.log(`Go to http://localhost:${process.env.BREWING_APP_PORT || process.env.PORT}/graphiql to run queries!`)
  })
})