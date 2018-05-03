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

  userExists = async id => {
    const user = await findUserById(id)
    return user ? true : false
  }

  isUsernameUnique = async username => {
    const user = await findOne('users', {userName: username}).catch(e => e)
    return user ? false : true
  }

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