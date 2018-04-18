import chai from 'chai'
const expect = chai.expect

import { graphql } from 'graphql'
import schema from '../../schema'
import { addMockFunctionsToSchema } from 'graphql-tools'

addMockFunctionsToSchema({ schema })

describe('User', () => {
  const query = `
    query User {
      user(id:"1"){
        id
        userName
      }
    }
  `
  
  it('should have a string id field', async () => {
    const promise = graphql(schema, query)
    const result = await promise
    const user = result.data.user
    expect(user).to.have.property('id')
    expect(user.id).to.be.a('string')
  })

  it('should have a string userName field', async () => {
    const promise = graphql(schema, query)
    const result = await promise
    const user = result.data.user
    expect(user).to.have.property('userName')
    expect(user.userName).to.be.a('string')
  })

})