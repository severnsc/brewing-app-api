import chai from 'chai'
const expect = chai.expect

import { graphql } from 'graphql'
import schema from '../../schema'
import { addMockFunctionsToSchema } from 'graphql-tools'

addMockFunctionsToSchema({ schema })

describe('Inventory mutations', () => {

  describe('createInventory', () => {

    const mutation = `
      mutation NewInventory {
        createInventory(name: "test inventory", userId: "1"){
          id
          user {
            id
          }
          name
          items {
            id
          }
        }
      }
    `

    it('should have a string id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventory = result.data.createInventory
      expect(inventory).to.have.property('id')
      expect(inventory.id).to.be.a('string')
    })

    it('should have an object user field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventory = result.data.createInventory
      expect(inventory).to.have.property('user')
      expect(inventory.user).to.be.an('object')
    })

    it('should have a string name field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventory = result.data.createInventory
      expect(inventory).to.have.property('name')
      expect(inventory.name).to.be.a('string')
    })

    it('should have an array items field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventory = result.data.createInventory
      expect(inventory).to.have.property('items')
      expect(inventory.items).to.be.an('array')
    })

  })

  describe('updateInventory', () => {

    const mutation = `
      mutation UpdateInventory {
        updateInventory(id: "1", name: "updated inventory"){
          id
          user {
            id
          }
          name
          items {
            id
          }
        }
      }
    `

    it('should have a string id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventory = result.data.updateInventory
      expect(inventory).to.have.property('id')
      expect(inventory.id).to.be.a('string')
    })

    it('should have an object user field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventory = result.data.updateInventory
      expect(inventory).to.have.property('user')
      expect(inventory.user).to.be.an('object')
    })

    it('should have a string name field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventory = result.data.updateInventory
      expect(inventory).to.have.property('name')
      expect(inventory.name).to.be.a('string')
    })

    it('should have an array items field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventory = result.data.updateInventory
      expect(inventory).to.have.property('items')
      expect(inventory.items).to.be.an('array')
    })    


  })

  describe('deleteInventory', () => {

    const mutation = `
      mutation DeleteInventory {
        deleteInventory(id: "1"){
          id
        }
      }
    `

    it('should not have errors', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      expect(result.errors).to.not.be.an('array')
    })

  })

})