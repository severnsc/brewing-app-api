const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const core = require('../../lib')

describe('createTimerAlert use case', () => {

  let createTimerAlertCalled = false
  let createdTimerAlert = "timerAlert"
  
  const createTimerAlert = timerAlert => {
    createTimerAlertCalled = true
    createdTimerAlert = timerAlert
  }

  const timerAlertFactory = core.createTimerAlertUseCase(createTimerAlert)
  const timerAlert = timerAlertFactory("1", 1000, "test")

  describe('happy path', () => {

    it('should call createTimer injected dependency', () => {
      createTimerAlertCalled.should.equal(true)
    })

    it('should pass createdTimer to createTimer', () => {
      createdTimerAlert.should.be.an('object')
    })

    it('should return function after createTimer is injected', () => {
      timerAlertFactory.should.be.a('function')
    })

    it('should return an object', () => {
      timerAlert.should.be.an('object')
    })

    it('should have string id', () => {
      timerAlert.should.have.property("id")
      timerAlert.id.should.be.a("string")
    }) 

    it('should generate unique string ids', () => {
      otherTimerAlert = timerAlertFactory("1", 1000, "test2")
      otherTimerAlert.id.should.not.equal(timerAlert.id)
    })

    it('should have a string timerId', () => {
      timerAlert.should.have.property('timerId')
      timerAlert.timerId.should.be.a('string')
    })

    it('should have timerId equal to given arg', () => {
      const otherTimerAlert = timerAlertFactory("2", 1000, "test")
      otherTimerAlert.timerId.should.equal("2")
    })

    it('should have a number activationTime prop', () => {
      timerAlert.should.have.property("activationTime")
      timerAlert.activationTime.should.be.a('number')
    })

    it('should have an activationTime equal to second arg', () => {
      const otherTimerAlert = timerAlertFactory("1", 1000, "message")
      otherTimerAlert.activationTime.should.equal(1000)
    })

    it('should have a string message prop', () => {
      timerAlert.should.have.property('message')
      timerAlert.message.should.be.a('string')
    })

    it('should have message equal to third arg', () => {
      const otherTimerAlert = timerAlertFactory("1", 1000, "test")
      otherTimerAlert.message.should.equal("test")
    })

    it('should have bool activated prop', () => {
      timerAlert.should.have.property('activated')
      timerAlert.activated.should.be.a('boolean')
    })

    it('should have activated prop equal false', () => {
      timerAlert.activated.should.equal(false)
    })
  
  })

  describe("error path", () => {

    describe("when first arg is of wrong type", () => {
      it('should trow a type error', () => {
        expect(() => timerAlertFactory(1, 1000, "test")).to.throw(TypeError)
      })
    })

    describe("when second arg is of wrong type", () => {
      it('should trow a type error', () => {
        expect(() => timerAlertFactory("1", "1000", "test")).to.throw(TypeError)
      })
    })

    describe("when third arg is of wrong type", () => {
      it('should trow a type error', () => {
        expect(() => timerAlertFactory("1", 1000, 1)).to.throw(TypeError)
      })
    })

    describe("when injected dependency is not a func", () => {
      it('should throw a type error', () => {
        expect(() => core.createTimerAlertUseCase("createTimerAlert")("1", 1000, "test")).to.throw(TypeError)
      })
    })

    describe('when injected createTimerAlert throws an error', () => {
      it('should throw an error', () => {
        createTimerAlertError = () => {throw new Error}
        expect(core.createTimerAlertUseCase(createTimerAlertError)).to.throw()
      })
    })

  })
})

