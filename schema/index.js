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

const Mutation = `
  type Mutation {
    createUser(userName: String!, password: String!): User
    updateUser(id: String!, userName: String, password: String): User
    authenticateUser(id: String!, password: String!): User
    deleteUser(id: String!): User
  }
`

const SchemaDefinition = `
  schema {
    query: RootQuery,
    mutation: Mutation
  }
`

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    Mutation,
    Inventory,
    InventoryItem,
    Timer,
    TimerAlert,
    User
  ],
  resolvers
})