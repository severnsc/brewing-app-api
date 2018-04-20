import Resolvers from '../../../schema/resolvers'
import chai from 'chai'
const expect = chai.expect

describe('Timer resolvers', () => {

  describe('createTimer', () => {

    const createTimer = Resolvers.Mutation.createTimer

    const userId = "1"
    const duration = 1000
    const intervalDuration = 500
    const timer = createTimer('_', { userId, duration, intervalDuration })

    it('should return an object', () => {
      expect(timer).to.be.an('object')
    })

    it('should have userId property equal to userId arg', () => {
      expect(timer.userId).to.equal(userId)
    })

    it('should have a duration property equal to duration arg', () => {
      expect(timer.duration).to.equal(duration)
    })

    it('should have an intervalDuration property equal to intervalDuration arg', () => {
      expect(timer.intervalDuration).to.equal(intervalDuration)
    })

  })

  describe('startTimer', () => {

    const startTimer = Resolvers.Mutation.startTimer

    const id = "1"
    const timer = startTimer('_', { id })

    it('should return an object', () => {
      expect(timer).to.be.an('object')
    })

    it('should have id field equal to id arg', () => {
      expect(timer.id).to.equal(id)
      expect(startTimer('_', {id:"2"}).id).to.equal("2")
    })

    it('should have isRunning field equal true', () => {
      expect(timer.isRunning).to.equal(true)
    })

  })

  describe('stopTimer', () => {

    const stopTimer = Resolvers.Mutation.stopTimer

    const id = "1"
    const timer = stopTimer('_', {id})

    it('should reutrn an object', () => {
      expect(timer).to.be.an('object')
    })

    it('should have an id field that equals id arg', () => {
      expect(timer.id).to.equal(id)
      expect(stopTimer('_', {id:"2"}).id).to.equal("2")
    })

    it('should have a isRunning field that equals false', () => {
      expect(timer.isRunning).to.equal(false)
    })

  })

  describe('decrementTimer', () => {

    const decrementTimer = Resolvers.Mutation.decrementTimer

    const timer = decrementTimer('_', {id: "1"})

    it('should reutrn an object', () => {
      expect(timer).to.be.an('object')
    })

    it('should have an id field that equals id arg', () => {
      expect(timer.id).to.equal("1")
      expect(decrementTimer('_', {id:"2"}).id).to.equal("2")
    })

    it('should have a remainingDuration equal to duration - intervalDuration', () => {
      expect(timer.remainingDuration).to.equal(timer.duration - timer.intervalDuration)
    })

  })

  describe('resetTimer', () => {

    const resetTimer = Resolvers.Mutation.resetTimer

    const timer = resetTimer('_', {id: "1"})

    it('should be an object', () => {
      expect(timer).to.be.an('object')
    })

    it('should have an id field that equals id arg', () => {
      expect(timer.id).to.equal("1")
      expect(resetTimer('_', {id: "2"}).id).to.equal("2")
    })

    it('should have a remainingDuration equal to duration', () => {
      expect(timer.remainingDuration).to.equal(timer.duration)
    })

  })

  describe('deleteTimer', () => {

    const deleteTimer = Resolvers.Mutation.deleteTimer

    const timer = deleteTimer('_', { id: "1" })

    it('should return null', () => {
      expect(timer).to.be.a('null')
    })

  })

})