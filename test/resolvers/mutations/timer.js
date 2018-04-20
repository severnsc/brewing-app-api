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

})