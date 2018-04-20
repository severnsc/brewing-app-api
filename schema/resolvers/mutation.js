import {
  createUser,
  getUser,
  updateUser,
  authenticateUser,
  deleteUser,
  hashPassword,
  createInventory,
  updateInventory,
  deleteInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  createTimer,
  startTimer,
  stopTimer,
  decrementTimer,
  resetTimer,
  deleteTimer
} from '../../compose'

export default {
  createUser: (_, { userName, password }) => {
    const user = createUser(userName, password)
    return user
  },

  updateUser: (_, { id, userName, password}) => {
    let updatePropsObj = {}
    
    if(userName){
      updatePropsObj.userName = userName
    }

    if(password){
      const hashedPassword = hashPassword(password)
      updatePropsObj.hashedPassword = hashedPassword
    }

    const updatedUser = updateUser(id, updatePropsObj)
    return updatedUser
  },

  authenticateUser: (_, { userName, password }) => {
    const authenticatedUser = authenticateUser(userName, password)
    return authenticatedUser
  },

  deleteUser: (_, { id }) => {
    const deletedUser = deleteUser(id)
    return deletedUser
  },

  createInventory: (_, { name, userId }) => {
    const inventory = createInventory(name, userId)
    return inventory
  },

  updateInventory: (_, { id, name }) => {
    const updatedInventory = updateInventory(id, {name})
    return updatedInventory
  },

  deleteInventory: (_, { id }) => {
    const deletedInventory = deleteInventory(id)
    return deletedInventory
  },

  createInventoryItem: (_, { inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate, createdAt, updatedAt }) => {
    const inventoryItem = createInventoryItem(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate, createdAt, updatedAt)
    return inventoryItem
  },

  updateInventoryItem: (_, { id, inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate }) => {
    let updatePropsObj = {}

    const args = [{inventoryId}, {object}, {quantityUnit}, {currentQuantity}, {reorderQuantity}, {reorderThreshold}, {costUnit}, {unitCost}, {reorderCost}, {lastReorderDate}, {deliveryDate}]

    const argKeys = args.map(arg => Object.keys(arg)[0])

    args.forEach((arg, index) => {
      if(arg[argKeys[index]]){
        updatePropsObj = Object.assign({}, updatePropsObj, arg)
      }else if(arg[argKeys[index]] === 0){
        updatePropsObj = Object.assign({}, updatePropsObj, arg)
      }else if(['lastReorderDate', 'deliveryDate'].some(str => str === argKeys[index])){
        if(arg[argKeys[index]] === null){
          updatePropsObj = Object.assign({}, updatePropsObj, arg)
        }
      }
    })

    const updatedInventoryItem = updateInventoryItem(id, updatePropsObj)
    return updatedInventoryItem
  },

  deleteInventoryItem: (_, { id }) => {
    const deletedInventoryItem = deleteInventoryItem(id)
    return deletedInventoryItem
  },

  createTimer: (_, { userId, duration, intervalDuration }) => {
    const timer = createTimer(userId, duration, intervalDuration)
    return timer
  },

  startTimer: (_, { id }) => {
    const timer = startTimer(id)
    return timer
  },

  stopTimer: (_, { id }) => {
    const timer = stopTimer(id)
    return timer
  },

  decrementTimer: (_, { id }) => {
    const timer = decrementTimer(id)
    return timer
  },

  resetTimer: (_, { id }) => {
    const timer = resetTimer(id)
    return timer
  },

  deleteTimer: (_, { id }) => {
    const timer = deleteTimer(id)
    return timer
  }
}