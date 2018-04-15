const entities = require('../entities')

const createInventoryItem = _createInventoryItem => {

  if(typeof _createInventoryItem !== 'function'){
    throw new TypeError
  }

  return addToInventory => {
    return (inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate, createdAt, updatedAt) => {
      const inventoryItem = entities.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate, createdAt, updatedAt)
      
      try{
        addToInventory(inventoryItem)
      } catch(e) {
        throw new Error("addToInventory failed!")
      }

      try{
        _createInventoryItem(inventoryItem)
        return inventoryItem
      } catch(e) {
        throw new Error('createInventoryItem failed!')
      }
    }
  }
}

const getInventoryItem = findInventoryItemById => {

  if(typeof findInventoryItemById !== 'function'){
    throw new TypeError
  }

  return id => {

    if(typeof id !== 'string'){
      throw new TypeError
    }

    const inventoryItem = findInventoryItemById(id)
    return inventoryItem
  }
}

const getInventoryItemsByInventoryId = findInventoryItemsByInventoryId => {

  if(typeof findInventoryItemsByInventoryId !== 'function'){
    throw new TypeError
  }

  return inventoryId => {

    if(typeof inventoryId !== "string"){
      throw new TypeError
    }

    const foundInventoryItems = findInventoryItemsByInventoryId(inventoryId)

    if(!(foundInventoryItems instanceof Array)){
      throw new Error("foundInventoryItems must be an array!")
    }

    return foundInventoryItems
  }
}

const updateInventoryItem = findInventoryItemById => {

  if(typeof findInventoryItemById !== 'function'){
    throw new TypeError
  }

  return saveInventoryItem => {

    if(typeof saveInventoryItem !== 'function'){
      throw new TypeError
    }

    return (id, updatePropsObj) => {

      if(typeof id !== 'string'){
        throw new TypeError
      }

      if(typeof updatePropsObj !== 'object'){
        throw new TypeError
      }

      if(updatePropsObj instanceof Array){
        throw new TypeError
      }

      if(updatePropsObj.id){
        throw new Error("Cannot modify id!")
      }

      if(updatePropsObj.object && updatePropsObj.object instanceof Array){
        throw new TypeError
      }

      if(updatePropsObj.object === null){
        throw new TypeError
      }

      const inventoryItem = findInventoryItemById(id)

      const updatePropsObjKeys = Object.keys(updatePropsObj)
      const inventoryItemKeys = Object.keys(inventoryItem)

      if(updatePropsObjKeys.some(key => !inventoryItemKeys.includes(key))){
        throw new Error("Cant update non existing keys!")
      }

      updatePropsObjKeys.forEach(key => {
        
        if(typeof updatePropsObj[key] !== typeof inventoryItem[key]){
          throw new TypeError
        }

        if(inventoryItem[key] instanceof Date){
          if(!(updatePropsObj[key] instanceof Date) && updatePropsObj[key] !== null){
            throw new TypeError
          }
        }

      })

      const updatedInventoryItem = Object.assign({}, inventoryItem, updatePropsObj)
      try{
        saveInventoryItem(updatedInventoryItem)
      } catch(e) {
        throw new Error("saveInventoryItem failed!")
      }
      return updatedInventoryItem
    }
  }  
}

const deleteInventoryItem = _deleteInventoryItem => {

  if(typeof _deleteInventoryItem !== 'function'){
    throw new TypeError
  }

  return id => {

    if(typeof id !== 'string'){
      throw new TypeError
    }

    try{
      _deleteInventoryItem(id)
      return null
    } catch(e) {
      throw new Error("deleteInventoryItem failed!")
    }
  }
}

module.exports = {
  createInventoryItem,
  getInventoryItem,
  getInventoryItemsByInventoryId,
  updateInventoryItem,
  deleteInventoryItem
}