import Resolvers from '../../../schema/resolvers'
import chai from 'chai'
const expect = chai.expect

describe('inventoryItem resolvers', () => {

  describe('createInventoryItem', () => {

    const createInventoryItem = Resolvers.Mutation.createInventoryItem

    const date = new Date()
    const inventoryItem = createInventoryItem("_", {inventoryId: "1", object: {name:'object'}, quantityUnit: "lbs", currentQuantity: 10, reorderQuantity: 10, reorderThreshold: 5, costUnit: "USD", unitCost: 1, reorderCost: 10, lastReorderDate: null, deliveryDate: null, createdAt: date, updatedAt: date})

    it('should return an object', () => {
      expect(inventoryItem).to.be.an('object')
    })

    it('should have string id property', () => {
      expect(inventoryItem.id).to.be.a('string')
    })

    it('should have inventoryId property equal to inventoryId arg', () => {
      expect(inventoryItem.inventoryId).to.equal('1')
    })

    it('should have object property equal to object arg', () => {
      expect(inventoryItem.object).to.deep.equal({name: "object"})
    })

    it('should have quantityUnit property equal to quantityUnit arg', () => {
      expect(inventoryItem.quantityUnit).to.equal('lbs')
    })

    it('should have currentQuantity property equal to currentQuantity arg', () => {
      expect(inventoryItem.currentQuantity).to.equal(10)
    })

    it('should have reorderQuantity property equal to reorderQuantity arg', () => {
      expect(inventoryItem.reorderQuantity).to.equal(10)
    })

    it('should have reorderThreshold property equal to reorderThreshold arg', () => {
      expect(inventoryItem.reorderThreshold).to.equal(5)
    })

    it('should have costUnit property equal to costUnit arg', () => {
      expect(inventoryItem.costUnit).to.equal("USD")
    })

    it('should have unitCost property equal to unitCost arg', () => {
      expect(inventoryItem.unitCost).to.equal(1)
    })

    it('should have reorderCost property equal to reorderCost arg', () => {
      expect(inventoryItem.reorderCost).to.equal(10)
    })

    it('should have lastReorderDate property equal to null', () => {
      expect(inventoryItem.lastReorderDate).to.be.a('null')
    })

    it('should have deliveryDate property equal to null', () => {
      expect(inventoryItem.deliveryDate).to.be.a('null')
    })

    it('should have createdAt property equal createdAt arg', () => {
      expect(inventoryItem.createdAt).to.equal(date)
    })

    it('should have updatedAt property equal updatedAt arg', () => {
      expect(inventoryItem.updatedAt).to.equal(date)
    })

  })

})