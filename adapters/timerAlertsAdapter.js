export const findTimerAlertsByTimerId = () => {
  return [
    {
      id: "1",
      timerId: "1",
      activationTime: 1000,
      message: "Hello!",
      activated: false
    },
    {
      id: "2",
      timerId: "1",
      activationTime: 500,
      message: "Hello again!",
      activated: false
    }
  ]
}