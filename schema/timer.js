const Timer = `
  type Timer {
    id: String!
    user: User!
    duration: Int!
    remainingDuration: Int!
    intervalDuration: Int!
    isRunning: Boolean!
  }
`

export default Timer