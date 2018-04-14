const entities = require('../entities')
const utils = require('../../utils')

const createInventory = _createInventory => {

  if(typeof createInventory !== 'function'){
    throw new TypeError(utils.constructErrorMessage('createInventory', 'function', createInventory))
  }

  return (name, userId) => {

    if(typeof name !== 'string'){
      throw new TypeError(utils.constructErrorMessage('name', 'string', name))
    }

    if(typeof userId !== 'string'){
      throw new TypeError(utils.constructErrorMessage('userId', "string", userId))
    }

    const inventory = entities.inventoryEntity(name, userId)
    try{
      _createInventory(inventory)
      return inventory
    } catch(e) {
      throw new Error("createInventory failed!")
    }
  }
}

const getInventory = findInventoryById => {

  if(typeof findInventoryById !== 'function'){
    throw new TypeError(utils.constructErrorMessage('findInventoryById', 'function', findInventoryById))
  }

  return inventoryId => {

    if(typeof inventoryId !== 'string'){
      throw new TypeError(utils.constructErrorMessage('inventoryId', 'string', inventoryId))
    }

    try{
      const inventory = findInventoryById(inventoryId)
      return inventory
    } catch(e) {
      throw new Error('findInventoryById failed!')
    }
  }
}

const getInventoriesByUserId = userExists => {

  if(typeof userExists !== 'function'){
    throw new TypeError(utils.constructErrorMessage('userExists', 'function', userExists))
  }

  return findInventoriesByUserId => {

    if(typeof findInventoriesByUserId !== 'function'){
      throw new TypeError(utils.constructErrorMessage('findInventoriesByUserId', 'function', findInventoriesByUserId))
    }

    return userId => {

      if(typeof userId !== 'string'){
        throw new TypeError(utils.constructErrorMessage('userId', 'string', userId))
      }

      if(userExists(userId)){
        const inventories = findInventoriesByUserId(userId)

        if(!Array.isArray(inventories)){
          throw new TypeError(utils.constructErrorMessage('inventories', 'array', inventories))
        }

        return inventories
      }else{
        return []
      }
    }
  }
}

const updateInventory = findInventoryById => {

  if(typeof findInventoryById !== 'function'){
    throw new TypeError
  }

  return saveInventory => {

    if(typeof saveInventory !== 'function'){
      throw new TypeError
    }

    return (inventoryId, updatePropsObj) => {

      if(typeof inventoryId !== 'string'){
        throw new TypeError
      }

      if(typeof updatePropsObj !== 'object'){
        throw new TypeError
      }

      if(Array.isArray(updatePropsObj)){
        throw new TypeError
      }

      if(updatePropsObj.id){
        throw new Error
      }

      const inventory = findInventoryById(inventoryId)
      const inventoryKeys = Object.keys(inventory)
      const updatePropsObjKeys = Object.keys(updatePropsObj)

      if(updatePropsObjKeys.some(key => !inventoryKeys.includes(key))){
        throw new Error
      }

      updatePropsObjKeys.forEach(key => {
        if(typeof updatePropsObj[key] !== typeof inventory[key]){
          throw new TypeError
        }
      })

      if(updatePropsObj.items){
        
        if(!Array.isArray(updatePropsObj.items)){
          throw new TypeError
        }

        if(updatePropsObj.items.some(item => typeof item !== 'object')){
          throw new TypeError
        }

        if(updatePropsObj.items.some(item => Array.isArray(item))){
          throw new TypeError
        }

      }

      const updatedInventory = Object.assign({}, inventory, updatePropsObj)
      try{
        saveInventory(updatedInventory)
      } catch(e){
        throw new Error('saveInventory failed!')
      }
      return updatedInventory
    }
  }
}

const deleteInventory = deleteInventoryFunc => {

  if(typeof deleteInventoryFunc !== 'function'){
    throw new TypeError
  }

  return inventoryId => {

    if(typeof inventoryId !== 'string'){
      throw new TypeError
    }

    try{
      deleteInventoryFunc(inventoryId)
      return null
    } catch(e) {
      throw new Error("deleteInventoryFunc failed!")
    }
  }
}

module.exports = {
  createInventory,
  getInventory,
  getInventoriesByUserId,
  updateInventory,
  deleteInventory
}