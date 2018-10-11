const User = `
  type User {
    id: String!
    userName: String!
    timers: [Timer]!
    inventories: [Inventory]!,
    settings: [Setting]!
  }
`

export default User