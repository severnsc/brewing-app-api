const User = `
  type User {
    id: String!
    userName: String!
    timers: [Timer]!
    inventories: [Inventory]!
  }
`

export default User