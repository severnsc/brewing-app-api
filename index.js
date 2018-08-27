import { dbConnection } from './adapters/databaseAdapter'
import app from './app'
import { findStartedTimers } from "./adapters/timerAdapter"
import { decrementTimer } from "./compose"

const decrementTimers = async () => {
	const startedTimers = await findStartedTimers().catch(e => e)
	console.log(startedTimers)
	startedTimers.forEach(timer => decrementTimer(timer.id, Date.now()))
}

app.listen(process.env.BREWING_APP_PORT, () => {
  dbConnection(() => {
  	setInterval(() => decrementTimers(), 1000)
    console.log(`Go to http://localhost:${process.env.BREWING_APP_PORT}/graphiql to run queries!`)
  })
})