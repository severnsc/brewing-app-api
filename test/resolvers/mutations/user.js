import Resolvers from '../../../schema/resolvers'
import chai from 'chai'
const expect = chai.expect

describe('user mutation resolvers', () => {

  describe('createUser', () => {

    const createUser = Resolvers.Mutation.createUser

    const user = createUser('_', {userName: "user", password: "password"})

    it('should return an object', () => {
      expect(user).to.be.an('object')
    })

    it('should have a string id property', () => {
      expect(user.id).to.be.a('string')
    })

    it('should have a userName equal to userName arg', () => {
      expect(user.userName).to.equal("user")
    })

    it('should have string hashedPassword prop', () => {
      expect(user.hashedPassword).to.be.a('string')
    })

  })

  describe('updateUser', () => {

    const updateUser = Resolvers.Mutation.updateUser

    const userPromise = updateUser('_', {id: "1", userName: "Updated", password: "updatedPassword"})

    it('should return an object', () => {
      expect(userPromise).to.eventually.be.an('object')
    })

    it('should have id prop equal to id arg', () => {
      expect(userPromise).to.eventually.have.property('id').equal("1")
    })

    it('should have userName prop equal to userName arg', () => {
      expect(userPromise).to.eventually.have.property('userName').equal("Updated")
    })

    it('should have string hashedPassword', () => {
      expect(userPromise).to.eventually.have.property('hashedPassword').be.a('string')
    })

  })

  describe('authenticateUser', () => {

    const authenticateUser = Resolvers.Mutation.authenticateUser

    const userPromise = authenticateUser('_', {userName: "user", password: "password"})

    it('should return an object', () => {
      expect(userPromise).to.eventually.be.an('object')
    })

    it('should have userName prop equal to userName arg', () => {
      expect(userPromise).to.eventually.have.property('userName').equal('user')
    })

    it('should have string hashedPassword', () => {
      expect(userPromise).to.eventually.have.property('hashedPassword').be.a('string')
    })

  })

  describe('deleteUser', () => {

    const deleteUser = Resolvers.Mutation.deleteUser

    const user = deleteUser('_', {id: "1"})

    it('should return null', () => {
      expect(user).to.be.a('null')
    })

  })

})