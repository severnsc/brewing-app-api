import chai from 'chai'
const expect = chai.expect

import { graphql } from 'graphql'
import schema from '../../schema'
import { addMockFunctionsToSchema } from 'graphql-tools'

addMockFunctionsToSchema({ schema })

describe('InventoryItem', () => {

  const query = `
    query InventoryItem {
      user(id: "1"){
        inventories {
          items{
            id
            inventory {
              id
            }
            object
            quantityUnit
            currentQuantity
            reorderQuantity
            reorderThreshold
            costUnit
            unitCost
            reorderCost
            lastReorderDate
            deliveryDate
            createdAt
            updatedAt
          }
        }
      }
    }
  `

  it('should have a string property id', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('id')
    expect(inventoryItem.id).to.be.a('string')
  })

  it('should have an inventory property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('inventory')
  })

  it('should have an object property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('object')
    expect(inventoryItem.object).to.be.a('string')
  })

  it('should have a quantityUnit property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('quantityUnit')
    expect(inventoryItem.quantityUnit).to.be.a('string')
  })

  it('should have a currentQuantity property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('currentQuantity')
    expect(inventoryItem.currentQuantity).to.be.a('number')
  })

  it('should have a reorderQuantity property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('reorderQuantity')
    expect(inventoryItem.reorderQuantity).to.be.a('number')
  })

  it('should have a reorderThreshold property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('reorderThreshold')
    expect(inventoryItem.reorderThreshold).to.be.a('number')
  })

  it('should have a string costUnit property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('costUnit')
    expect(inventoryItem.costUnit).to.be.a('string')
  })

  it('should have a number unitCost property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('unitCost')
    expect(inventoryItem.unitCost).to.be.a('number')
  })

  it('should have a reorderCost property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('reorderCost')
    expect(inventoryItem.reorderCost).to.be.a('number')
  })

  it('should have a lastReorderDate property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('lastReorderDate')
    expect(inventoryItem.lastReorderDate).to.be.a('string')
  })

  it('should have a deliveryDate property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('deliveryDate')
    expect(inventoryItem.deliveryDate).to.be.a('string')
  })

  it('should have a createdAt property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('createdAt')
    expect(inventoryItem.createdAt).to.be.a('string')
  })

  it('should have an updatedAt property', async () => {
    const response = await graphql(schema, query)
    const inventoryItem = response.data.user.inventories[0].items[0]
    expect(inventoryItem).to.have.property('updatedAt')
    expect(inventoryItem.updatedAt).to.be.a('string')
  })


})