import Resolvers from '../../../schema/resolvers'
import chai from 'chai'
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('inventory mutations', () => {

  describe('createInventory', () => {

    const createInventory = Resolvers.Mutation.createInventory

    const inventoryPromise = createInventory('_', {name:"test inventory", userId:"1"})

    it('should return an object', () => {
      return expect(inventoryPromise).to.eventually.be.an('object')
    })

    it('should have a string name property', () => {
      return expect(inventoryPromise).to.eventually.have.property('name').be.a('string')
    })

    it('should have name equal to name arg', () => {
      return expect(inventoryPromise).to.eventually.have.property('name').equal('test inventory')
    })

    it('should have string userId property', () => {
      return expect(inventoryPromise).to.eventually.have.property('userId').be.a('string')
    })

    it('should have userId property equal userId arg', () => {
      return expect(inventoryPromise).to.eventually.have.property('userId').equal("1")
    })

    it('should have string id property', () => {
      return expect(inventoryPromise).to.eventually.have.property('id').be.a('string')
    })

    it('should have array items property', () => {
      return expect(inventoryPromise).to.eventually.have.property('items').be.an('array')
    })

  })

  describe('updateInventory', () => {

    const updateInventory = Resolvers.Mutation.updateInventory

    const updatedInventoryPromise = updateInventory('_', {id: "1", name: "update!"})

    it('should return an object', () => {
      expect(updatedInventoryPromise).to.eventually.be.an('object')
    })

    it('should have id property that equals id arg', () => {
      expect(updatedInventoryPromise).to.eventually.have.property('id').equal("1")
    })

    it('should have name property equal to name arg', () => {
      expect(updatedInventoryPromise).to.eventually.have.property('name').equal('update!')
    })

    it('should have string userId property', () => {
      expect(updatedInventoryPromise).to.eventually.have.property("userId").be.a('string')
    })

  })

  describe('deleteInventory', () => {

    const deleteInventory = Resolvers.Mutation.deleteInventory

    const deletedInventory = deleteInventory("_", {id: "1"})

    it('should return null', () => {
      expect(deletedInventory).to.be.a('null')
    })

  })

})