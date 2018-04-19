import Resolvers from '../../../schema/resolvers'
import chai from 'chai'
const expect = chai.expect

describe('updatedInventoryItem resolvers', () => {

  describe('createInventoryItem', () => {

    const createInventoryItem = Resolvers.Mutation.createInventoryItem

    const date = new Date()
    const updatedInventoryItem = createInventoryItem("_", {inventoryId: "1", object: {name:'object'}, quantityUnit: "lbs", currentQuantity: 10, reorderQuantity: 10, reorderThreshold: 5, costUnit: "USD", unitCost: 1, reorderCost: 10, lastReorderDate: null, deliveryDate: null, createdAt: date, updatedAt: date})

    it('should return an object', () => {
      expect(updatedInventoryItem).to.be.an('object')
    })

    it('should have string id property', () => {
      expect(updatedInventoryItem.id).to.be.a('string')
    })

    it('should have inventoryId property equal to inventoryId arg', () => {
      expect(updatedInventoryItem.inventoryId).to.equal('1')
    })

    it('should have object property equal to object arg', () => {
      expect(updatedInventoryItem.object).to.deep.equal({name: "object"})
    })

    it('should have quantityUnit property equal to quantityUnit arg', () => {
      expect(updatedInventoryItem.quantityUnit).to.equal('lbs')
    })

    it('should have currentQuantity property equal to currentQuantity arg', () => {
      expect(updatedInventoryItem.currentQuantity).to.equal(10)
    })

    it('should have reorderQuantity property equal to reorderQuantity arg', () => {
      expect(updatedInventoryItem.reorderQuantity).to.equal(10)
    })

    it('should have reorderThreshold property equal to reorderThreshold arg', () => {
      expect(updatedInventoryItem.reorderThreshold).to.equal(5)
    })

    it('should have costUnit property equal to costUnit arg', () => {
      expect(updatedInventoryItem.costUnit).to.equal("USD")
    })

    it('should have unitCost property equal to unitCost arg', () => {
      expect(updatedInventoryItem.unitCost).to.equal(1)
    })

    it('should have reorderCost property equal to reorderCost arg', () => {
      expect(updatedInventoryItem.reorderCost).to.equal(10)
    })

    it('should have lastReorderDate property equal to null', () => {
      expect(updatedInventoryItem.lastReorderDate).to.be.a('null')
    })

    it('should have deliveryDate property equal to null', () => {
      expect(updatedInventoryItem.deliveryDate).to.be.a('null')
    })

    it('should have createdAt property equal createdAt arg', () => {
      expect(updatedInventoryItem.createdAt).to.equal(date)
    })

    it('should have updatedAt property equal updatedAt arg', () => {
      expect(updatedInventoryItem.updatedAt).to.equal(date)
    })

  })

  describe('updateInventoryItem', () => {

    const updateInventoryItem = Resolvers.Mutation.updateInventoryItem

    const date = new Date()
    const updatedInventoryItem = updateInventoryItem('_', {id: "1", inventoryId: "2", object: {name:'poop'}, quantityUnit: "kgs", currentQuantity: 1, reorderQuantity: 1, reorderThreshold: 0, costUnit: "EUR", unitCost: 2, reorderCost: 2, lastReorderDate: date, deliveryDate: date})

    it('should return an object', () => {
      expect(updatedInventoryItem).to.be.an('object')
    })

    it('should have an id property equal to id arg', () => {
      expect(updatedInventoryItem.id).to.equal("1")
    })

    it('should have inventoryId property equal to inventoryId arg', () => {
      expect(updatedInventoryItem.inventoryId).to.equal('2')
    })

    it('should have object property equal to object arg', () => {
      expect(updatedInventoryItem.object).to.deep.equal({name: "poop"})
    })

    it('should have quantityUnit property equal to quantityUnit arg', () => {
      expect(updatedInventoryItem.quantityUnit).to.equal('kgs')
    })

    it('should have currentQuantity property equal to currentQuantity arg', () => {
      expect(updatedInventoryItem.currentQuantity).to.equal(1)
    })

    it('should have reorderQuantity property equal to reorderQuantity arg', () => {
      expect(updatedInventoryItem.reorderQuantity).to.equal(1)
    })

    it('should have reorderThreshold property equal to reorderThreshold arg', () => {
      expect(updatedInventoryItem.reorderThreshold).to.equal(0)
    })

    it('should have costUnit property equal to costUnit arg', () => {
      expect(updatedInventoryItem.costUnit).to.equal("EUR")
    })

    it('should have unitCost property equal to unitCost arg', () => {
      expect(updatedInventoryItem.unitCost).to.equal(2)
    })

    it('should have reorderCost property equal to reorderCost arg', () => {
      expect(updatedInventoryItem.reorderCost).to.equal(2)
    })

    it('should have lastReorderDate property equal to lastReorderDate arg', () => {
      expect(updatedInventoryItem.lastReorderDate).to.equal(date)
    })

    it('should have deliveryDate property equal to deliveryDate arg', () => {
      expect(updatedInventoryItem.deliveryDate).to.be.equal(date)
    })

  })

})