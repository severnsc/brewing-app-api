import { dbConnection } from './adapters/databaseAdapter'
import { SubscriptionServer } from "subscriptions-transport-ws"
import { execute, subscribe } from "graphql"
import { createServer } from "http"
import schema from "./schema"
import app from './app'

const WS_PORT = 5000

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});
 
// Bind it to port and start listening
websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));
 
const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server: websocketServer,
    path: '/graphql',
  },
);

app.listen(process.env.BREWING_APP_PORT, () => {
  dbConnection(() => {
    console.log(`Go to http://localhost:${process.env.BREWING_APP_PORT}/graphiql to run queries!`)
  })
})