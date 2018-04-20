import chai from 'chai'
const expect = chai.expect

import { graphql } from 'graphql'
import schema from '../../schema'
import { addMockFunctionsToSchema } from 'graphql-tools'

addMockFunctionsToSchema({ schema })

describe('inventoryItem mutations', () => {

  describe('createInventoryItem', () => {

    const mutation = `
      mutation NewInventoryItem {
        createInventoryItem(inventoryId: "1", object: "{name:'object'}", quantityUnit: "lbs", currentQuantity: 10, reorderQuantity: 10, reorderThreshold: 5, costUnit: "USD", unitCost: 1, reorderCost: 10, createdAt: "${new Date().toString()}", updatedAt: "${new Date().toString()}"){
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
    `

    it('should have a string id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      console.log("result", result)
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('id')
      expect(inventoryItem.id).to.be.a('string')
    })

    it('should have an object inventory field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('inventory')
      expect(inventoryItem.inventory).to.be.an('object')
    })

    it('should have a string object field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('object')
      expect(inventoryItem.object).to.be.an('string')
    })

    it('should have a string quantityUnit field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('quantityUnit')
      expect(inventoryItem.quantityUnit).to.be.an('string')
    })

    it('should have a number currentQuantity field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('currentQuantity')
      expect(inventoryItem.currentQuantity).to.be.an('number')
    })

    it('should have a number reorderQuantity field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('reorderQuantity')
      expect(inventoryItem.reorderQuantity).to.be.an('number')
    })

    it('should have a number reorderThreshold field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('reorderThreshold')
      expect(inventoryItem.reorderThreshold).to.be.an('number')
    })

    it('should have a string costUnit field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('costUnit')
      expect(inventoryItem.costUnit).to.be.an('string')
    })

    it('should have a number unitCost field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('unitCost')
      expect(inventoryItem.unitCost).to.be.an('number')
    })

    it('should have a number reorderCost field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('reorderCost')
      expect(inventoryItem.reorderCost).to.be.an('number')
    })

    it('should have a string lastReorderDate field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('lastReorderDate')
      expect(inventoryItem.lastReorderDate).to.be.an('string')
    })

    it('should have a string deliveryDate field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('deliveryDate')
      expect(inventoryItem.deliveryDate).to.be.an('string')
    })

    it('should have a string createdAt field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('createdAt')
      expect(inventoryItem.createdAt).to.be.an('string')
    })

    it('should have a string updatedAt field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.createInventoryItem
      expect(inventoryItem).to.have.property('updatedAt')
      expect(inventoryItem.updatedAt).to.be.an('string')
    })

  })

  describe('updateInventoryItem', () => {

    const mutation = `
      mutation UpdatedInventoryItem {
        updateInventoryItem(id: "1", inventoryId: "1", object: "{name:'object'}", quantityUnit: "lbs", currentQuantity: 10, reorderQuantity: 10, reorderThreshold: 5, costUnit: "USD", unitCost: 1, reorderCost: 10){
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
    `

    it('should have a string id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      console.log("result", result)
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('id')
      expect(inventoryItem.id).to.be.a('string')
    })

    it('should have an object inventory field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('inventory')
      expect(inventoryItem.inventory).to.be.an('object')
    })

    it('should have a string object field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('object')
      expect(inventoryItem.object).to.be.an('string')
    })

    it('should have a string quantityUnit field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('quantityUnit')
      expect(inventoryItem.quantityUnit).to.be.an('string')
    })

    it('should have a number currentQuantity field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('currentQuantity')
      expect(inventoryItem.currentQuantity).to.be.an('number')
    })

    it('should have a number reorderQuantity field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('reorderQuantity')
      expect(inventoryItem.reorderQuantity).to.be.an('number')
    })

    it('should have a number reorderThreshold field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('reorderThreshold')
      expect(inventoryItem.reorderThreshold).to.be.an('number')
    })

    it('should have a string costUnit field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('costUnit')
      expect(inventoryItem.costUnit).to.be.an('string')
    })

    it('should have a number unitCost field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('unitCost')
      expect(inventoryItem.unitCost).to.be.an('number')
    })

    it('should have a number reorderCost field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('reorderCost')
      expect(inventoryItem.reorderCost).to.be.an('number')
    })

    it('should have a string lastReorderDate field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('lastReorderDate')
      expect(inventoryItem.lastReorderDate).to.be.an('string')
    })

    it('should have a string deliveryDate field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('deliveryDate')
      expect(inventoryItem.deliveryDate).to.be.an('string')
    })

    it('should have a string createdAt field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('createdAt')
      expect(inventoryItem.createdAt).to.be.an('string')
    })

    it('should have a string updatedAt field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const inventoryItem = result.data.updateInventoryItem
      expect(inventoryItem).to.have.property('updatedAt')
      expect(inventoryItem.updatedAt).to.be.an('string')
    })

  })

  describe('deleteInventoryItem', () => {

    const mutation = `
      mutation DeletedInventoryItem {
        deleteInventoryItem(id: "1"){
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