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

export const findTimerById = id => ({
  id,
  userId: "1",
  duration: 1000,
  remainingDuration: 1000,
  intervalDuration: 500,
  isRunning: false
})

export const timerExists = () => true

export const _createTimer = () => {}

export const saveTimer = () => {}

export const _deleteTimer = () => {}