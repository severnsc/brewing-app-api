'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _typedefs = require('./typedefs');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RootQuery = '\n  type RootQuery {\n    user(id: String!): User\n    currentUser: User\n  }\n';

var Mutation = '\n  type Mutation {\n    createUser(userName: String!, password: String!): User\n    updateUser(id: String!, userName: String, password: String): User\n    authenticateUser(userName: String!, password: String!): User\n    deleteUser(id: String!): User\n    createInventory(name: String!, userId: String!): Inventory\n    updateInventory(id: String!, name: String!): Inventory\n    deleteInventory(id: String!): Inventory\n    createInventoryItem(inventoryId: String!, object: String!, quantityUnit: String!, currentQuantity: Float!, reorderQuantity: Float!, reorderThreshold: Float!, costUnit: String!, unitCost: Float!, reorderCost: Float!, lastReorderDate: String, deliveryDate: String, createdAt: String!, updatedAt: String!): InventoryItem\n    updateInventoryItem(id: String!, inventoryId: String, object: String, quantityUnit: String, currentQuantity: Float, reorderQuantity: Float, reorderThreshold: Float, costUnit: String, unitCost: Float, reorderCost: Float, lastReorderDate: String, deliveryDate: String): InventoryItem\n    deleteInventoryItem(id: String!): Inventory\n    createTimer(userId: String!, name: String!, duration: Int!, intervalDuration: Int!): Timer\n    startTimer(id: String!): Timer\n    stopTimer(id: String!): Timer\n    decrementTimer(id: String!): Timer\n    resetTimer(id: String!): Timer\n    updateTimer(id: String!, name: String, duration: Int, intervalDuration: Int): Timer\n    deleteTimer(id: String!): Timer\n    createTimerAlert(timerId: String!, activationTime: Int!, message: String!): TimerAlert\n    updateTimerAlert(id: String!, timerId: String, activationTime: Int, message: String): TimerAlert\n    activateTimerAlert(id: String!): TimerAlert\n    deleteTimerAlert(id: String!): TimerAlert\n  }\n';

var SchemaDefinition = '\n  schema {\n    query: RootQuery,\n    mutation: Mutation\n  }\n';

exports.default = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: [SchemaDefinition, RootQuery, Mutation, _typedefs.Inventory, _typedefs.InventoryItem, _typedefs.Timer, _typedefs.TimerAlert, _typedefs.User],
  resolvers: _resolvers2.default
});
//# sourceMappingURL=index.js.map