describe('getTimerAlert use case', () => {

  let findTimerAlertByIdCalled = false
  let findTimerAlertByIdArg = ""

  const testTimerAlert = {
    id: "1",
    name: "timerAlert",
    message: "hello",
    activated: false,
    activationTime: 0,
    timerId: "0"
  }
  
  const findTimerAlertById = timerAlertId => {
    findTimerAlertByIdCalled = true
    findTimerAlertByIdArg = timerAlertId
    return testTimerAlert
  }

  const timerAlertId = "1"
  const timerAlert = core.getTimerAlertUseCase(findTimerAlertById)(timerAlertId)

  describe('happy path', () => {

    it('should return a function after passing findTimerAlertById', () => {
      core.getTimerAlertUseCase(findTimerAlertById).should.be.a('function')
    })

    it('should call findTimerAlertById', () => {
      findTimerAlertByIdCalled.should.equal(true)
    })

    it('should pass timerAlertId arg to findTimerAlertById', () => {
      findTimerAlertByIdArg.should.equal(timerAlertId)
    })

    it('should return timerAlert with matching id', () => {
      timerAlert.should.deep.equal(testTimerAlert)
    })

  })

  describe('error path', () => {

    describe('when findTimerAlertById is not a func', () => {
      it('should throw a type error', () => {
        expect(() => core.getTimerAlertUseCase("findTimerAlertById")).to.throw(TypeError)
      })
    })

    describe('when timerAlertId is not of type string', () => {
      it('should throw a type error', () => {
        expect(() => core.getTimerAlertUseCase(findTimerAlertById)(1)).to.throw(TypeError)
      })
    })

    describe('when findTimerAlertById fails', () => {
      it('should throw an error', () => {
        const badFindTimerAlertById = () => {throw new Error}
        expect(() => core.getTimerAlertUseCase(badFindTimerAlertById)(timerAlertId)).to.throw()
      })
    })

  })

})

describe('getTimerAlertsByTimerId use case', () => {

  let timerExistsCalled = false
  let timerExistsArg = ""
  
  const timerExists = timerId => {
    timerExistsCalled = true
    timerExistsArg = timerId
    return true
  }
  
  let findTimerAlertsByTimerIdCalled = false
  let findTimerAlertsByTimerIdArg = ""

  const testTimerAlerts = [
    {
      id: "1",
      name: "timerAlert",
      message: "hello",
      activated: false,
      activationTime: 0,
      timerId: "0" 
    },
    {
      id: "2",
      name: "timerAlert",
      message: "hello",
      activated: false,
      activationTime: 0,
      timerId: "0" 
    }
  ]

  const findTimerAlertsByTimerId = timerId => {
    findTimerAlertsByTimerIdCalled = true
    findTimerAlertsByTimerIdArg = timerId
    return testTimerAlerts
  }

  const timerId = "1"
  const timerAlerts = core.getTimerAlertsByTimerIdUseCase(timerExists)(findTimerAlertsByTimerId)(timerId)

  describe('happy path', () => {

    it('should return a function after passing timerExists', () => {
      core.getTimerAlertsByTimerIdUseCase(timerExists).should.be.a('function')
    })

    it('should return a function after passing findTimerAlertsByTimerId', () => {
      core.getTimerAlertsByTimerIdUseCase(timerExists)(findTimerAlertsByTimerId).should.be.a('function')
    })

    it('should call timerExists', () => {
      timerExistsCalled.should.equal(true)
    })

    it('should pass timerId arg to timerExists', () => {
      timerExistsArg.should.equal(timerId)
    })

    it('should return empty array if timerExists returns false', () => {
      const timerExistsFalse = () => false
      const blankArray = core.getTimerAlertsByTimerIdUseCase(timerExistsFalse)(findTimerAlertsByTimerId)(timerId)  
      blankArray.should.be.an('array')
      blankArray.length.should.equal(0)
    })

    describe('if timerExists returns true', () => {
      
      it('should call findTimerAlertsByTimerId', () => {
        findTimerAlertsByTimerIdCalled.should.equal(true)
      })

      it('should pass timerId arg to findTimerAlertsByTimerId', () => {
        findTimerAlertsByTimerIdArg.should.equal(timerId)
      })

      it('should return timerAlerts', () => {
        timerAlerts.should.deep.equal(testTimerAlerts)
      })

    })

  })

  describe('error path', () => {

    describe('when timerExists is not a func', () => {
      it('should throw a type error', () => {
        expect(() => core.getTimerAlertsByTimerIdUseCase("timerExists")).to.throw(TypeError)
      })
    })

    describe('when findTimerAlertsByTimerId is not a func', () => {
      it('should throw a type error', () => {
        expect(() => core.getTimerAlertsByTimerIdUseCase(timerExists)("findTimerAlertsByTimerId")).to.throw(TypeError)
      })
    })

    describe('when timerId is not of type string', () => {
      it('should throw a type error', () => {
        expect(() => core.getTimerAlertsByTimerIdUseCase(timerExists)(findTimerAlertsByTimerId)(1)).to.throw(TypeError)
      })
    })

    describe('when timerExists fails', () => {
      it('should throw an error', () => {
        const badTimerExists = () => {throw new Error}
        expect(() => core.getTimerAlertsByTimerIdUseCase(badTimerExists)(findTimerAlertsByTimerId)(timerId)).to.throw()
      })
    })

    describe('when findTimerAlertsByTimerId fails', () => {
      it("should throw an error", () => {
        const badFindTimerAlertsByTimerId = () => {throw new Error}
        expect(() => core.getTimerAlertsByTimerIdUseCase(timerExists)(badFindTimerAlertsByTimerId)(timerId)).to.throw()
      })
    })

    describe('when timerAlerts is not of type array', () => {
      it('should throw a type error', () => {
        const badFindTimerAlertsByTimerId = () => ({})
        expect(() => core.getTimerAlertsByTimerIdUseCase(timerExists)(badFindTimerAlertsByTimerId)(timerId)).to.throw(TypeError)
      })
    })

  })

})

