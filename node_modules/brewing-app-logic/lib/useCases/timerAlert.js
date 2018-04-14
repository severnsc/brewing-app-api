const entities = require('../entities')
const utils = require('../../utils')

const createTimerAlert = _createTimerAlert => {

  return (timerId, activationTime, message) => {
    
    if(typeof _createTimerAlert !== 'function'){
      throw new TypeError(utils.constructErrorMessage('_createTimerAlert', 'function', _createTimerAlert))
    }

    const timerAlert = entities.timerAlertEntity(timerId, activationTime, message)
    
    try {
      _createTimerAlert(timerAlert)
    } catch(e) {
      throw new Error('createTimerAlert failed!')
    }

    return timerAlert
  }

}

const getTimerAlert = findTimerAlertById => {

  if(typeof findTimerAlertById !== 'function'){
    throw new TypeError
  }

  return timerAlertId => {

    if(typeof timerAlertId !== 'string'){
      throw new TypeError
    }

    const timerAlert = findTimerAlertById(timerAlertId)
    return timerAlert
  }
}

const getTimerAlertsByTimerId = timerExists => {

  if(typeof timerExists !== 'function'){
    throw new TypeError
  }

  return findTimerAlertsByTimerId => {

    if(typeof findTimerAlertsByTimerId !== 'function'){
      throw new TypeError
    }

    return timerId => {

      if(typeof timerId !== 'string'){
        throw new TypeError
      }

      if(timerExists(timerId)){
        const timerAlerts = findTimerAlertsByTimerId(timerId)

        if(!Array.isArray(timerAlerts)){
          throw new TypeError
        }

        return timerAlerts
      }else{
        return []
      }
    }
  }
}

const updateTimerAlert = getTimerAlertById => {
  return saveTimerAlert => {
    return (timerAlertId, propUpdateObj) => {

      if(typeof saveTimerAlert !== 'function'){
        throw new TypeError('saveTimerAlert', 'function', saveTimerAlert)
      }

      if(typeof timerAlertId !== 'string'){
        throw new TypeError(utils.constructErrorMessage("timerAlertId", "string", timerAlertId))
      }

      if(typeof propUpdateObj !== 'object'){
        throw new TypeError(utils.constructErrorMessage("propUpdateObj", "object", propUpdateObj))
      }else if(propUpdateObj instanceof Array){
        throw new TypeError(utils.constructErrorMessage("propUpdateObj", "object", propUpdateObj))
      }

      if(propUpdateObj.id || propUpdateObj.activated){
        throw new Error('Cannot edit properties id or activated directly!')
      }

      const timerAlert = getTimerAlertById(timerAlertId)

      const timerAlertKeys = Object.keys(timerAlert)
      const propUpdateObjKeys = Object.keys(propUpdateObj)
      const findPropUpdateKey = key => timerAlertKeys.find(tKey => tKey === key)

      if(!propUpdateObjKeys.every(findPropUpdateKey)){
        throw new Error('Updated properties must already exist on the timerAlert!')
      }

      propUpdateObjKeys.forEach(key => {
        if(typeof propUpdateObj[key] !== typeof timerAlert[key]){
          throw new TypeError(`propUpdateObj values must be of same type as matching key/values on timerAlert. Expected propUpdateObj[${key}] to be of type ${typeof timerAlert[key]} but got ${typeof propUpdateObj[key]}`)
        }
      })

      const updatedTimerAlert = Object.assign({}, timerAlert, propUpdateObj)
     
      try {
        saveTimerAlert(updatedTimerAlert)
      } catch(e) {
        throw new Error("saveTimerAlert failed!")
      }
     
      return updatedTimerAlert
    }
  }
}

const activateTimerAlert = getTimerAlertById => {
  return saveTimerAlert => {
    return sendMessage => {
      return timerAlertId => {

        if(typeof timerAlertId !== 'string'){
          throw new TypeError(utils.constructErrorMessage('timerAlertId', 'string', timerAlertId))
        }

        const timerAlert = getTimerAlertById(timerAlertId)
        const activatedTimerAlert = Object.assign({}, timerAlert, {activated: true})
        
        try {
          saveTimerAlert(activatedTimerAlert)
        } catch(e) {
          throw new Error("saveTimerAlert failed!")
        }

        try{
          sendMessage(activatedTimerAlert.message)
        } catch(e){
          throw new Error("sendMessage failed!")
        }

        return activatedTimerAlert
      }
    }
  }
}

const deleteTimerAlert = deleteFunc => {
  return timerAlertId => {

    if(typeof timerAlertId !== 'string'){
      throw new TypeError(utils.constructErrorMessage('timerAlertId', 'string', timerAlertId))
    }

    try{
      deleteFunc(timerAlertId)
    } catch(e){
      throw new Error("deleteFunc failed!")
    }  
  }
}

module.exports = {
  createTimerAlert,
  getTimerAlert,
  getTimerAlertsByTimerId,
  updateTimerAlert,
  activateTimerAlert,
  deleteTimerAlert
}