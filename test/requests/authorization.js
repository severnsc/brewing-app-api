import chai from 'chai'
const expect = chai.expect
import app from '../../app'
import fetch from 'node-fetch'
require('dotenv').config()

describe.only('authorization flow', () => {

  let server

  before(() => {
    server = app.listen(3000, () => {
      console.log("Listening on port 3000!")
    })
  })

  after(() => {
    server.close()
  })

  const url = `http://localhost:${process.env.PORT}`

  it('should load graphiql with status code 200', async () => {
    const response = await fetch(url + '/graphiql')
    expect(response.status).to.equal(200)
  })

  describe('when user is not logged in', () => {

    it('should send a 401 status code when trying to query /graphql', async () => {
      const response = await fetch(url + '/graphql?query={user(id:"1"){id}}')
      expect(response.status).to.equal(401)
    })
  
  })

  describe('when user is logged in', () => {

    let response
    let user

    const data = JSON.stringify({
        username: "test user",
        password: "password"
      })

      before(done => {
        fetch(url + '/login', {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          done()  
        }).catch(e => done(e))
      })

    it('should send a 200 status when trying to query /graphql', async () => {
      const response = await fetch(url + '/graphql?query={user(id:"1"){id}}')
      expect(response.status).to.equal(200)
    })

  })

  describe('logging in', () => {

    describe("when posting good credentials to /login", () => {

      let response
      let user

      const data = JSON.stringify({
        username: "test user",
        password: "password"
      })

      before(done => {
        fetch(url + '/login', {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          response = res
          res.json().then(json => {
            user = json
            done()
          })
        })
      })

      it('should send 200 status code when posting good credentials to /login', async () => {
        expect(response.status).to.equal(200)
      })

      it('should send user object on response object after posting good credentials', async () => {
        expect(user).to.be.an('object')
      })

      it('should send user with username equal to userName on req body', async () => {
        expect(user.userName).to.equal("test user")
      })

    })

    describe("when posting bad credentials to /login", () => {

      let response

      before(done => {
        const data = JSON.stringify({
          username: "bad name",
          password: "bad password"
        })
        fetch(url + '/login', {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          response = res
          done()
        })
      })


      it('should send 400 status code', async () => {
        expect(response.status).to.equal(400)
      })

      it('should send error message', async () => {
        const message = await response.json()
        expect(message).to.equal("Invalid username or password")
      })

    })

  })

})