const shortid = require('shortid')

const timerAlert = (timerId, activationTime, message) => {

  if(typeof timerId !== "string"){
    throw new TypeError()
  }

  if(typeof activationTime !== 'number'){
    throw new TypeError()
  }

  if(typeof message !== 'string'){
    throw new TypeError()
  }

  return {
    id: shortid.generate(),
    timerId,
    activationTime,
    message,
    activated: false
  }
}

module.exports = {
  timerAlert
}