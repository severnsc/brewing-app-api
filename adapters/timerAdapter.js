export const findTimersByUserId = () => {
  return [
    {
      id: "1",
      userId: "1",
      duration: 1000,
      remainingDuration: 1000,
      intervalDuration: 500,
      isRunning: false
    },
    {
      id: "2",
      userId: "1",
      duration: 1000,
      remainingDuration: 1000,
      intervalDuration: 500,
      isRunning: false
    }
  ]
}

export const findTimerById = () => ({
  id,
  userId: "1",
  duration: 1000,
  remainingDuration: 1000,
  intervalDuration: 500,
  isRunning: false
})

export const timerExists = () => true