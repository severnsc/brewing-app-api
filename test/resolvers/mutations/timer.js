import Resolvers from '../../../schema/resolvers'
import chai from 'chai'
const expect = chai.expect

describe('Timer resolvers', () => {

  describe('createTimer', () => {

    const createTimer = Resolvers.Mutation.createTimer

    const userId = "1"
    const duration = 1000
    const intervalDuration = 500
    const timerPromise = createTimer('_', { userId, duration, intervalDuration }, {user: {id: "1"}})

    it('should return an object', () => {
      return expect(timerPromise).to.eventually.be.an('object')
    })

    it('should have userId property equal to userId arg', () => {
      return expect(timerPromise).to.eventually.have.property('userId').equal(userId)
    })

    it('should have a duration property equal to duration arg', () => {
      return expect(timerPromise).to.eventually.have.property('duration').equal(duration)
    })

    it('should have an intervalDuration property equal to intervalDuration arg', () => {
      return expect(timerPromise).to.eventually.have.property("intervalDuration").equal(intervalDuration)
    })

    describe('when there is no user on context', () => {
      it('should return null', () => {
        const nullTimerPromise = createTimer('_', { userId, duration, intervalDuration }, null)
        return expect(nullTimerPromise).to.be.a('null')
      })
    })

  })

  describe('startTimer', () => {

    const startTimer = Resolvers.Mutation.startTimer

    const id = "1"
    const timerPromise = startTimer('_', { id }, {user: {id: "1"}})

    it('should return an object', () => {
      return expect(timerPromise).to.eventually.be.an('object')
    })

    it('should have id field equal to id arg', () => {
      return expect(timerPromise).to.eventually.have.property('id').equal(id)
    })

    it('should have isRunning field equal true', () => {
      return expect(timerPromise).to.eventually.have.property('isRunning').equal(true)
    })

    describe('when there is no user on context', () => {
      it('should return null', () => {
        const nullTimerPromise = startTimer('_', { id }, null)
        return expect(nullTimerPromise).to.eventually.be.a('null')
      })
    })

  })

  describe('stopTimer', () => {

    const stopTimer = Resolvers.Mutation.stopTimer

    const id = "1"
    const timerPromise = stopTimer('_', {id}, {user: {id: "1"}})

    it('should reutrn an object', () => {
      return expect(timerPromise).to.eventually.be.an('object')
    })

    it('should have an id field that equals id arg', () => {
      return expect(timerPromise).to.eventually.have.property('id').equal(id)
    })

    it('should have a isRunning field that equals false', () => {
      return expect(timerPromise).to.eventually.have.property('isRunning').equal(false)
    })

    describe('when there is no user on context', () => {
      it('should return null', () => {
        const nullTimerPromise = stopTimer('_', { id }, null)
        return expect(nullTimerPromise).to.eventually.be.a('null')
      })
    })

  })

  describe('decrementTimer', () => {

    const decrementTimer = Resolvers.Mutation.decrementTimer

    const timerPromise = decrementTimer('_', {id: "1"}, {user: {id: "1"}})

    it('should reutrn an object', () => {
      return expect(timerPromise).to.eventually.be.an('object')
    })

    it('should have an id field that equals id arg', () => {
      return expect(timerPromise).to.eventually.have.property('id').equal("1")
    })

    it('should have a remainingDuration equal to duration - intervalDuration', () => {
      expect(timerPromise).to.eventually.have.property('remainingDuration').equal(500)
    })

    describe('when there is no user on context', () => {
      it('should return null', () => {
        const nullTimerPromise = decrementTimer('_', { id: "1" }, null)
        return expect(nullTimerPromise).to.eventually.be.a('null')
      })
    })

  })

  describe('resetTimer', () => {

    const resetTimer = Resolvers.Mutation.resetTimer

    const timerPromise = resetTimer('_', {id: "1"}, {user: {id: "1"}})

    it('should be an object', () => {
      expect(timerPromise).to.eventually.be.an('object')
    })

    it('should have an id field that equals id arg', () => {
      expect(timerPromise).to.eventually.have.property('id').equal("1")
    })

    it('should have a remainingDuration equal to duration', () => {
      expect(timerPromise).to.eventually.have.property('remainingDuration').equal(1000)
    })

    describe('when there is no user on context', () => {
      it('should return null', () => {
        const nullTimerPromise = resetTimer('_', { id: "1" }, null)
        return expect(nullTimerPromise).to.eventually.be.a('null')
      })
    })

  })

  describe('updateTimer', () => {

    const testTimer = {
      id: "1",
      userId: "1",
      duration: 1000,
      remainingDuration: 1000,
      intervalDuration: 500,
      isRunning: false
    }

    const updatePropsObj = {
      duration: 25000,
      intervalDuration: 5000
    }

    const updateTimer = Resolvers.Mutation.updateTimer

    const timerPromise = updateTimer('_', {id: "1", duration: updatePropsObj.duration, intervalDuration: updatePropsObj.intervalDuration}, {user: {id: "1"}})

    it('should be an object', () => {
      expect(timerPromise).to.eventually.be.an('object')
    })

    it('should have an id field that equals id arg', () => {
      expect(timerPromise).to.eventually.have.property('id').equal("1")
    })

    it('should have duration and intervalDuration equal to corresponding args', () => {
      expect(timerPromise).to.eventually.have.property('duration').equal(25000)
      expect(timerPromise).to.eventually.have.property('intervalDuration').equal(5000)
    })

    it('should equal testTimer merged with updatePropsObj', () => {
      expect(timerPromise).to.eventually.deep.equal(Object.assign({}, testTimer, updatePropsObj))
    })

    describe('when there is no user on context', () => {
      it('should return null', () => {
        const nullTimerPromise = updateTimer('_', {id: "1", duration: updatePropsObj.duration, intervalDuration: updatePropsObj.intervalDuration}, null)
        return expect(nullTimerPromise).to.eventually.be.a('null')
      })
    })

  })

  describe('deleteTimer', () => {

    const deleteTimer = Resolvers.Mutation.deleteTimer

    const timerPromise = deleteTimer('_', { id: "1" }, {user: {id: "1"}})

    it('should return null', () => {
      return expect(timerPromise).to.eventually.be.a('null')
    })

    describe('when there is no user on context', () => {
      it('should return null', () => {
        const nullTimerPromise = deleteTimer('_', { id: "1" }, null)
        return expect(nullTimerPromise).to.eventually.be.a('null')
      })
    })

  })

})