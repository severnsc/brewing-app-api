import chai from 'chai'
const expect = chai.expect

import { graphql } from 'graphql'
import schema from '../../schema'
import { addMockFunctionsToSchema } from 'graphql-tools'

addMockFunctionsToSchema({ schema })

describe('timerAlert mutations', () => {

  describe('createTimerAlert', () => {

    const mutation = `
      mutation CreateTimerAlert {
        createTimerAlert(timerId: "1", activationTime: 1000, message: "hi!") {
          id
          timer {
            id
          }
          activationTime
          message
          activated
        }
      }
    `

    it('should have a string id property', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const timerAlert = result.data.createTimerAlert
      expect(timerAlert).to.have.property('id')
      expect(timerAlert.id).to.be.a('string')
    })

    it('should have object timer field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const timerAlert = result.data.createTimerAlert
      expect(timerAlert).to.have.property('timer')
      expect(timerAlert.timer).to.be.an('object')
    })

    it('should have a number activationTime property', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const timerAlert = result.data.createTimerAlert
      expect(timerAlert).to.have.property('activationTime')
      expect(timerAlert.activationTime).to.be.a('number')
    })

    it('should have a string message property', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const timerAlert = result.data.createTimerAlert
      expect(timerAlert).to.have.property('message')
      expect(timerAlert.message).to.be.a('string')
    })

    it('should have a boolean activated property', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const timerAlert = result.data.createTimerAlert
      expect(timerAlert).to.have.property('activated')
      expect(timerAlert.activated).to.be.a('boolean')
    })

  })

  describe('updateTimerAlert', () => {

    const mutation = `
      mutation UpdateTimerAlert {
        updateTimerAlert(id: "1", timerId: "1", activationTime: 1000, message: "hi!") {
          id
          timer {
            id
          }
          activationTime
          message
          activated
        }
      }
    `

    it('should have a string id property', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const timerAlert = result.data.updateTimerAlert
      expect(timerAlert).to.have.property('id')
      expect(timerAlert.id).to.be.a('string')
    })

    it('should have object timer field', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const timerAlert = result.data.updateTimerAlert
      expect(timerAlert).to.have.property('timer')
      expect(timerAlert.timer).to.be.an('object')
    })

    it('should have a number activationTime property', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const timerAlert = result.data.updateTimerAlert
      expect(timerAlert).to.have.property('activationTime')
      expect(timerAlert.activationTime).to.be.a('number')
    })

    it('should have a string message property', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const timerAlert = result.data.updateTimerAlert
      expect(timerAlert).to.have.property('message')
      expect(timerAlert.message).to.be.a('string')
    })

    it('should have a boolean activated property', async () => {
      const promise = graphql(schema, mutation)
      const result = await promise
      const timerAlert = result.data.updateTimerAlert
      expect(timerAlert).to.have.property('activated')
      expect(timerAlert.activated).to.be.a('boolean')
    })


  })

})