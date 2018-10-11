import { makeExecutableSchema } from 'graphql-tools'

import {
  Inventory,
  InventoryItem,
  Timer,
  TimerAlert,
  User,
  Setting
} from './typedefs'

import resolvers from './resolvers'

const RootQuery = `
  type RootQuery {
    user(id: String!): User
    currentUser: User
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
    createTimer(userId: String!, name: String!, duration: Int!, intervalDuration: Int!): Timer
    startTimer(id: String!): Timer
    stopTimer(id: String!): Timer
    decrementTimer(id: String!): Timer
    resetTimer(id: String!): Timer
    updateTimer(id: String!, name: String, duration: Int, intervalDuration: Int): Timer
    deleteTimer(id: String!): Timer
    createTimerAlert(timerId: String!, activationTime: Int!, message: String!): TimerAlert
    updateTimerAlert(id: String!, timerId: String, activationTime: Int, message: String): TimerAlert
    activateTimerAlert(id: String!): TimerAlert
    deleteTimerAlert(id: String!): TimerAlert
    createSetting(userId: String!, name: String!, value: String!): Setting
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
    User,
    Setting
  ],
  resolvers
})