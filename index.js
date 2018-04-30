import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './schema'
require('dotenv').config()
import { dbConnection } from './adapters/databaseAdapter'

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(process.env.PORT, () => {
  dbConnection(() => {
    console.log(`Go to http://localhost:${process.env.PORT}/graphiql to run queries!`)
  })
})