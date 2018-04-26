import Resolvers from '../../../schema/resolvers'
import chai from 'chai'
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('inventory mutations', () => {

  describe('createInventory', () => {

    const createInventory = Resolvers.Mutation.createInventory

    const inventory = createInventory('_', {name:"test inventory", userId:"1"})

    it('should return an object', () => {
      expect(inventory).to.be.an('object')
    })

    it('should have a string name property', () => {
      expect(inventory).to.have.property('name')
      expect(inventory.name).to.be.a('string')
    })

    it('should have name equal to name arg', () => {
      expect(inventory.name).to.equal('test inventory')
    })

    it('should have string userId property', () => {
      expect(inventory).to.have.property('userId')
      expect(inventory.userId).to.be.a('string')
    })

    it('should have userId property equal userId arg', () => {
      expect(inventory.userId).to.equal('1')
    })

    it('should have string id property', () => {
      expect(inventory).to.have.property('id')
      expect(inventory.id).to.be.a('string')
    })

    it('should have array items property', () => {
      expect(inventory).to.have.property('items')
      expect(inventory.items).to.be.an('array')
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