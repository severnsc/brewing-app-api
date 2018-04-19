import {
  createUser,
  getUser,
  updateUser,
  authenticateUser,
  deleteUser,
  hashPassword,
  createInventory,
  updateInventory,
  deleteInventory
} from '../../compose'

export default {
  createUser: (_, { userName, password }) => {
    const user = createUser(userName, password)
    return user
  },

  updateUser: (_, { id, userName, password}) => {
    let updatePropsObj = {}
    
    if(userName){
      updatePropsObj.userName = userName
    }

    if(password){
      const hashedPassword = hashPassword(password)
      updatePropsObj.hashedPassword = hashedPassword
    }

    const updatedUser = updateUser(id, updatePropsObj)
    return updatedUser
  },

  authenticateUser: (_, { userName, password }) => {
    const authenticatedUser = authenticateUser(userName, password)
    return authenticatedUser
  },

  deleteUser: (_, { id }) => {
    const deletedUser = deleteUser(id)
    return deletedUser
  },

  createInventory: (_, { name, userId }) => {
    const inventory = createInventory(name, userId)
    return inventory
  },

  updateInventory: (_, { id, name }) => {
    const updatedInventory = updateInventory(id, {name})
    return updatedInventory
  },

  deleteInventory: (_, { id }) => {
    const deletedInventory = deleteInventory(id)
    return deletedInventory
  }
}