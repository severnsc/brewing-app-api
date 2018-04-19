export const _createInventoryItem = () => {}

export const addToInventory = () => {}

export const findInventoryItemById = id => ({
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

export const saveInventoryItem = () => {}