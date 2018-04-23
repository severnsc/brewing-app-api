import Resolvers from '../../../schema/resolvers'
import chai from 'chai'
const expect = chai.expect

describe('timer alert mutation resolvers', () => {

  describe('createTimerAlert', () => {

    const createTimerAlert = Resolvers.Mutation.createTimerAlert

    const timerId = "1"
    const activationTime = 1000
    const message = "hello"
    const timerAlert = createTimerAlert(timerId, activationTime, message)

    it('should return an object', () => {
      expect(timerAlert).to.be.an('object')
    })

    it('should generate unique ids', () => {
      expect(createTimerAlert(timerId, activationTime, message).id).to.not.equal(timerAlert.id)
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

})