import Resolvers from '../../../schema/resolvers'
import chai from 'chai'
const expect = chai.expect

describe('InventoryItem resolvers', () => {

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
    const updatedInventoryItemPromise = updateInventoryItem('_', {id: "1", inventoryId: "2", object: {name:'poop'}, quantityUnit: "kgs", currentQuantity: 1, reorderQuantity: 1, reorderThreshold: 0, costUnit: "EUR", unitCost: 2, reorderCost: 2, lastReorderDate: date, deliveryDate: date})

    it('should return an object', () => {
      return expect(updatedInventoryItemPromise).to.eventually.be.an('object')
    })

    it('should have an id property equal to id arg', () => {
      return expect(updatedInventoryItemPromise).to.eventually.have.property('id').equal("1")
    })

    it('should have inventoryId property equal to inventoryId arg', () => {
      return expect(updatedInventoryItemPromise).to.eventually.have.property('inventoryId').equal('2')
    })

    it('should have object property equal to object arg', () => {
      return expect(updatedInventoryItemPromise).to.eventually.have.property("object").deep.equal({name: "poop"})
    })

    it('should have quantityUnit property equal to quantityUnit arg', () => {
      return expect(updatedInventoryItemPromise).to.eventually.have.property("quantityUnit").equal('kgs')
    })

    it('should have currentQuantity property equal to currentQuantity arg', () => {
      return expect(updatedInventoryItemPromise).to.eventually.have.property("currentQuantity").equal(1)
    })

    it('should have reorderQuantity property equal to reorderQuantity arg', () => {
      return expect(updatedInventoryItemPromise).to.eventually.have.property("reorderQuantity").equal(1)
    })

    it('should have reorderThreshold property equal to reorderThreshold arg', () => {
      return expect(updatedInventoryItemPromise).to.eventually.have.property("reorderThreshold").equal(0)
    })

    it('should have costUnit property equal to costUnit arg', () => {
      return expect(updatedInventoryItemPromise).to.eventually.have.property("costUnit").equal("EUR")
    })

    it('should have unitCost property equal to unitCost arg', () => {
      return expect(updatedInventoryItemPromise).to.eventually.have.property("unitCost").equal(2)
    })

    it('should have reorderCost property equal to reorderCost arg', () => {
      return expect(updatedInventoryItemPromise).to.eventually.have.property("reorderCost").equal(2)
    })

    it('should have lastReorderDate property equal to lastReorderDate arg', () => {
      return expect(updatedInventoryItemPromise).to.eventually.have.property("lastReorderDate").equal(date)
    })

    it('should have deliveryDate property equal to deliveryDate arg', () => {
      return expect(updatedInventoryItemPromise).to.eventually.have.property("deliveryDate").equal(date)
    })

  })

  describe('deleteInventoryItem', () => {

    const deleteInventoryItem = Resolvers.Mutation.deleteInventoryItem

    const deletedInventoryItem = deleteInventoryItem('_', {id: "1"})

    it('should return null', () => {
      expect(deletedInventoryItem).to.be.a('null')
    })

  })

})