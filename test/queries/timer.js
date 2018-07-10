import chai from 'chai'
const expect = chai.expect

import { graphql } from 'graphql'
import schema from '../../schema'
import { addMockFunctionsToSchema } from 'graphql-tools'

addMockFunctionsToSchema({ schema })

describe('Timer', () => {

  const query = `
    query Timer {
      user(id: "1"){
        timers {
          id
          user {
            id
          }
          name
          duration
          remainingDuration
          intervalDuration
          isRunning
          timerAlerts {
            id
          }
        }
      }
    }
  `

  it('should have string property id', async () => {
    const result = await graphql(schema, query)
    const timer = result.data.user.timers[0]
    expect(timer).to.have.property('id')
    expect(timer.id).to.be.a('string')
  })

  it('should have a user property', async () => {
    const result = await graphql(schema, query)
    const timer = result.data.user.timers[0]
    expect(timer).to.have.property('user')  
  })

  it('should have a string property name', async () => {
    const result = await graphql(schema, query)
    const timer = result.data.user.timers[0]
    expect(timer).to.have.property('name')
    expect(timer.name).to.be.a('string')
  })

  it('should have number property duration', async () => {
    const result = await graphql(schema, query)
    const timer = result.data.user.timers[0]
    expect(timer).to.have.property('duration')
    expect(timer.duration).to.be.a('number')
  })

  it('should have number property remainingDuration', async () => {
    const result = await graphql(schema, query)
    const timer = result.data.user.timers[0]
    expect(timer).to.have.property('remainingDuration')
    expect(timer.remainingDuration).to.be.a('number')
  })

  it('should have number property intervalDuration', async () => {
    const result = await graphql(schema, query)
    const timer = result.data.user.timers[0]
    expect(timer).to.have.property('intervalDuration')
    expect(timer.intervalDuration).to.be.a('number')
  })

  it('should have boolean property isRunning', async () => {
    const result = await graphql(schema, query)
    const timer = result.data.user.timers[0]
    expect(timer).to.have.property('isRunning')
    expect(timer.isRunning).to.be.a('boolean')
  })

  it('should have an array timerAlerts property', async () => {
    const result = await graphql(schema, query)
    const timer = result.data.user.timers[0]
    expect(timer).to.have.property('timerAlerts')  
    expect(timer.timerAlerts).to.be.an('array')
  })

})