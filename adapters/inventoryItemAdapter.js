import { find, findOne } from './databaseAdapter'

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
  _createInventoryItem = () => {}

  addToInventory = () => {}

  findInventoryItemById = async id => {
    const inventoryItem = await find('inventoryItems', {id})
    return inventoryItem
  }

  saveInventoryItem = () => {}

  _deleteInventoryItem = () => {}
}

export {_createInventoryItem}
export {addToInventory}
export {findInventoryItemById}
export {saveInventoryItem}
export {_deleteInventoryItem}