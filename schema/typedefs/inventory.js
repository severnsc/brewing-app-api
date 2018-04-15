const Inventory = `
  type Inventory {
    id: String!
    user: User!
    name: String!
    items: [InventoryItem]!
  }
`
export default Inventory