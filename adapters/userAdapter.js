export const findUserById = id => ({
  id,
  userName: "test user",
  hashedPassword: "hashedPassword"
})

export const findUserByUsername = userName => ({
  id: "1",
  userName,
  hashedPassword: "password"
})

export const userExists = id => true

export const isUsernameUnique = () => true

export const _createUser = () => {}

export const hashPassword = word => word

export const saveUser = () => {}

export const _deleteUser = () => {}