import {
  getUser,
  getTimersByUserId,
  getInventoriesByUserId,
  getTimer,
  getInventory
} from '../compose'

export default {
  RootQuery: {
    user: (_, { id }) => getUser(id)
  },

  User: {
    id: user => user.id,
    userName: user => user.userName,
    timers: user => getTimersByUserId(user.id),
    inventories: user => getInventoriesByUserId(user.id)
  },

  Timer: {
    id: timer => timer.id,
    user: timer => getUser(timer.userId),
    duration: timer => timer.duration,
    remainingDuration: timer => timer.remainingDuration,
    intervalDuration: timer => timer.intervalDuration,
    isRunning: timer => timer.isRunning
  },

  Inventory: {
    id: inventory => inventory.id,
    user: inventory => getUser(inventory.userId),
    name: inventory => inventory.name,
    items: inventory => inventory.items
  },

  TimerAlert: {
    id: timerAlert => timerAlert.id,
    timer: timerAlert => getTimer(timerAlert.timerId),
    activationTime: timerAlert => timerAlert.activationTime,
    message: timerAlert => timerAlert.message,
    activated: timerAlert => timerAlert.activated
  },

  InventoryItem: {
    id: inventoryItem => inventoryItem.id,
    inventory: inventoryItem => getInventory(inventoryItem.inventoryId),
    object: inventoryItem => JSON.stringify(inventoryItem.object),
    quantityUnit: inventoryItem => inventoryItem.quantityUnit,
    currentQuantity: inventoryItem => inventoryItem.currentQuantity,
    reorderQuantity: inventoryItem => inventoryItem.reorderQuantity,
    reorderThreshold: inventoryItem => inventoryItem.reorderThreshold,
    costUnit: inventoryItem => inventoryItem.costUnit,
    unitCost: inventoryItem => inventoryItem.unitCost,
    reorderCost: inventoryItem => inventoryItem.reorderCost,
    lastReorderDate: inventoryItem => inventoryItem.lastReorderDate,
    deliveryDate: inventoryItem => inventoryItem.deliveryDate,
    createdAt: inventoryItem => inventoryItem.createdAt.toString(),
    updatedAt: inventoryItem => inventoryItem.updatedAt.toString()
  }
}