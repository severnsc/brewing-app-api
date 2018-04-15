import { getUser, getTimerAlertsByTimerId } from '../../compose'

export default {
  id: timer => timer.id,
  user: timer => getUser(timer.userId),
  duration: timer => timer.duration,
  remainingDuration: timer => timer.remainingDuration,
  intervalDuration: timer => timer.intervalDuration,
  isRunning: timer => timer.isRunning,
  timerAlerts: timer => getTimerAlertsByTimerId(timer.id)
}