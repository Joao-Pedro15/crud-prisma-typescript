import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import rewire from 'rewire'
import request from 'supertest'
import sinon from 'sinon'
import userController from './controllers/userController'

const sandbox = sinon.createSandbox()
let app = rewire('./index')

describe('Testing routes from express', () => {

  afterEach(() => {
    sandbox.restore()
  })

  describe('/users routes', () => {
    let mock : any = {
      username: 'joao pedro',
      password: 'minhasenha'
    }

    beforeEach(() => {
      sandbox.stub(userController, 'addUser').resolves(mock)
    })

  })

  

})