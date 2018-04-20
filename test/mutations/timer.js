import chai from 'chai'
const expect = chai.expect

import { graphql } from 'graphql'
import schema from '../../schema'
import { addMockFunctionsToSchema } from 'graphql-tools'

addMockFunctionsToSchema({ schema })

describe('timer mutations', () => {

  describe('createTimer', () => {

    const mutation = `
      mutation CreateTimer {
        createTimer(userId: "1", duration: 1000, intervalDuration: 500) {
          id
          user {
            id
          }
          duration
          remainingDuration
          intervalDuration
          isRunning
          timerAlerts {
            id
          }
        }
      }
    `

    it('should have a string id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.createTimer
      expect(timer).to.have.property('id')
      expect(timer.id).to.be.a('string')
    })

    it('should have an object user field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.createTimer
      expect(timer).to.have.property('user')
      expect(timer.user).to.be.an('object')
    })

    it('should have a number duration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.createTimer
      expect(timer).to.have.property('duration')
      expect(timer.duration).to.be.a('number')
    })

    it('should have a number remainingDuration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.createTimer
      expect(timer).to.have.property('remainingDuration')
      expect(timer.remainingDuration).to.be.a('number')
    })

    it('should have a number intervalDuration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.createTimer
      expect(timer).to.have.property('intervalDuration')
      expect(timer.intervalDuration).to.be.a('number')
    })

    it('should have a boolean isRunning field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.createTimer
      expect(timer).to.have.property('isRunning')
      expect(timer.isRunning).to.be.a('boolean')
    })

    it('should have an array timerAlerts field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.createTimer
      expect(timer).to.have.property('timerAlerts')
      expect(timer.timerAlerts).to.be.a('array')
    })

  })

  describe('startTimer', () => {

    const mutation = `
      mutation StartTimer {
        startTimer(id: "1") {
          id
          user {
            id
          }
          duration
          remainingDuration
          intervalDuration
          isRunning
          timerAlerts {
            id
          }
        }
      }
    `


    it('should have a string id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.startTimer
      expect(timer).to.have.property('id')
      expect(timer.id).to.be.a('string')
    })

    it('should have an object user field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.startTimer
      expect(timer).to.have.property('user')
      expect(timer.user).to.be.an('object')
    })

    it('should have a number duration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.startTimer
      expect(timer).to.have.property('duration')
      expect(timer.duration).to.be.a('number')
    })

    it('should have a number remainingDuration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.startTimer
      expect(timer).to.have.property('remainingDuration')
      expect(timer.remainingDuration).to.be.a('number')
    })

    it('should have a number intervalDuration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.startTimer
      expect(timer).to.have.property('intervalDuration')
      expect(timer.intervalDuration).to.be.a('number')
    })

    it('should have a boolean isRunning field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.startTimer
      expect(timer).to.have.property('isRunning')
      expect(timer.isRunning).to.be.a('boolean')
    })

    it('should have an array timerAlerts field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.startTimer
      expect(timer).to.have.property('timerAlerts')
      expect(timer.timerAlerts).to.be.a('array')
    })

  })

  describe('stopTimer', () => {

    const mutation = `
      mutation StopTimer {
        stopTimer(id: "1") {
          id
          user {
            id
          }
          duration
          remainingDuration
          intervalDuration
          isRunning
          timerAlerts {
            id
          }
        }
      }
    `

    it('should have a string id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.stopTimer
      expect(timer).to.have.property('id')
      expect(timer.id).to.be.a('string')
    })

    it('should have an object user field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.stopTimer
      expect(timer).to.have.property('user')
      expect(timer.user).to.be.an('object')
    })

    it('should have a number duration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.stopTimer
      expect(timer).to.have.property('duration')
      expect(timer.duration).to.be.a('number')
    })

    it('should have a number remainingDuration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.stopTimer
      expect(timer).to.have.property('remainingDuration')
      expect(timer.remainingDuration).to.be.a('number')
    })

    it('should have a number intervalDuration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.stopTimer
      expect(timer).to.have.property('intervalDuration')
      expect(timer.intervalDuration).to.be.a('number')
    })

    it('should have a boolean isRunning field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.stopTimer
      expect(timer).to.have.property('isRunning')
      expect(timer.isRunning).to.be.a('boolean')
    })

    it('should have an array timerAlerts field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.stopTimer
      expect(timer).to.have.property('timerAlerts')
      expect(timer.timerAlerts).to.be.a('array')
    })

  })

  describe('decrementTimer', () => {

    const mutation = `
      mutation DecrementTimer {
        decrementTimer(id: "1") {
          id
          user {
            id
          }
          duration
          remainingDuration
          intervalDuration
          isRunning
          timerAlerts {
            id
          }
        }
      }
    `

    it('should have a string id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.decrementTimer
      expect(timer).to.have.property('id')
      expect(timer.id).to.be.a('string')
    })

    it('should have an object user field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.decrementTimer
      expect(timer).to.have.property('user')
      expect(timer.user).to.be.an('object')
    })

    it('should have a number duration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.decrementTimer
      expect(timer).to.have.property('duration')
      expect(timer.duration).to.be.a('number')
    })

    it('should have a number remainingDuration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.decrementTimer
      expect(timer).to.have.property('remainingDuration')
      expect(timer.remainingDuration).to.be.a('number')
    })

    it('should have a number intervalDuration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.decrementTimer
      expect(timer).to.have.property('intervalDuration')
      expect(timer.intervalDuration).to.be.a('number')
    })

    it('should have a boolean isRunning field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.decrementTimer
      expect(timer).to.have.property('isRunning')
      expect(timer.isRunning).to.be.a('boolean')
    })

    it('should have an array timerAlerts field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.decrementTimer
      expect(timer).to.have.property('timerAlerts')
      expect(timer.timerAlerts).to.be.a('array')
    })

  })

  describe('resetTimer', () => {

    const mutation = `
      mutation ResetTimer {
        resetTimer(id: "1") {
          id
          user {
            id
          }
          duration
          remainingDuration
          intervalDuration
          isRunning
          timerAlerts {
            id
          }
        }
      }
    `

    it('should have a string id field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.resetTimer
      expect(timer).to.have.property('id')
      expect(timer.id).to.be.a('string')
    })

    it('should have an object user field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.resetTimer
      expect(timer).to.have.property('user')
      expect(timer.user).to.be.an('object')
    })

    it('should have a number duration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.resetTimer
      expect(timer).to.have.property('duration')
      expect(timer.duration).to.be.a('number')
    })

    it('should have a number remainingDuration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.resetTimer
      expect(timer).to.have.property('remainingDuration')
      expect(timer.remainingDuration).to.be.a('number')
    })

    it('should have a number intervalDuration field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.resetTimer
      expect(timer).to.have.property('intervalDuration')
      expect(timer.intervalDuration).to.be.a('number')
    })

    it('should have a boolean isRunning field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.resetTimer
      expect(timer).to.have.property('isRunning')
      expect(timer.isRunning).to.be.a('boolean')
    })

    it('should have an array timerAlerts field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      
      const timer = result.data.resetTimer
      expect(timer).to.have.property('timerAlerts')
      expect(timer.timerAlerts).to.be.a('array')
    })

  })

  describe('deleteTimer', () => {

    const mutation = `
      mutation DeleteTimer {
        deleteTimer(id: "1"){
          id
        }
      }
    `

    it('should not have errors', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      expect(result.errors).to.not.be.an('array')
    })

  })

})