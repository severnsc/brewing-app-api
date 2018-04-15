const entities = require('../entities')

const createTimer = _createTimer => {
  return (userId, duration, intervalDuration) => {
    const timer = entities.timerEntities.timer(userId, duration, intervalDuration)
    _createTimer(timer)
    return timer
  }
}

const getTimer = findTimerById => {

  if(typeof findTimerById !== 'function'){
    throw new TypeError
  }

  return id => {

    if(typeof id !== 'string'){
      throw new TypeError
    }

    try{
      const timer = findTimerById(id)
      return timer
    } catch(e){
      throw new Error
    }
  }
}

const getTimersByUserId = userExists => {

  if(typeof userExists !== 'function'){
    throw new TypeError
  }

  return findTimersByUserId => {

    if(typeof findTimersByUserId !== 'function'){
      throw new TypeError
    }

    return userId => {

      if(typeof userId !== 'string'){
        throw new TypeError
      }

      if(userExists(userId)){
        const timers = findTimersByUserId(userId)

        if(!Array.isArray(timers)){
          throw new TypeError
        }

        return timers
      }else{
        return []
      }
    }
  }
}

const startTimer = getTimerById => {
  return saveTimer => {
    return id => {
      const timer = getTimerById(id)
      const startedTimer = Object.assign({}, timer, {isRunning: true})
      return startedTimer
    }
  }
}


const stopTimer = getTimerById => {
  return saveTimer => {
    return id => {
      const timer = getTimerById(id)
      const stoppedTimer = Object.assign(
        {},
        timer,
        {isRunning: false}
      )
      return stoppedTimer
    }
  }
}

const decrementTimer = getTimerById => {
  return saveTimer => {
    return id => {
      const timer = getTimerById(id)
      const remainingDuration = 
        timer.remainingDuration - timer.intervalDuration
      let decrementedTimer = Object.assign(
        {},
        timer,
        {remainingDuration}
      )
      if(decrementedTimer.remainingDuration <= 0){
        decrementedTimer = Object.assign(
          {},
          decrementedTimer,
          {isRunning: false}
        )
      }
      saveTimer(decrementedTimer)
      return decrementedTimer
    }
  }
}

const resetTimer = getTimerById => {
  return saveTimer => {
    return id => {
      const timer = getTimerById(id)
      const _resetTimer = Object.assign(
        {},
        timer,
        {remainingDuration: timer.duration}
      )
      return _resetTimer
    }
  }
}

const deleteTimer = _deleteTimer => {

  if(typeof _deleteTimer !== 'function'){
    throw new TypeError
  }

  return id => {

    if(typeof id !== 'string'){
      throw new TypeError
    }

    try{
      _deleteTimer(id)
      return null
    } catch(e){
      throw new Error('_deleteTimer failed!')
    }
  }
}

module.exports = {
  createTimer,
  getTimer,
  getTimersByUserId,
  startTimer,
  stopTimer,
  decrementTimer,
  resetTimer,
  deleteTimer
}