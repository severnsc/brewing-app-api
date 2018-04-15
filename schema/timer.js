const Timer = `
  type Timer {
    id: String!
    user: User!
    duration: Int!
    remainingDuration: Int!
    intervalDuration: Int!
    isRunning: Boolean!,
    timerAlerts: [TimerAlert]!
  }
`

export default Timer