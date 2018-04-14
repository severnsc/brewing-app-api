const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const core = require('../../lib')

describe('inventoryItem entity factory', () => {

  const inventoryId = "1"
  const object = {
    name: "Test Object"
  }
  const quantityUnit = "lbs"
  const currentQuantity = 2
  const reorderQuantity = 10
  const reorderThreshold = 1
  const costUnit = "USD"
  const unitCost = 10
  const reorderCost = 100
  const lastReorderDate = new Date("11/2/17")
  const deliveryDate = new Date("1/2/13")
  const createdAt = new Date()
  const updatedAt = new Date()
  const inventoryItem = core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate, createdAt, updatedAt)

  describe('happy path', () => {

    it('should return an object', () => {
      inventoryItem.should.be.an('object')
    })

    it('should have string property id', () => {
      inventoryItem.should.have.property('id')
      inventoryItem.id.should.be.a('string')
    })

    it('should generate unique ids', () => {
      const inventoryItem2 = core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate, createdAt, updatedAt)
      inventoryItem2.id.should.not.equal(inventoryItem.id)
    })

    it('should have string property inventoryId', () => {
      inventoryItem.should.have.property('inventoryId')
      inventoryItem.inventoryId.should.be.a('string')
    })

    it('should set inventoryId equal to inventoryId arg', () => {
      inventoryItem.inventoryId.should.equal(inventoryId)
    })

    it('should have object property object', () => {
      inventoryItem.should.have.property('object')
      inventoryItem.object.should.be.a('object')
    })

    it('should have string property quantityUnit', () => {
      inventoryItem.should.have.property('quantityUnit')
      inventoryItem.quantityUnit.should.be.a('string')
    })

    it('should set quantityUnit equal to quantityUnit arg', () => {
      inventoryItem.quantityUnit.should.equal(quantityUnit)
    })

    it('should have number property currentQuantity', () => {
      inventoryItem.should.have.property('currentQuantity')
      inventoryItem.currentQuantity.should.be.a('number')
    })

    it('should set currentQuantity equal to currentQuantity arg', () => {
      inventoryItem.currentQuantity.should.equal(currentQuantity)
    })

    it('should have number property reorderQuantity', () => {
      inventoryItem.should.have.property('reorderQuantity')
      inventoryItem.reorderQuantity.should.be.a('number')
    })

    it('should set reorderQuantity equal to reorderQuantity arg', () => {
      inventoryItem.reorderQuantity.should.equal(reorderQuantity)
    })

    it('should have number property reorderThreshold', () => {
      inventoryItem.should.have.property('reorderThreshold')
      inventoryItem.reorderThreshold.should.be.a('number')
    })

    it('should set reorderThreshold to equal reorderThreshold arg', () => {
      inventoryItem.reorderThreshold.should.equal(reorderThreshold)
    })

    it('should have string proerty costUnit', () => {
      inventoryItem.should.have.property('costUnit')
      inventoryItem.costUnit.should.be.a('string')
    })

    it('should set costUnit equal to costUnit arg', () => {
      inventoryItem.costUnit.should.equal(costUnit)
    })

    it('should have number property unitCost', () => {
      inventoryItem.should.have.property('unitCost')
      inventoryItem.unitCost.should.be.a('number')
    })

    it('should set unitCost equal to unitCost arg', () => {
      inventoryItem.unitCost.should.equal(unitCost)
    })

    it('should have number property reorderCost', () => {
      inventoryItem.should.have.property('reorderCost')
      inventoryItem.reorderCost.should.be.a('number')
    })

    it('should set reorderCost equal to reorderCost arg', () => {
      inventoryItem.reorderCost.should.equal(reorderCost)
    })

    it('should have date/null property lastReorderDate', () => {
      inventoryItem.should.have.property("lastReorderDate")
      inventoryItem.lastReorderDate.should.be.a('date')
      const lastReorderDateNull = null
      const inventoryItem2 = core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDateNull, deliveryDate, createdAt, updatedAt)
      should.equal(null, inventoryItem2.lastReorderDate)
    })

    it('should set lastReorderDate equal to lastReorderDate arg', () => {
      inventoryItem.lastReorderDate.should.equal(lastReorderDate)
    })

    it('should have date/null property deliveryDate', () => {
      inventoryItem.should.have.property('deliveryDate')
      inventoryItem.deliveryDate.should.be.a('date')
      const deliveryDateNull = null
      const inventoryItem2 = core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDateNull, createdAt, updatedAt)
      should.equal(null, inventoryItem2.deliveryDate)
    })

    it('should set deliveryDate equal to deliveryDate arg', () => {
      inventoryItem.deliveryDate.should.equal(deliveryDate)
    })

    it('should have date property createdAt', () => {
      inventoryItem.should.have.property('createdAt')
      inventoryItem.createdAt.should.be.a('date')
    })

    it('should set createdAt equal to createdAt arg', () => {
      inventoryItem.createdAt.should.equal(createdAt)
    })

    it('should have date property updatedAt', () => {
      inventoryItem.should.have.property('updatedAt')
      inventoryItem.updatedAt.should.be.a('date')
    })

    it('should set updatedAt equal to updatedAt arg', () => {
      inventoryItem.updatedAt.should.equal(updatedAt)
    })

  })

  describe('error path', () => {

    describe('when inventoryId is not of type string', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(1)).to.throw(TypeError)
      })
    })

    describe('when object is not of type object', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(inventoryId, "object")).to.throw(TypeError)
      })
    })

    describe('when quantityUnit is not of type string', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(inventoryId, object, 1)).to.throw(TypeError)
      })
    })

    describe('when currentQuantity is not of type number', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(inventoryId, object, quantityUnit, "1")).to.throw(TypeError)
      })
    })

    describe('when reorderQuantity is not of type number', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, "reorderQuantity")).to.throw(TypeError)
      })
    })

    describe('when reorderThreshold is not of type number', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, "reorderThreshold")).to.throw(TypeError)
      })
    })

    describe('when costUnit is not of type stirng', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, 1)).to.throw(TypeError)
      })
    })

    describe('when unitCost is not of type number', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, "unitCost")).to.throw(TypeError)
      })
    })

    describe('when reorderCost is not of type number', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, "reorderCost")).to.throw(TypeError)
      })
    })

    describe('when lastReorderDate is not of type date or null', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, "lastReorderDate")).to.throw(TypeError)
      })
    })

    describe('when deliveryDate is not of type date or null', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, "deliveryDate")).to.throw(TypeError)
      })
    })

    describe('when createdAt is not of type date', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate, "createdAt")).to.throw(TypeError)
      })
    })

    describe('when updatedAt is not of type date', () => {
      it('should throw a type error', () => {
        expect(() => core.inventoryItemEntity(inventoryId, object, quantityUnit, currentQuantity, reorderQuantity, reorderThreshold, costUnit, unitCost, reorderCost, lastReorderDate, deliveryDate, createdAt, "updatedAt")).to.throw(TypeError)
      })
    })

  })

})