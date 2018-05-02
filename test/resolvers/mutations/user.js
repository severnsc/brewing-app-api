import Resolvers from '../../../schema/resolvers'
import chai from 'chai'
const expect = chai.expect

describe('user mutation resolvers', () => {

  describe('createUser', () => {

    const createUser = Resolvers.Mutation.createUser

    const userPromise = createUser('_', {userName: "user", password: "password"})

    it('should return an object', () => {
      return expect(userPromise).to.eventually.be.an('object')
    })

    it('should have a string id property', () => {
      return expect(userPromise).to.eventually.have.property('id').be.a('string')
    })

    it('should have a userName equal to userName arg', () => {
      return expect(userPromise).to.eventually.have.property('userName').equal("user")
    })

    it('should have string hashedPassword prop', () => {
      expect(userPromise).to.eventually.have.property('hashedPassword').be.a('string')
    })

  })

  describe('updateUser', () => {

    const updateUser = Resolvers.Mutation.updateUser

    const userPromise = updateUser('_', {id: "1", userName: "Updated", password: "updatedPassword"}, {user: {id: "1"}})

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

    describe('when context has no user', () => {
      it('should return null', () => {
        const nullUserPromise = updateUser('_', {id: "1", userName: "Updated", password: "updatedPassword"}, null)
        expect(nullUserPromise).to.be.a('null')
      })
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

    const userPromise = deleteUser('_', {id: "1"}, {user: {id: "1"}})

    it('should return null', () => {
      return expect(userPromise).to.eventually.be.a('null')
    })

    describe('when context has no user', () => {
      it('should return null', () => {
        const nullUserPromise = deleteUser('_', {id: "1"}, null)
        expect(nullUserPromise).to.be.a('null')
      })
    })

  })

})