import faker from 'faker'

import {
  find,
  findOne,
  insertOne,
  updateOne,
  deleteOne
} from './databaseAdapter'

let findTimerById
let findTimersByUserId
let timerExists
let _createTimer
let saveTimer
let _deleteTimer

if(process.env.NODE_ENV === 'dev'){

  const makeTimer = () => ({
    id: faker.random.uuid(),
    userId: "1",
    duration: faker.random.number(),
    remainingDuration: faker.random.number(),
    intervalDuration: faker.random.number(),
    isRunning: false
  })

  let fakeTimers = []
  while(fakeTimers.length < 50){
    fakeTimers.push(makeTimer())
  }

  findTimersByUserId = () => fakeTimers

  findTimerById = id => {
    const timer = makeTimer()
    return Object.assign({}, timer, { id })
  }

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

  _createTimer = async timer => {
    insertOne("timers", timer)
  }

  saveTimer = async timer => {
    updateOne("timers", {id: timer.id}, timer)
  }

  _deleteTimer = async id => {
    deleteOne("timers", id)
  }
}

export {findTimerById}
export {findTimersByUserId}
export {timerExists}
export {_createTimer}
export {saveTimer}
export {_deleteTimer}