import { makeExecutableSchema } from 'graphql-tools'

import {
  Inventory,
  InventoryItem,
  Timer,
  TimerAlert,
  User
} from './typedefs'

import resolvers from './resolvers'

const RootQuery = `
  type RootQuery {
    user(id: String!): User
  }
`

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    Inventory,
    InventoryItem,
    Timer,
    TimerAlert,
    User
  ],
  resolvers
})