export default {
  id: timerAlert => timerAlert.id,
  timer: timerAlert => getTimer(timerAlert.timerId),
  activationTime: timerAlert => timerAlert.activationTime,
  message: timerAlert => timerAlert.message,
  activated: timerAlert => timerAlert.activated
}