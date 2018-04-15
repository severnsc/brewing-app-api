const InventoryItem = `
  type InventoryItem {
    id: String!
    inventory: Inventory!
    object: String!
    quantityUnit: String!
    currentQuantity: Int!
    reorderQuantity: Int!
    reorderThreshold: Int!
    costUnit: String!
    unitCost: Float!
    reorderCost: Float!
    lastReorderDate: String
    deliveryDate: String
    createdAt: String!
    updatedAt: String!
  }
`

export default InventoryItem