import { makeExecutableSchema } from 'graphql-tools'
import Inventory from './inventory'
import InventoryItem from './inventoryItem'
import Timer from './timer'
import TimerAlert from './timerAlert'
import User from './user'

const RootQuery = `
  type RootQuery {
    user(id: String!): User
    users: [User]
    inventory(id: String!): Inventory
    inventories: [Inventory]
    timer(id: String!): Timer
    timers: [Timer]
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
  resolvers: {}
})