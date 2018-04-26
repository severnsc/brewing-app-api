import {
  find,
  findOne,
  insertOne,
  updateOne
} from './databaseAdapter'

let findInventoriesByUserId 

let findInventoryById 

let _createInventory 

let saveInventory 

let _deleteInventory 

if(process.env.NODE_ENV === 'dev'){
  const inventoryItem = {
    id: "1",
    inventoryId: "1",
    object: {
        name: "Test Object"
      },
    quantityUnit: "lbs",
    currentQuantity: 2,
    reorderQuantity: 10,
    reorderThreshold: 1,
    costUnit: "USD",
    unitCost: 10,
    reorderCost: 100,
    lastReorderDate: new Date("11/2/17"),
    deliveryDate: new Date("1/2/13"),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  findInventoriesByUserId = () => {
    return [
      {
        id: "1",
        userId: "1",
        name: "test inventory",
        items: [inventoryItem]
      }
    ]
  }

  findInventoryById = () => ({
    id: "1",
    userId: "1",
    name: "test inventory",
    items: [inventoryItem]
  })

  _createInventory = () => {}

  saveInventory = () => {}

  _deleteInventory = () => {}
}else{
  findInventoriesByUserId = async userId => {
    inventories = await find('inventories', {userId})
    return inventories
  }

  findInventoryById = async id => {
    inventory = await findOne('inventories', {id})
    return inventory
  }

  _createInventory = async inventory => {
    insertOne(inventory)
  }

  saveInventory = async inventory => {
    updateOne({id: inventory.id}, inventory)
  }

  _deleteInventory = () => {}
}


export {findInventoryById}
export {findInventoriesByUserId}
export {_createInventory}
export {saveInventory}
export {_deleteInventory}