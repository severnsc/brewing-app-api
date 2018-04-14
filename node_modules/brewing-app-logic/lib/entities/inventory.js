const shortid = require('shortid')
const utils = require('../../utils')

const inventory = (name, userId) => {

  if(typeof name !== 'string'){
    throw new TypeError(utils.constructErrorMessage('name', 'string', name))
  }

  if(name === ""){
    throw new Error
  }

  if(typeof userId !== 'string'){
    throw new TypeError(utils.constructErrorMessage('userId', 'string', userId))
  }

  if(userId === ""){
    throw new Error
  }

  return {
    id: shortid.generate(),
    userId,
    name,
    items: []
  }
}

module.exports = {
  inventory
}