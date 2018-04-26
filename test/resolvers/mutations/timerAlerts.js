import Resolvers from '../../../schema/resolvers'
import chai from 'chai'
const expect = chai.expect

describe('timer alert mutation resolvers', () => {

  describe('createTimerAlert', () => {

    const createTimerAlert = Resolvers.Mutation.createTimerAlert

    const timerId = "1"
    const activationTime = 1000
    const message = "hello"
    const timerAlert = createTimerAlert('_', { timerId, activationTime, message })

    it('should return an object', () => {
      expect(timerAlert).to.be.an('object')
    })

    it('should generate unique ids', () => {
      expect(createTimerAlert('_', { timerId, activationTime, message }).id).to.not.equal(timerAlert.id)
    })

    it('should have timerId prop equal to timerId arg', () => {
      expect(timerAlert.timerId).to.equal(timerId)
    })

    it('should have activationTimer prop equal to activationTime arg', () => {
      expect(timerAlert.activationTime).to.equal(activationTime)
    })

    it('should have message prop equal to message arg', () => {
      expect(timerAlert.message).to.equal(message)
    })

    it('should have activated prop equal to false', () => {
      expect(timerAlert.activated).to.equal(false)
    })

  })

  describe('updateTimerAlert', () => {

    const updateTimerAlert = Resolvers.Mutation.updateTimerAlert

    const timerId = "2"
    const activationTime = 0
    const message = "this is an updated message"

    const timerAlertPromise = updateTimerAlert("1", timerId, activationTime, message)

    it('should return an object', () => {
      expect(timerAlertPromise).to.eventually.be.an('object')
    })

    it('should have id equal to id arg', () => {
      expect(timerAlertPromise).to.eventually.have.property('id').equal("1")
    })

    it('should have timerId equal to timerId arg', () => {
      expect(timerAlertPromise).to.eventually.have.property('timerId').equal(timerId)
    })

    it('should have activationTime equal to activationTime arg', () => {
      expect(timerAlertPromise).to.eventually.have.property('activationTime').equal(activationTime)
    })

    it('should have message equal to message arg', () => {
      expect(timerAlertPromise).to.eventually.have.property('message').equal(message)
    })

    it('should have activated equal to false', () => {
      expect(timerAlertPromise).to.eventually.have.property('activated').equal(false)
    })

    describe('when only timerId is non-null', () => {
      
      const timerId = "2"
      const activationTime = null
      const message = null
      const otherTimerAlertPromise = updateTimerAlert("1", timerId, activationTime, message)

      it('should update timerId field to equal timerId arg', () => {
        expect(otherTimerAlertPromise).to.eventually.have.property('timerId').equal("2")
      })

      it('should not update the activationTime field', () => {
        expect(otherTimerAlertPromise).to.eventually.have.property('activationTime').not.be.a('null')
      })

      it('should not update the message field', () => {
        expect(otherTimerAlertPromise).to.eventually.have.property('message').not.be.a('null')
      })

    })

    describe('when only activationTime is non-null', () => {
      
      const timerId = null
      const activationTime = 10
      const message = null
      const otherTimerAlertPromise = updateTimerAlert("1", timerId, activationTime, message)

      it('should update activationTime field to equal activationTime arg', () => {
        expect(otherTimerAlertPromise).to.eventually.have.property('activationTime').equal(activationTime)
      })

      it('should not update the timerId field', () => {
        expect(otherTimerAlertPromise).to.eventually.have.property('timerId').not.be.a('null')
      })

      it('should not update the message field', () => {
        expect(otherTimerAlertPromise).to.eventually.have.property('message').not.be.a('null')
      })

    })

    describe('when only message field is non-null', () => {
      
      const timerId = null
      const activationTime = null
      const message = "updated!"
      const otherTimerAlertPromise = updateTimerAlert("1", timerId, activationTime, message)

      it('should update message field to equal message arg', () => {
        expect(otherTimerAlertPromise).to.eventually.have.property('message').equal(message)
      })

      it('should not update the timerId field', () => {
        expect(otherTimerAlertPromise).to.eventually.have.property('timerId').not.be.a('null')
      })

      it('should not update the activationTime field', () => {
        expect(otherTimerAlertPromise).to.eventually.have.property('activationTime').not.be.a('null')
      })

    })

  })

  describe('activateTimerAlert', () => {

    const activateTimerAlert = Resolvers.Mutation.activateTimerAlert

    const timerAlertPromise = activateTimerAlert('_', {id: "1"})

    it('should return an object', () => {
      expect(timerAlertPromise).to.eventually.be.an('object')
    })

    it('should have id prop equal to id arg', () => {
      expect(timerAlertPromise).to.eventually.have.property('id').equal("1")
    })

    it('should have activated prop equal to true', () => {
      expect(timerAlertPromise).to.eventually.have.property('activated').equal(true)
    })

  })

  describe('deleteTimerAlert', () => {

    const deleteTimerAlert = Resolvers.Mutation.deleteTimerAlert

    const timerAlert = deleteTimerAlert('_', {id: "1"})

    it('should return null', () => {
      expect(timerAlert).to.be.a('null')
    })

  })



})