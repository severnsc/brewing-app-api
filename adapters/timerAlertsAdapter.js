import faker from 'faker'

import {
  find,
  findOne,
  insertOne,
  updateOne,
  deleteOne
} from './databaseAdapter'

let findTimerAlertById
let findTimerAlertsByTimerId
let _createTimerAlert
let saveTimerAlert
let _deleteTimerAlert

if(process.env.NODE_ENV === 'dev'){

  const makeTimerAlert = () => ({
    id: faker.random.uuid(),
    timerId: "1",
    activationTime: faker.random.number(),
    message: faker.random.word(),
    activated: false
  })

  const fakeTimerAlerts = []
  while(fakeTimerAlerts.length < 50){
    fakeTimerAlerts.push(makeTimerAlert())
  }

  findTimerAlertsByTimerId = () => fakeTimerAlerts

  _createTimerAlert = () => {}

  findTimerAlertById = () => makeTimerAlert()

  saveTimerAlert = () => {}

  _deleteTimerAlert = () => {}

}else{
  findTimerAlertsByTimerId = async timerId => {
    const timerAlerts = find('timerAlerts', {timerId})
    return timerAlerts
  }

  _createTimerAlert = async timerAlert => {
    insertOne("timerAlerts", timerAlert)
  }

  findTimerAlertById = async id => {
    const timerAlert = findOne('timerAlerts', {id})
    return timerAlert
  }

  saveTimerAlert = async timerAlert => {
    updateOne("timerAlerts", {id: timerAlert.id}, timerAlert)
  }

  _deleteTimerAlert = async id => {
    deleteOne("timerAlerts", id)
  }
}

export {findTimerAlertById}
export {findTimerAlertsByTimerId}
export {_createTimerAlert}
export {saveTimerAlert}
export {_deleteTimerAlert}