describe('updateTimerAlert use case', () => {

  let getTimerAlertByIdCalled = false
  let getTimerAlertId = 0
  let saveTimerCalled = false
  let savedTimerAlert = {}

  const dummyTimerAlert = {
    id: "1",
    name: "timerAlert",
    message: "hello",
    activated: false,
    activationTime: 0,
    timerId: "0"
  }

  const getTimerAlertById = timerAlertId => {
    getTimerAlertByIdCalled = true
    getTimerAlertId = timerAlertId
    return dummyTimerAlert
  }

  const saveTimerAlert = timerAlert => {
    saveTimerCalled = true
    savedTimerAlert = timerAlert
  }

  describe('happy path', () => {

    const updateTimerAlert = core.updateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)
    const updatedTimerAlert = updateTimerAlert("1", {message: "new message", activationTime: 20, timerId: "blargh"})

    it('should call getTimerAlertById injected dependency', () => {
      getTimerAlertByIdCalled.should.equal(true)
    })

    it('should call getTimerAlertById with passed timerId', () => {
      getTimerAlertId.should.equal("1")
    })

    it('should call saveTimer injected dependency', () => {
      saveTimerCalled.should.equal(true)
    })

    it('should pass updatedTimerAlert to saveTimer', () => {
      savedTimerAlert.should.equal(updatedTimerAlert)
    })

    it('should return new timerAlert with fields updated to match args', () => {
      updatedTimerAlert.message.should.equal("new message")
      updatedTimerAlert.activationTime.should.equal(20)
      updatedTimerAlert.timerId.should.equal("blargh")
      dummyTimerAlert.should.deep.equal({id: "1",name: "timerAlert",message: "hello",activated: false, activationTime: 0,timerId: "0"})
    })

  })

  describe('error path', () => {

    describe('when getTimerAlertById dependency is not a func', () => {
      it('should throw a type error', () => {
        expect(() => core.updateTimerAlertUseCase("getTimerAlertById")(saveTimerAlert)("1", {message: "new message", activationTime: 20, timerId: "blargh"})).to.throw(TypeError)
      })
    })

    describe('when saveTimerAlert dependency is not a func', () => {
      it('should throw a type error', () => {
        expect(() => core.updateTimerAlertUseCase(getTimerAlertById)("saveTimerAlert")("1", {message: "new message", activationTime: 20, timerId: "blargh"})).to.throw(TypeError)
      })
    })

    describe('when first arg is of wrong type', () => {
      it('should throw a type error', () => {
        expect(() => core.updateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)(1, {message: "new message", activationTime: 20, timerId: "blargh"})).to.throw(TypeError)
      })
    })

    describe('when second arg is of wrong type', () => {
      
      describe('not an array or object', () => {
        it('should throw a type error', () => {
          expect(() => core.updateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)("1", "new message")).to.throw(TypeError)
        })
      })

      describe('when array', () => {
        it('should throw a type error', () => {
          expect(() => core.updateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)("1", ["new message"])).to.throw(TypeError)
        })
      })

    })

    describe('when attempting to update props that dont currently exist', () => {
      it('should throw an error', () => {
        expect(() => core.updateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)("1", {foo: "bar"})).to.throw()
      })
    })

    describe('when attempting to update props with wrong types', () => {
      it('should throw a type error', () => {
        expect(() => core.updateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)("1", {message: 1})).to.throw(TypeError)
        expect(() => core.updateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)("1", {message: true})).to.throw(TypeError)
        expect(() => core.updateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)("1", {message: "hello",activationTime: 0,timerId: 1})).to.throw(TypeError)
      })
    })

    describe('when attempting to update id prop', () => {
      it('should throw an error', () => {
        expect(() => core.updateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)("1", {id: "2"})).to.throw()
      })
    })

    describe('when attempting to update activated prop', () => {
      it('should throw an error', () => {
        expect(() => core.updateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)("1", {activated: true})).to.throw()
      })
    })

    describe('when attempting to update both id and activated', () => {
      it('should throw an error', () => {
        expect(() => core.updateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)("1", {id: "2", activated: true})).to.throw()
      })
    })

    describe('when getTimerAlertById throws error', () => {
      it('should throw error', () => {
        const getTimerAlertByIdError = () => {throw new Error}
        expect(() => core.updateTimerAlertUseCase(getTimerAlertByIdError)(saveTimerAlert)("1", {message: "hello"})).to.throw()
      })
    })

    describe('when getTimerAlertById returns nothing', () => {
      it('should throw an error', () => {
        const getTimerAlertByIdNull = () => {}
        expect(() => core.updateTimerAlertUseCase(getTimerAlertByIdNull)(saveTimerAlert)("1", {message: "hello"})).to.throw()
      })
    })

    describe('when saveTimerAlert throws an error', () => {
      it('should throw an error', () => {
        const saveTimerAlertError = () => {throw new Error}
        expect(() => core.updateTimerAlertUseCase(getTimerAlertById)(saveTimerAlertError)("1", {message: "hello"})).to.throw()
      })
    })

  })

})

