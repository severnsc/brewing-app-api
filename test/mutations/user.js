import chai from 'chai'
const expect = chai.expect

import { graphql } from 'graphql'
import schema from '../../schema'
import { addMockFunctionsToSchema } from 'graphql-tools'

addMockFunctionsToSchema({ schema })

describe('User mutations', () => {

  describe('createUser', () => {
    
    const mutation = `
      mutation NewUser {
        createUser(userName: "new user", password: "password"){
          id
          userName
        }
      }
    `

    it('should have a string id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const user = result.data.createUser
      expect(user).to.have.property('id')
      expect(user.id).to.be.a('string')
    })

    it('should have a string userName field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const user = result.data.createUser
      expect(user).to.have.property('userName')
      expect(user.userName).to.be.a('string')
    })

  })

  describe('updateUser', () => {

    const mutation = `
      mutation UpdateUser {
        updateUser(id: "1", userName: "updated user"){
          id
          userName
        }
      }
    `

    it('should have a string id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const user = result.data.updateUser
      expect(user).to.have.property('id')
      expect(user.id).to.be.a('string')
    })

    it('should have a string userName field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const user = result.data.updateUser
      expect(user).to.have.property('userName')
      expect(user.userName).to.be.a('string')
    })

  })

  describe('authenticateUser', () => {

    const mutation = `
      mutation AuthenticateUser {
        authenticateUser(userName: "updated user", password: "password"){
          id
          userName
        }
      }
    `

    it('should have a string id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const user = result.data.authenticateUser
      expect(user).to.have.property('id')
      expect(user.id).to.be.a('string')
    })

    it('should have a string userName field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const user = result.data.authenticateUser
      expect(user).to.have.property('userName')
      expect(user.userName).to.be.a('string')
    })    

  })

  describe('deleteUser', () => {

    const mutation = `
      mutation DeleteUser {
        deleteUser(id: "1"){
          id
          userName
        }
      }
    `

    it('should have a id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const user = result.data.deleteUser
      expect(user).to.have.property('id')
    })

    it('should have a userName field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const user = result.data.deleteUser
      expect(user).to.have.property('userName')
    })

  })

})