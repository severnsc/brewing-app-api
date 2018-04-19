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

export const findInventoriesByUserId = () => {
  return [
    {
      id: "1",
      userId: "1",
      name: "test inventory",
      items: [inventoryItem]
    }
  ]
}

export const findInventoryById = () => ({
  id: "1",
  userId: "1",
  name: "test inventory",
  items: [inventoryItem]
})

export const _createInventory = () => {}

export const saveInventory = () => {}

export const _deleteInventory = () => {}