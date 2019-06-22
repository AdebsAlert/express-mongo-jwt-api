/* eslint-disable no-undef */
'use strict'

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../src/index').app
// eslint-disable-next-line no-unused-vars
const should = chai.should()

chai.use(chaiHttp)

describe('Testing Users', () => {
  it('It should return HTTP OK for api call', (done) => {
    chai
      .request(app)
      .get('/api/v1/status')
      .end((err, res) => {
        if (err) {}
        res.should.have.status(200)
        done()
      })
  })

  it('It should return HTTP NOTFOUND', (done) => {
    chai
      .request(app)
      .get('/something/not/exists')
      .end((err, res) => {
        if (err) {}
        res.should.have.status(404)
        done()
      })
  })
})
