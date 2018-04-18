import chai from 'chai'
const expect = chai.expect

import { graphql } from 'graphql'
import schema from '../../schema'
import { addMockFunctionsToSchema } from 'graphql-tools'

addMockFunctionsToSchema({ schema })

describe('Inventory', () => {

  const query = `
    query Inventory {
      user(id:"1"){
        inventories{
          id
          user{
            id
          }
          name
          items {
            id
          }
        }
      }
    }
  `

  it('should have a string id property', async () => {
    const response = await graphql(schema, query)
    const inventory = response.data.user.inventories[0]
    expect(inventory).to.have.property('id')
    expect(inventory.id).to.be.a('string')
  })

  it('should have a name string property', async () => {
    const response = await graphql(schema, query)
    const inventory = response.data.user.inventories[0]
    expect(inventory).to.have.property('name')
    expect(inventory.name).to.be.a('string')
  })

  it('should have a user property', async () => {
    const response = await graphql(schema, query)
    const inventory = response.data.user.inventories[0]
    expect(inventory).to.have.property('user')
  })

  it('should have an array items property', async () => {
    const response = await graphql(schema, query)
    const inventory = response.data.user.inventories[0]
    expect(inventory).to.have.property('items')
    expect(inventory.items).to.be.an('array')
  })

})