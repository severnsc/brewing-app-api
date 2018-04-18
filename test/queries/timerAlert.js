import chai from 'chai'
const expect = chai.expect

import { graphql } from 'graphql'
import schema from '../../schema'
import { addMockFunctionsToSchema } from 'graphql-tools'

addMockFunctionsToSchema({ schema })

describe('TimerAlert', () => {

  const query = `
    query TimerAlert {
      user(id: "1"){
        timers {
          timerAlerts {
            id
            timer {
              id
            }
            activationTime
            message
            activated
          }
        }
      }
    }
  `

  it('should have a string id field', async () => {
    const promise = graphql(schema, query)
    const result = await promise
    const timerAlert = result.data.user.timers[0].timerAlerts[0]
    expect(timerAlert).to.have.property('id')
    expect(timerAlert.id).to.be.a('string')
  })

  it('should have a timer field', async () => {
    const promise = graphql(schema, query)
    const result = await promise
    const timerAlert = result.data.user.timers[0].timerAlerts[0]
    expect(timerAlert).to.have.property('timer')
  })

  it('should have a number activationTime field', async () => {
    const promise = graphql(schema, query)
    const result = await promise
    const timerAlert = result.data.user.timers[0].timerAlerts[0]
    expect(timerAlert).to.have.property('activationTime')
    expect(timerAlert.activationTime).to.be.a('number')
  })

  it('should have a string message field', async () => {
    const promise = graphql(schema, query)
    const result = await promise
    const timerAlert = result.data.user.timers[0].timerAlerts[0]
    expect(timerAlert).to.have.property('message')
    expect(timerAlert.message).to.be.a('string')
  })

  it('should have a boolean activated field', async () => {
    const promise = graphql(schema, query)
    const result = await promise
    const timerAlert = result.data.user.timers[0].timerAlerts[0]
    expect(timerAlert).to.have.property('activated')
    expect(timerAlert.activated).to.be.a('boolean')
  })  

})