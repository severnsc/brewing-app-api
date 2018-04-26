import {
  find,
  findOne,
  insertOne,
  updateOne,
  deleteOne
} from './databaseAdapter'

let findUserById
let findUserByUsername
let userExists
let isUsernameUnique
let _createUser
let hashPassword
let saveUser
let _deleteUser

if(process.env.NODE_ENV === 'dev'){
  findUserById = id => ({
    id,
    userName: "test user",
    hashedPassword: "hashedPassword"
  })

  findUserByUsername = userName => ({
    id: "1",
    userName,
    hashedPassword: "password"
  })

  userExists = id => true

  isUsernameUnique = () => true

  _createUser = () => {}

  hashPassword = word => word

  saveUser = () => {}

  _deleteUser = () => {}
}else{
  findUserById = async id => {
    const user = findOne('users', {id})
    return user
  }

  findUserByUsername = async userName => {
    const user = findOne('users', {userName})
    return user
  }

  userExists = id => true

  isUsernameUnique = () => true

  _createUser = async user => {
    insertOne('users', user)
  }

  hashPassword = word => word

  saveUser = async user => {
    updateOne("users", {id: user.id}, user)
  }

  _deleteUser = async id => {
    deleteOne("users", id)
  }
}

export {findUserById}
export {findUserByUsername}
export {userExists}
export {isUsernameUnique}
export {_createUser}
export {hashPassword}
export {saveUser}
export {_deleteUser}