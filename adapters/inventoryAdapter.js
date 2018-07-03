import faker from 'faker'

import {
  find,
  findOne,
  insertOne,
  updateOne,
  deleteOne
} from './databaseAdapter'

let findInventoriesByUserId 

let findInventoryById 

let _createInventory 

let saveInventory 

let _deleteInventory 

if(process.env.NODE_ENV === 'dev'){

  const makeInventoryItem = () => ({
    id: faker.random.uuid(),
    inventoryId: "1",
    object: JSON.stringify({
        name: faker.random.word()
      }),
    quantityUnit: "lbs",
    currentQuantity: faker.random.number(),
    reorderQuantity: faker.random.number(),
    reorderThreshold: faker.random.number(),
    costUnit: "USD",
    unitCost: faker.random.number(),
    reorderCost: faker.random.number(),
    lastReorderDate: faker.date.past(),
    deliveryDate: faker.date.future(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past()
  })

  let fakeItems = []
  while(fakeItems.length < 200){
    fakeItems.push(makeInventoryItem())
  }

  findInventoriesByUserId = () => {
    return [
      {
        id: "1",
        userId: "1",
        name: "test inventory",
        items: fakeItems
      }
    ]
  }

  findInventoryById = id => ({
    id,
    userId: "1",
    name: faker.random.word(),
    items: fakeItems
  })

  _createInventory = () => {}

  saveInventory = () => {}

  _deleteInventory = () => {}
}else{
  findInventoriesByUserId = async userId => {
    const inventories = await find('inventories', {userId})
    return inventories
  }

  findInventoryById = async id => {
    const inventory = await findOne('inventories', {id})
    return inventory
  }

  _createInventory = async inventory => {
    insertOne("inventories", inventory)
  }

  saveInventory = async inventory => {
    updateOne("inventories", {id: inventory.id}, inventory)
  }

  _deleteInventory = async id => {
    deleteOne("inventories", id)
  }
}


export {findInventoryById}
export {findInventoriesByUserId}
export {_createInventory}
export {saveInventory}
export {_deleteInventory}