import faker from 'faker'

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
    object: JSON.stringify({name:faker.random.word()}),
    quantityUnit: "lbs",
    currentQuantity: faker.random.number(),
    reorderQuantity: faker.random.number(),
    reorderThreshold: faker.random.number(),
    costUnit: "USD",
    unitCost: faker.random.number(),
    reorderCost: faker.random.number(),
    lastReorderDate: faker.date.past().toUTCString(),
    deliveryDate: faker.date.future().toUTCString(),
    createdAt: faker.date.past().toUTCString(),
    updatedAt: faker.date.past().toUTCString()
  })

  saveInventoryItem = inventoryItem => console.log(inventoryItem)

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
    const inventories = await find("inventories", {}).catch(e => e)
    const items = inventories.map(inventory => inventory.items).flat()
    const inventoryItem = items.find(item => item.id === id)
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