describe("activateTimerAlert use case", () => {

  let getTimerAlertByIdCalled = false
  let getTimerAlertId = 0
  let saveTimerCalled = false
  let savedTimerAlert = {}
  let sendMessageCalled = false
  let sentMessage = ""

  const dummyTimerAlert = {
    id: "1",
    name: "timerAlert",
    message: "hello",
    activated: false
  }

  const getTimerAlertById = timerAlertId => {
    getTimerAlertByIdCalled = true
    getTimerAlertId = timerAlertId
    return dummyTimerAlert
  }

  const saveTimerAlert = timerAlert => {
    saveTimerCalled = true
    savedTimerAlert = timerAlert
  }

  const sendMessage = message => {
    sendMessageCalled = true
    sentMessage = message
  }

  describe('happy path', () => {

    const activateTimerAlert = core.activateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)(sendMessage)
    const activatedTimerAlert = activateTimerAlert("1")

    it('should call getTimerAlertId injected dependency', () => {
      getTimerAlertByIdCalled.should.equal(true)
    })

    it('should call getTimerAlertById with passed timerId', () => {
      getTimerAlertId.should.equal("1")
    })

    it('should call saveTimerAlert injected dependency', () => {
      saveTimerCalled.should.equal(true)
    })

    it('should pass activatedTimerAlert to saveTimer', () => {
      savedTimerAlert.should.equal(activatedTimerAlert)
    })

    it('should call send message injected dependency', () => {
      sendMessageCalled.should.equal(true)
    })

    it('should pass message to send message', () => {
      sentMessage.should.equal(activatedTimerAlert.message)
    })

    it('should return new timerAlert with activated true', () => {
      activatedTimerAlert.activated.should.equal(true)
      activatedTimerAlert.should.not.equal(dummyTimerAlert)
      dummyTimerAlert.should.deep.equal({id: "1",name: "timerAlert",message: "hello",activated: false})
    })

  })

  describe('error path', () => {
    describe('when injected dependencies arent funcs', () => {
      it('should throw a type error', () => {
        expect(core.activateTimerAlertUseCase("getTimerAlertById")(saveTimerAlert)(sendMessage)).to.throw(TypeError)
        expect(core.activateTimerAlertUseCase(getTimerAlertById)("saveTimerAlert")(sendMessage)).to.throw(TypeError)
        expect(core.activateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)("sendMessage")).to.throw(TypeError)
      })
    })

    describe('if timerAlertId is wrong type', () => {

      const activateTimerAlert = core.activateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)(sendMessage)

      it('should throw a type error', () => {
        expect(() => activateTimerAlert(1)).to.throw(TypeError)
      })
    })

    describe('when getTimerAlertById throws error', () => {
      it('should throw error', () => {
        const getTimerAlertByIdError = () => {throw new Error}
        expect(() => core.activateTimerAlertUseCase(getTimerAlertByIdError)(saveTimerAlert)(sendMessage)("1").to.throw())
      })
    })

    describe('when getTimerAlertById returns nothing', () => {
      it('should throw an error', () => {
        const getTimerAlertByIdNull = () => {}
        expect(() => core.activateTimerAlertUseCase(getTimerAlertByIdNull)(saveTimerAlert)(sendMessage)("1").to.throw())
      })
    })

    describe('when saveTimerAlert throws an error', () => {
      it('should throw an error', () => {
        const saveTimerAlertError = () => {throw new Error}
        expect(() => core.activateTimerAlertUseCase(getTimerAlertById)(saveTimerAlertError)(sendMessage)("1")).to.throw()
      })
    })

    describe('when sendMessage throws an error', () => {
      it('should throw an error', () => {
        const sendMessageError = () => {throw new Error}
        expect(() => core.activateTimerAlertUseCase(getTimerAlertById)(saveTimerAlert)(sendMessageError)("1")).to.throw()
      })
    })

  })
})

