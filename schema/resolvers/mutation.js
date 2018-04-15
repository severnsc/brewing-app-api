import {
  createUser,
  getUser,
  updateUser,
  authenticateUser,
  deleteUser,
  hashPassword
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

  authenticateUser: (_, { id, password }) => {
    const authenticatedUser = authenticateUser(id, password)
    return authenticatedUser
  },

  deleteUser: (_, { id }) => {
    const deletedUser = deleteUser(id)
    return deletedUser
  }
}