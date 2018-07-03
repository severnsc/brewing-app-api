import { getInventory } from "../../compose"

export default {
  id: inventoryItem => inventoryItem.id,
  inventory: inventoryItem => getInventory(inventoryItem.inventoryId),
  object: inventoryItem => inventoryItem.object,
  quantityUnit: inventoryItem => inventoryItem.quantityUnit,
  currentQuantity: inventoryItem => inventoryItem.currentQuantity,
  reorderQuantity: inventoryItem => inventoryItem.reorderQuantity,
  reorderThreshold: inventoryItem => inventoryItem.reorderThreshold,
  costUnit: inventoryItem => inventoryItem.costUnit,
  unitCost: inventoryItem => inventoryItem.unitCost,
  reorderCost: inventoryItem => inventoryItem.reorderCost,
  lastReorderDate: inventoryItem => inventoryItem.lastReorderDate,
  deliveryDate: inventoryItem => inventoryItem.deliveryDate,
  createdAt: inventoryItem => inventoryItem.createdAt,
  updatedAt: inventoryItem => inventoryItem.updatedAt
}