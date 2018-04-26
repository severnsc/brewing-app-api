import {
  find,
  findOne,
  insertOne,
  updateOne,
  deleteOne
} from './databaseAdapter'

import { getInventory, updateInventory } from '../compose'

let _createInventoryItem
let addToInventory
let findInventoryItemById
let saveInventoryItem
let _deleteInventoryItem

if(process.env.NODE_ENV === 'dev'){
  _createInventoryItem = () => {}

  addToInventory = () => {}

  findInventoryItemById = id => ({
    id,
    inventoryId: "1", 
    object: {name:'object'},
    quantityUnit: "lbs",
    currentQuantity: 10,
    reorderQuantity: 10,
    reorderThreshold: 5,
    costUnit: "USD",
    unitCost: 1,
    reorderCost: 10,
    lastReorderDate: null,
    deliveryDate: null,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  saveInventoryItem = () => {}

  _deleteInventoryItem = () => {}
}else{
  _createInventoryItem = async inventoryItem => {
    insertOne(inventoryItem)
  }

  addToInventory = async inventoryItem => {
    const inventoryId = inventoryItem.inventoryId
    const inventory = await getInventory(inventoryId)
    await updateInventory(inventoryId, {items: [...inventory.items, inventoryItem]})
  }

  findInventoryItemById = async id => {
    const inventoryItem = await find('inventoryItems', {id})
    return inventoryItem
  }

  saveInventoryItem = async inventoryItem => {
    updateOne("inventoryItems", {id: inventoryItem.id}, inventoryItem)
  }

  _deleteInventoryItem = async id => {
    deleteOne("inventoryItems", id)
  }
}

export {_createInventoryItem}
export {addToInventory}
export {findInventoryItemById}
export {saveInventoryItem}
export {_deleteInventoryItem}