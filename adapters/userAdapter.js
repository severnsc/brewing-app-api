import faker from 'faker'

import bcrypt from 'bcrypt'

import {
  find,
  findOne,
  insertOne,
  updateOne,
  deleteOne
} from './databaseAdapter'

let findUserById
let findUserByUsername
let findUserByEmail
let userExists
let isUsernameUnique
let isEmailUnique
let _createUser
let hashPassword
let compareHash
let saveUser
let _deleteUser
let updateUserPassword

if(process.env.NODE_ENV === 'dev'){

  const makeUser = () => ({
    id: faker.random.uuid(),
    userName: faker.internet.userName(),
    hashedPassword: faker.internet.password(),
    email: faker.internet.email()
  })

  findUserById = id => ({
    id,
    userName: faker.internet.userName(),
    hashedPassword: faker.internet.password(),
    email: faker.internet.email()
  })

  findUserByUsername = userName => ({
    id: "1",
    userName,
    hashedPassword: faker.internet.password(),
    email: faker.internet.email()
  })

  findUserByEmail = email => ({
    id: "1",
    userName: faker.internet.userName(),
    hashedPassword: faker.internet.password(),
    email
  })

  userExists = id => true

  isUsernameUnique = () => Promise.resolve(true)

  isEmailUnique = () => true

  _createUser = () => {}

  hashPassword = word => word

  compareHash = () => true

  saveUser = () => {}

  _deleteUser = () => {}
}else{
  findUserById = async id => {
    const user = await findOne('users', {id})
    return user
  }

  findUserByUsername = async userName => {
    const user = await findOne('users', {userName})
    return user
  }

  findUserByEmail = async email => {
    const user = await findOne('users', {email})
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

  isEmailUnique = async email => {
    const user = await findOne('users', {email: email}).catch(e => e)
    return user ? false : true
  }

  _createUser = async user => {
    insertOne('users', user)
  }

  hashPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  }

  compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash)
  }

  saveUser = async user => {
    updateOne("users", {id: user.id}, user)
  }

  _deleteUser = async id => {
    deleteOne("users", id)
  }
}

export {findUserById}
export {findUserByUsername}
export {findUserByEmail}
export {userExists}
export {isUsernameUnique}
export {isEmailUnique}
export {_createUser}
export {hashPassword}
export {compareHash}
export {saveUser}
export {_deleteUser}