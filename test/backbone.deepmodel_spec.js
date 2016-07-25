/* eslint-env mocha */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import DeepModel from '../lib'

chai.use(chai => {
  const Assertion = chai.Assertion
  Assertion.addMethod('asJSON', function (expected) {
    new Assertion(this._obj.toJSON()).to.deep.equal(expected)
  })
})

describe('Backbone.DeepModel', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('returns version', () => {
    expect(DeepModel.VERSION).to.match(/^\d+\.\d+\.\d+$/)
  })

  it('extends custom class by `extend` static method', () => {
    const Model = DeepModel.extend({
      initialize () {
        this.initialized = 1
      }
    }, {
      foo: 1
    })
    expect(Model.foo).to.equal(1)
    expect(Model.extend).to.be.a('function')
    expect(new Model().initialized).to.equal(1)

    const Model2 = Model.extend({
      initialize () {
        Model.prototype.initialize.call(this)
        this.initialized2 = 2
      }
    })
    expect(Model2.foo).to.equal(1)
    expect(Model2.extend).to.be.a('function')

    const model = new Model2()
    expect(model.initialized).to.equal(1)
    expect(model.initialized2).to.equal(2)
  })

  it('extends custom class by `class` syntacs', () => {
    class Model extends DeepModel {
      initialize () {
        this.initialized = 1
      }
    }
    expect(Model.extend).to.be.a('function')
    expect(new Model().initialized).to.equal(1)

    class Model2 extends Model {
      initialize () {
        super.initialize()
        this.initialized2 = 2
      }
    }
    expect(Model2.extend).to.be.a('function')

    const model2 = new Model2()
    expect(model2.initialized).to.equal(1)
    expect(model2.initialized2).to.equal(2)
  })

  it('gets attributes', () => {
    const model = new DeepModel({a: 1, b: {x: '*', y: [true, false]}})
    expect(model.get('a')).to.equal(1)
    expect(model.get('b')).to.deep.equal({x: '*', y: [true, false]})
    expect(model.get('b.x')).to.equal('*')
    expect(model.get('b.y')).to.deep.equal([true, false])
    expect(model.get('b.y[0]')).to.equal(true)
    expect(model.get('b.y.1')).to.equal(false)
    expect(model.get('b.y[2]')).to.equal(undefined)
    expect(model.get('c')).to.equal(undefined)
    expect(model.get('b.z')).to.equal(undefined)
  })

  it('sets no arguments', () => {
    const model = new DeepModel({a: 1})
    expect(model.get('a')).to.equal(1)
    expect(model.set()).to.equal(model)
  })

  it('sets simple attribute', () => {
    const model = new DeepModel()
    const change = sandbox.spy()
    const changeA = sandbox.spy()
    const changeB = sandbox.spy()
    model.on('change', change)
    model.on('change:a', changeA)
    model.on('change:b', changeB)

    const options = {dummy: true}
    model.set('a', 1)
    expect(model.get('a')).to.equal(1)

    model.set({'a': 2, 'b': '*'}, options)
    expect(model.get('a')).to.equal(2)
    expect(model.get('b')).to.equal('*')

    expect(change.callCount).to.equal(2, 'change')
    expect(change.args).to.deep.equal([
      [model, {}],
      [model, options]
    ], 'change')

    expect(changeA.callCount).to.equal(2, 'change:a')
    expect(changeA.args).to.deep.equal([
      [model, 1, {}],
      [model, 2, options]
    ], 'change:a')

    expect(changeB.callCount).to.equal(1, 'change:b')
    expect(changeB.args).to.deep.equal([
      [model, '*', options]
    ], 'change:b')
  })

  it('sets nested attribute', () => {
    const model = new DeepModel({
      a: {b: {c: null}},
      x: {y: [true]}
    })
    const change = sandbox.spy()
    const changeA = sandbox.spy()
    const changeX = sandbox.spy()
    model.on('change', change)
    model.on('change:a', changeA)
    model.on('change:x', changeX)

    const options = {dummy: true}
    model.set('a.b.c', 1, options)
    expect(model.get('a.b.c')).to.equal(1)

    model.set({'a.b.c': 2}, options)
    expect(model.get('a.b.c')).to.equal(2)

    model.set('a.b', {c: 3})
    expect(model.get('a.b.c')).to.equal(3)

    model.set('x.y[0]', false, options)
    expect(model.get('x.y[0]')).to.equal(false)
    expect(model.get('x')).to.deep.equal({y: [false]})

    model.set('x.y.1', 0, options)
    expect(model.get('x.y.1')).to.equal(0)
    expect(model.get('x')).to.deep.equal({y: [false, 0]})

    model.set({
      'a.b.c': 9,
      'x.y[0]': null,
      'x.y.1': '-'
    })
    expect(model).to.be.asJSON({
      a: {b: {c: 9}},
      x: {y: [null, '-']}
    })

    expect(change.callCount).to.equal(6, 'change')
    expect(change.args).to.deep.equal([
      [model, options],
      [model, options],
      [model, {}],
      [model, options],
      [model, options],
      [model, {}]
    ], 'change')

    expect(changeA.callCount).to.equal(4, 'change:a')
    expect(changeA.args).to.deep.equal([
      [model, {b: {c: 1}}, options],
      [model, {b: {c: 2}}, options],
      [model, {b: {c: 3}}, {}],
      [model, {b: {c: 9}}, {}]
    ], 'change:a')

    expect(changeX.callCount).to.equal(3, 'change:x')
    expect(changeX.args).to.deep.equal([
      [model, {y: [false]}, options],
      [model, {y: [false, 0]}, options],
      [model, {y: [null, '-']}, {}]
    ], 'change:x')
  })

  it('sets array element', () => {
    const model = new DeepModel()
    model.set('a', ['*'])
    expect(model).to.be.asJSON({a: ['*']})
    model.set('a[0]', '?')
    expect(model).to.be.asJSON({a: ['?']})
    model.set('a[1]', '/')
    expect(model).to.be.asJSON({a: ['?', '/']})
    model.set('a[2]', {b: false})
    expect(model).to.be.asJSON({a: ['?', '/', {b: false}]})
    model.set('a[2].b', true)
    expect(model).to.be.asJSON({a: ['?', '/', {b: true}]})
    model.set({
      'a[0]': '-',
      'a[1]': 10,
      'a[2].b': null,
      'a[3].c': [],
      'a[4]': {d: 0.1},
      'a[5][0]': false
    })
    expect(model).to.be.asJSON({a: [
      '-',
      10,
      {b: null},
      {c: []},
      {d: 0.1},
      [false]
    ]})
  })

  it('cannot set non-existent nested attribute', () => {
    expect(() => new DeepModel().set('a.b', 1)).to.throw(Error)
  })

  describe('Ajax', () => {
    class User extends DeepModel {
      urlRoot () {
        return '/users'
      }
      defaults () {
        return {
          name: {first: '', last: ''}
        }
      }
    }

    let server
    beforeEach(() => {
      server = sandbox.useFakeServer()
      server.respondImmediately = true
    })

    function respondWith (method, url, responseBody) {
      server.respondWith(method, url, [
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(responseBody)
      ])
    }

    function expectRequest (method, url, requestBody) {
      expect(server.requests).to.have.length(1)

      const request = server.requests[0]
      expect(request).to.have.property('method', method)
      expect(request).to.have.property('url', url)

      if (requestBody) {
        expect(JSON.parse(request.requestBody)).to.deep.equal(requestBody)
      }
    }

    it('fetches from server', () => {
      respondWith('GET', '/users/1', {
        id: 1, name: {first: 'John', last: 'Lennon'}
      })

      const user = new User({id: 1})
      user.fetch()
      expect(user).to.be.asJSON({
        id: 1, name: {first: 'John', last: 'Lennon'}
      })

      expectRequest('GET', '/users/1')
    })

    it('saves new model to server', () => {
      respondWith('POST', '/users', {
        id: 1,
        name: {first: 'Paul', last: 'McCartney'},
        updatedAt: '2012-05-09 03:45:21'
      })

      const user = new User()
      user.save({
        'name.first': 'John',
        'name.last': 'Lennon'
      })
      expect(user).to.be.asJSON({
        id: 1,
        name: {first: 'Paul', last: 'McCartney'},
        updatedAt: '2012-05-09 03:45:21'
      })

      expectRequest('POST', '/users', {
        name: {first: 'John', last: 'Lennon'}
      })
    })

    it('saves updated model to server', () => {
      respondWith('PUT', '/users/1', {
        id: 1,
        name: {first: 'Paul', last: 'McCartney'},
        updatedAt: '2012-05-09 03:45:21'
      })

      const user = new User({id: 1})
      user.save({
        'name.first': 'John',
        'name.last': 'Lennon'
      })
      expect(user).to.be.asJSON({
        id: 1,
        name: {first: 'Paul', last: 'McCartney'},
        updatedAt: '2012-05-09 03:45:21'
      })

      expectRequest('PUT', '/users/1', {
        id: 1, name: {first: 'John', last: 'Lennon'}
      })
    })
  })

  describe('configure', () => {
    it('configures path separator', () => {
      DeepModel.defaults({pathSeparator: '/'})

      const model = new DeepModel()
      model.set('a', {})
      expect(model).to.be.asJSON({a: {}})
      model.set('a/b', 1)
      expect(model.get('a/b')).to.equal(1)
      expect(model).to.be.asJSON({a: {b: 1}})
      model.set('a.b', 2)
      expect(model.get('a.b')).to.equal(2)
      expect(model).to.be.asJSON({a: {b: 1}, 'a.b': 2})

      DeepModel.defaults(null) // reset

      model.set('a/b', 0)
      expect(model.get('a/b')).to.equal(0)
      expect(model).to.be.asJSON({a: {b: 1}, 'a.b': 2, 'a/b': 0})
      expect(model.get('a.b')).to.equal(1)
    })

    it('configures path parser', () => {
      DeepModel.defaults({
        pathParser (path) {
          if (path === '*') {
            return [] // ignore
          }

          const sep = '_'
          if (path.indexOf(sep) === -1) {
            return [path]
          }
          if (path.charAt(0) !== sep) {
            throw new Error(`Invalid path: ${path}`)
          }
          return path.substring(1).split(sep)
        }
      })

      const model = new DeepModel()
      model.set('_a', {})
      expect(model).to.be.asJSON({a: {}})
      model.set('_a_b', 1)
      expect(model.get('_a_b')).to.equal(1)
      expect(model).to.be.asJSON({a: {b: 1}})
      model.set('a.b', 2)
      expect(model.get('a.b')).to.equal(2)
      expect(model).to.be.asJSON({a: {b: 1}, 'a.b': 2})
      model.set('*', 3)
      expect(model.get('*')).to.equal(undefined)

      DeepModel.defaults(null) // reset

      model.set('_a_b', 0)
      expect(model.get('_a_b')).to.equal(0)
      expect(model).to.be.asJSON({a: {b: 1}, 'a.b': 2, '_a_b': 0})
      expect(model.get('a.b')).to.equal(1)
    })

    afterEach(() => {
      DeepModel.defaults(null)
    })
  })
})
