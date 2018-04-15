const entities = require('../entities')
const utils = require('../../utils')

const createUser = isUserNameUnique => {

  if(typeof isUserNameUnique !== 'function'){
    throw new TypeError(utils.constructErrorMessage('isUserNameUnique', 'function', isUserNameUnique))
  }

  return _createUser => {
    return hashPassword => {
      return (userName, password) => {

        if(typeof _createUser !== 'function'){
          throw new TypeError(utils.constructErrorMessage('_createUser', 'function', _createUser))
        }

        if(typeof password !== 'string'){
          throw new TypeError(utils.constructErrorMessage('password', 'string', password))
        }

        if(!isUserNameUnique(userName)){
          throw new Error
        }

        const hashedPassword = hashPassword(password)
        const user = entities.userEntity(userName, hashedPassword)
        try {
          _createUser(user)
        } catch(e) {
          throw new Error("createUser failed!")
        }
        return user
      }
    }
  }
}

const getUser = findUserById => {

  if(typeof findUserById !== 'function'){
    throw new TypeError
  }

  return id => {

    if(typeof id !== 'string'){
      throw new TypeError
    }

    try{
      const user = findUserById(id)
      return user
    } catch(e) {
      throw new Error
    }
  }
}

const updateUser = findUserById => {

  if(typeof findUserById !== 'function'){
    throw new TypeError(utils.constructErrorMessage('findUserById', 'function', findUserById))
  }

  return saveUser => {

    if(typeof saveUser !== 'function'){
      throw new TypeError(utils.constructErrorMessage('saveUser', 'function', saveUser))
    }

    return (id, updatePropsObj) => {

      if(typeof id !== 'string'){
        throw new TypeError(utils.constructErrorMessage('id', 'string', id))
      }

      if(typeof updatePropsObj !== 'object'){
        throw new TypeError(utils.constructErrorMessage('updatePropsObj', 'object', updatePropsObj))
      } else if(updatePropsObj instanceof Array){
        throw new TypeError('updatePropsObject must be of type object! Got type array.')
      }

      if(updatePropsObj.id){
        throw new Error("Cannot directly edit user Id!")
      }

      const user = findUserById(id)

      const userProps = Object.keys(user)
      const updatePropsObjKeys = Object.keys(updatePropsObj)
      if(updatePropsObjKeys.some(key => !userProps.includes(key))){
        throw new Error('Cannot update props that dont exist on on the user!')
      }

      updatePropsObjKeys.forEach(key => {
        if(typeof updatePropsObj[key] !== typeof user[key]){
          throw new TypeError(utils.constructErrorMessage(`items in the updatePropsObj must match type on the user. typeof updatePropsObject[${key}]: ${typeof updatePropsObj[key]} typeof user[${key}]: ${typeof user[key]}`))
        }
      })

      const updatedUser = Object.assign({}, user, updatePropsObj)
      saveUser(updatedUser)
      return updatedUser
    }
  }
}

const authenticateUser = findUserById => {

  if(typeof findUserById !== 'function'){
    throw new TypeError
  }

  return hashPassword => {
    return (id, password) => {

      if(typeof id !== 'string'){
        throw new TypeError
      }

      if(typeof password !== 'string'){
        throw new TypeError
      }

      const user = findUserById(id)
      const hashedPassword = hashPassword(password)
      if(hashedPassword === user.hashedPassword){
        return user
      }else{
        throw new Error("Could not find the user with given id!")
      }
    }
  }
}

const deleteUser = _deleteUser => {
  return id => {

    if(typeof id !== 'string'){
      throw new TypeError
    }

    try{
      _deleteUser(id)
      return null
    } catch(e) {
      throw new Error("deleteUser failed!")
    }
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  authenticateUser,
  deleteUser
}