describe('delete timerAlert use case', () => {

  let deleteTimerAlertCalled = false
  let deleteTimerAlertId = ""

  const _deleteTimerAlert = timerAlertId => {
    deleteTimerAlertCalled = true
    deleteTimerAlertId = timerAlertId
  }

  describe('happy path', () => {

    const id = "1"
    core.deleteTimerAlertUseCase(_deleteTimerAlert)(id)

    it('should call deleteTimerAlert injected dependency', () => {
      deleteTimerAlertCalled.should.equal(true)
    })

    it('should pass timerId to deleteFunc', () => {
      deleteTimerAlertId.should.equal(id)
    })

  })

  describe('error path', () => {

    describe('when deleteFunc dependency is not a func', () => {
      it('should throw a type error', () => {
        expect(core.deleteTimerAlertUseCase("deleteFunc")).to.throw(TypeError)
      })
    })

    describe('when deleteFunc throws an error', () => {
      it('should throw an error', () => {
        const deleteFuncError = () => {throw new Error}
        expect(core.deleteTimerAlertUseCase(deleteFuncError)).to.throw()
      })
    })

    describe('when timerAlertId is of wrong type', () => {
      it('should throw a type error', () => {
        expect(() => core.deleteTimerAlertUseCase(_deleteTimerAlert)(1)).to.throw(TypeError)
      })
    })

  })
})