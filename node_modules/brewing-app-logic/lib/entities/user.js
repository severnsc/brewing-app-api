const shortid = require('shortid')
const utils = require('../../utils')

const user = (userName, hashedPassword) => {
  
  if(userName === ''){
    throw new Error('userName cannot be empty!')
  }

  if(typeof userName !== 'string'){
    throw new TypeError(utils.constructErrorMessage('userName', 'string', userName))
  }

  if(hashedPassword === ''){
    throw new Error('hashedPassword cannot be empty!')
  }

  if(typeof hashedPassword !== 'string'){
    throw new TypeError(utils.constructErrorMessage('hashedPassword', 'string', hashedPassword))
  }

  return {
    id: shortid.generate(),
    userName,
    hashedPassword
  }
}

module.exports = {
  user
}