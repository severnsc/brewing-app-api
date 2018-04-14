const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const core = require('../../lib')

describe('inventory entity factory function', () => {

  const name = "test inventory"
  const userId = "1"
  const inventory = core.inventoryEntity(name, userId)

  describe('happy path', () => {

    it('should return an object', () => {
      inventory.should.be.an('object')
    })

    it('should have string property id', () => {
      inventory.should.have.property('id')
      inventory.id.should.be.a('string')
    })

    it('should assign unique ids', () => {
      const inventory2 = core.inventoryEntity(name, userId)
      inventory2.id.should.not.equal(inventory.id)
    })

    it('should have a string property userId', () => {
      inventory.should.have.property('userId')
      inventory.userId.should.be.a('string')
    })

    it('should set userId prop to passed userId arg', () => {
      inventory.userId.should.equal(userId)
    })

    it('should have string property name', () => {
      inventory.should.have.property('name')
      inventory.name.should.be.a('string')
    })

    it('should set name prop to passed name arg', () => {
      inventory.name.should.equal(name)
    })

    it('should have an array proprety items', () => {
      inventory.should.have.property('items')
      inventory.items.should.be.an('array')
    })

  })

  describe('error path', () => {

    describe('when name is not of type string', () => {
      it('should throw a type error', () => {
        expect(() => core.nventoryEntity(1, userId)).to.throw(TypeError)
      })
    })

    describe('when name is empty', () => {
      it('should throw an error', () => {
        expect(() => core.inventoryEntity("", userId)).to.throw()
      })
    })

    describe('when userId is not of type string', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryEntity(name, 1)).to.throw(TypeError)
      })
    })

    describe('when userId is empty', () => {
      it('should throw an error', () => {
        expect(() => core.inventoryEntity(name, "")).to.throw()
      })
    })

  })

})