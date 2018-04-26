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
  findTimerAlertsByTimerId = () => {
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

  _createTimerAlert = () => {}

  findTimerAlertById = id => ({
    id,
    timerId: "1",
    activationTime: 1000,
    message: "test",
    activated: false
  })

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