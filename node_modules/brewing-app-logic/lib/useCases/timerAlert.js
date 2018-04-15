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

  return id => {

    if(typeof id !== 'string'){
      throw new TypeError
    }

    const timerAlert = findTimerAlertById(id)
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

const updateTimerAlert = findTimerAlertById => {
  return saveTimerAlert => {
    return (id, updatePropsObject) => {

      if(typeof saveTimerAlert !== 'function'){
        throw new TypeError('saveTimerAlert', 'function', saveTimerAlert)
      }

      if(typeof id !== 'string'){
        throw new TypeError(utils.constructErrorMessage("id", "string", id))
      }

      if(typeof updatePropsObject !== 'object'){
        throw new TypeError(utils.constructErrorMessage("updatePropsObject", "object", updatePropsObject))
      }else if(updatePropsObject instanceof Array){
        throw new TypeError(utils.constructErrorMessage("updatePropsObject", "object", updatePropsObject))
      }

      if(updatePropsObject.id || updatePropsObject.activated){
        throw new Error('Cannot edit properties id or activated directly!')
      }

      const timerAlert = findTimerAlertById(id)

      const timerAlertKeys = Object.keys(timerAlert)
      const updatePropsObjectKeys = Object.keys(updatePropsObject)
      const findPropUpdateKey = key => timerAlertKeys.find(tKey => tKey === key)

      if(!updatePropsObjectKeys.every(findPropUpdateKey)){
        throw new Error('Updated properties must already exist on the timerAlert!')
      }

      updatePropsObjectKeys.forEach(key => {
        if(typeof updatePropsObject[key] !== typeof timerAlert[key]){
          throw new TypeError(`updatePropsObject values must be of same type as matching key/values on timerAlert. Expected updatePropsObject[${key}] to be of type ${typeof timerAlert[key]} but got ${typeof updatePropsObject[key]}`)
        }
      })

      const updatedTimerAlert = Object.assign({}, timerAlert, updatePropsObject)
     
      try {
        saveTimerAlert(updatedTimerAlert)
      } catch(e) {
        throw new Error("saveTimerAlert failed!")
      }
     
      return updatedTimerAlert
    }
  }
}

const activateTimerAlert = findTimerAlertById => {
  return saveTimerAlert => {
    return sendMessage => {
      return id => {

        if(typeof id !== 'string'){
          throw new TypeError(utils.constructErrorMessage('id', 'string', id))
        }

        const timerAlert = findTimerAlertById(id)
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

const deleteTimerAlert = _deleteTimerAlert => {
  return id => {

    if(typeof id !== 'string'){
      throw new TypeError(utils.constructErrorMessage('id', 'string', id))
    }

    try{
      _deleteTimerAlert(id)
    } catch(e){
      throw new Error("_deleteTimerAlert failed!")
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