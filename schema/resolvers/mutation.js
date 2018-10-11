import {
  createUser,
  getUser,
  updateUser,
  authenticateUser,
  deleteUser,
  hashPassword,
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getTimer,
  createTimer,
  startTimer,
  stopTimer,
  decrementTimer,
  resetTimer,
  updateTimer,
  deleteTimer,
  getTimerAlert,
  getTimerAlertsByTimerId,
  createTimerAlert,
  updateTimerAlert,
  activateTimerAlert,
  deactivateTimerAlert,
  deleteTimerAlert,
  createSetting,
  updateSetting,
  deleteSetting
} from '../../compose'

import validator from 'validator'

export default {
  createUser: (_, { userName, password, email }) => {
    if(!validator.isEmail(email)){
      throw new Error("Invalid email!")
    }

    const user = createUser(userName, password, email)
    return user
  },

  updateUser: (_, { id, userName, password, email}, ctx) => {
    if(ctx && ctx.user.id === id){
      let updatePropsObj = {}
    
      if(userName){
        updatePropsObj.userName = userName
      }

      if(password){
        const hashedPassword = hashPassword(password)
        updatePropsObj.hashedPassword = hashedPassword
      }

      if(email){
        if(!validator.isEmail(email)){
          throw new Error
        }
        updatePropsObj.email = email
      }

      const updatedUser = updateUser(id, updatePropsObj)
      return updatedUser
    }else{
      return null
    }
  },

  authenticateUser: (_, { userName, password }) => {
    const authenticatedUser = authenticateUser(userName, password)
    return authenticatedUser
  },

  deleteUser: (_, { id }, ctx) => {
    if(ctx && ctx.user.id === id){
      const deletedUser = deleteUser(id)
      return deletedUser
    }else{
      return null
    }
  },

  createInventory: (_, { name, userId }, ctx) => {
    if(ctx && ctx.user.id === userId){
      const inventory = createInventory(name, userId)
      return inventory
    }else{
      return null
    }
  },

  updateInventory: (_, { id, name }, ctx) => {
    return getInventory(id).then(inventory => {
      if(ctx && ctx.user.id === inventory.userId){
        const updatedInventory = updateInventory(id, {name})
        return updatedInventory
      }else{
        return null
      }
    }).catch(e => e)
  },

  deleteInventory: (_, { id }, ctx) => {
    return getInventory(id).then(inventory => {
      if(ctx && ctx.user.id === inventory.userId){
        const deletedInventory = deleteInventory(id)
        return deletedInventory
      }else{
        return null
      }
    }).catch(e => e)
  },

  createInventoryItem: (_, { inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate, createdAt, updatedAt }, ctx) => {
    return getInventory(inventoryId).then(inventory => {
      if(ctx && ctx.user.id === inventory.userId){
        const transformedObject = JSON.parse(object)
        const transformedLastReorderDate = new Date(lastReorderDate)
        const transformedDeliveryDate = new Date(deliveryDate)
        const transformedCreatedAt = new Date(createdAt)
        const transformedUpdateAt = new Date(updatedAt)
        const inventoryItem = createInventoryItem(inventoryId, transformedObject, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, transformedLastReorderDate, transformedDeliveryDate || null, transformedCreatedAt, transformedUpdateAt)
        return inventoryItem
      }else{
        return null
      }
    }).catch(e => e)
  },

  updateInventoryItem: (_, { id, inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate }, ctx) => {
    return getInventory(inventoryId).then(inventory => {
      if(ctx && ctx.user.id === inventory.userId){
        let updatePropsObj = {}

        const args = [{object: JSON.parse(object)}, {quantityUnit}, {currentQuantity}, {reorderQuantity}, {reorderThreshold}, {costUnit}, {unitCost}, {reorderCost}, {lastReorderDate: new Date(lastReorderDate)}, {deliveryDate: new Date(deliveryDate)}]

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
      }else{
        return null
      }
    }).catch(e => e)
  },

  deleteInventoryItem: (_, { id }, ctx) => {
    return getInventoryItem(id).then(inventoryItem => {
      return getInventory(inventoryItem.inventoryId).then(inventory => {
        if(ctx && ctx.user.id === inventory.userId){
          const deletedInventoryItem = deleteInventoryItem(id)
          return deletedInventoryItem
        }else{
          return null
        }
      }).catch(e => e)
    }).catch(e => e)
  },

  createTimer: (_, { userId, name, duration, intervalDuration }, ctx) => {
    if(ctx && ctx.user.id === userId){
      const timer = createTimer(userId, name, duration, intervalDuration)
      return timer
    }else{
      return null
    }
  },

  startTimer: (_, { id }, ctx) => {
    return getTimer(id).then(timer => {
      if(ctx && ctx.user.id === timer.userId){
        const startedTimer = startTimer(id)
        return startedTimer
      }else{
        return null
      }
    }).catch(e => e)
  },

  stopTimer: (_, { id }, ctx) => {
    return getTimer(id).then(timer => {
      if(ctx && ctx.user.id === timer.userId){
        const stoppedTimer = stopTimer(id)
        return stoppedTimer
      }else{
        return null
      }
    }).catch(e => e)
  },

  decrementTimer: (_, { id }, ctx) => {
    return getTimer(id).then(timer => {
      if(ctx && ctx.user.id === timer.userId){
        const decrementedTimer = decrementTimer(id)
        return decrementedTimer
      }else{
        return null
      }
    }).catch(e => e)
  },

  resetTimer: (_, { id }, ctx) => {
    return getTimer(id).then(async timer => {
      if(ctx && ctx.user.id === timer.userId){
        const resetedTimer = resetTimer(id)
        const alerts = await getTimerAlertsByTimerId(id)
        alerts.forEach(alert => deactivateTimerAlert(alert.id))
        return resetedTimer
      }else{
        return null
      }
    }).catch(e => e)
  },

  updateTimer: (_, { id, name, duration, intervalDuration }, ctx) => {
    return getTimer(id).then(timer => {
      if(ctx && ctx.user.id === timer.userId){
        let updatePropsObj = {}

        if(name){
          updatePropsObj.name = name
        }

        if(duration){
          updatePropsObj.duration = duration
        }

        if(intervalDuration){
          updatePropsObj.intervalDuration = intervalDuration
        }

        const updatedTimer = updateTimer(id, updatePropsObj)
        return updatedTimer
      }else{
        return null
      }
    }).catch(e => e)
  },

  deleteTimer: (_, { id }, ctx) => {
    return getTimer(id).then(timer => {
      if(ctx && ctx.user.id === timer.userId){
        const timer = deleteTimer(id)
        return timer
      }else{
        return null
      }
    }).catch(e => e)
  },

  createTimerAlert: (_, { timerId, activationTime, message }, ctx) => {
    return getTimer(timerId).then(timer => {
      if(ctx && ctx.user.id === timer.userId){
        const timerAlert = createTimerAlert(timerId, activationTime, message)
        return timerAlert
      }else{
        return null
      }
    }).catch(e => e)
  },

  updateTimerAlert: (_, { id, timerId, activationTime, message }, ctx) => {
    return getTimerAlert(id).then(timerAlert => {
      return getTimer(timerAlert.timerId).then(timer => {
        if(ctx && ctx.user.id === timer.userId){
          let updatePropsObj = {}

          if(timerId){
            updatePropsObj.timerId = timerId
          }

          if(typeof activationTime === 'number'){
            updatePropsObj.activationTime = activationTime
          }

          if(message){
            updatePropsObj.message = message
          }

          const timerAlert = updateTimerAlert(id, updatePropsObj)

          return timerAlert
        }else{
          return null
        }
      }).catch(e => e)
    }).catch(e => e)
  },

  activateTimerAlert: (_, { id }, ctx) => {
    return getTimerAlert(id).then(timerAlert => {
      return getTimer(timerAlert.timerId).then(timer => {
        if(ctx && ctx.user.id === timer.userId){
          const activatedTimerAlert = activateTimerAlert(id)
          return activatedTimerAlert
        }else{
          return null
        }
      }).catch(e => e)
    }).catch(e => e)
  },

  deleteTimerAlert: (_, { id }, ctx) => {
    return getTimerAlert(id).then(timerAlert => {
      return getTimer(timerAlert.timerId).then(timer => {
        if(ctx && ctx.user.id === timer.userId){
          const deletedTimerAlert = deleteTimerAlert(id)
          return deletedTimerAlert
        }else{
          return null
        }
      }).catch(e => e)
    }).catch(e => e)
  },

  createSetting: (_, { userId, name, value }, ctx) => {
    if(ctx && ctx.user.id === userId){
      const setting = createSetting(userId, name, value).catch(e => e)
      return setting
    }else{
      return null
    }
  },

  updateSetting: (_, { id, value }, ctx) => {
    return getSetting(id).then(setting => {
      if(ctx && ctx.user.id === setting.userId){
        const setting = updateSetting(id, value).catch(e => e)
        return setting
      }else{
        return null
      }
    })
  },

  deleteSetting: (_, { id }, ctx) => {
    return getSetting(id).then(setting => {
      if(ctx && ctx.user.id === setting.userId){
        const deletedSetting = deleteSetting(id).catch(e => e)
        return deletedSetting
      }else{
        return null
      }
    }).catch(e => e)
  }
}