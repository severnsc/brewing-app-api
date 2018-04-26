import {
  find,
  findOne,
  insertOne,
  updateOne
} from './databaseAdapter'

let findTimerById
let findTimersByUserId
let timerExists
let _createTimer
let saveTimer
let _deleteTimer

if(process.env.NODE_ENV === 'dev'){
  findTimersByUserId = () => {
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

  findTimerById = id => ({
    id,
    userId: "1",
    duration: 1000,
    remainingDuration: 1000,
    intervalDuration: 500,
    isRunning: false
  })

  timerExists = () => true

  _createTimer = () => {}

  saveTimer = () => {}

  _deleteTimer = () => {}
}else{
  findTimersByUserId = async userId => {
    const timers = await find('timers', {userId})
    return timers
  }

  findTimerById = async id => {
    const timer = findOne('timers', {id})
    return timer
  }

  timerExists = () => true

  _createTimer = async timer => {
    insertOne(timer)
  }

  saveTimer = async timer => {
    updateOne({id: timer.id}, timer)
  }

  _deleteTimer = () => {}
}

export {findTimerById}
export {findTimersByUserId}
export {timerExists}
export {_createTimer}
export {saveTimer}
export {_deleteTimer}