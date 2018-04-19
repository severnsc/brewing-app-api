import chai from 'chai'
const expect = chai.expect

import { graphql } from 'graphql'
import schema from '../../schema'
import { addMockFunctionsToSchema } from 'graphql-tools'

addMockFunctionsToSchema({ schema })

describe.only('Inventory mutations', () => {

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

})