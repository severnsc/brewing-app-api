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
    authenticateUser(userName: String!, password: String!): User
    deleteUser(id: String!): User
    createInventory(name: String!, userId: String!): Inventory
    updateInventory(id: String!, name: String!): Inventory
    deleteInventory(id: String!): Inventory
    createInventoryItem(inventoryId: String!, object: String!, quantityUnit: String!, currentQuantity: Float!, reorderQuantity: Float!, reorderThreshold: Float!, costUnit: String!, unitCost: Float!, reorderCost: Float!, lastReorderDate: String, deliveryDate: String, createdAt: String!, updatedAt: String!): InventoryItem
    updateInventoryItem(id: String!, inventoryId: String, object: String, quantityUnit: String, currentQuantity: Float, reorderQuantity: Float, reorderThreshold: Float, costUnit: String, unitCost: Float, reorderCost: Float, lastReorderDate: String, deliveryDate: String): InventoryItem
    deleteInventoryItem(id: String!): Inventory
    createTimer(userId: String!, duration: Int!, intervalDuration: Int!): Timer
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