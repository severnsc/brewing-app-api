import Resolvers from '../../../schema/resolvers'
import chai from 'chai'
import app from '../../../app'
import { dbConnection, closeDb } from '../../../adapters/databaseAdapter'
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('inventory mutations', () => {

  describe('createInventory', () => {

    const createInventory = Resolvers.Mutation.createInventory

    const inventoryPromise = createInventory('_', {name:"test inventory", userId:"1"}, {user: {id: "1"}})

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

    describe('when there is no user on context', () => {
      it('should return null', () => {
        const nullInventoryPromise = createInventory('_', {name:"test inventory", userId:"1"}, null)
        expect(nullInventoryPromise).to.be.a('null')
      })
    })

  })

  describe('updateInventory', () => {

    const updateInventory = Resolvers.Mutation.updateInventory

    const updatedInventoryPromise = updateInventory('_', {id: "1", name: "update!"}, {user: {id: "1"}})

    it('should return an object', () => {
      return expect(updatedInventoryPromise).to.eventually.be.an('object')
    })

    it('should have id property that equals id arg', () => {
      return expect(updatedInventoryPromise).to.eventually.have.property('id').equal("1")
    })

    it('should have name property equal to name arg', () => {
      return expect(updatedInventoryPromise).to.eventually.have.property('name').equal('update!')
    })

    it('should have string userId property', () => {
      return expect(updatedInventoryPromise).to.eventually.have.property("userId").be.a('string')
    })

    describe('when there is no user on context', () => {
      it('should return null', () => {
        const nullInventoryPromise = updateInventory('_', {id: "1", name: "update!"}, null)
        return expect(nullInventoryPromise).to.eventually.be.a('null')
      })
    })

  })

  describe('deleteInventory', () => {

    const deleteInventory = Resolvers.Mutation.deleteInventory

    const deletedInventoryPromise = deleteInventory("_", {id: "1"}, {user: {id: "1"}})

    it('should return null', () => {
      return expect(deletedInventoryPromise).to.eventually.be.a('null')
    })

    describe('when there is no user on context', () => {
      it('should return null', () => {
        const nullInventoryPromise = deleteInventory("_", {id: "1"}, null)
        return expect(nullInventoryPromise).to.eventually.be.a('null')
      })
    })

  })

})