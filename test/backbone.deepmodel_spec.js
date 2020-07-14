import assert from 'assert'
import sinon from 'sinon'
import DeepModel from '../lib'

describe('Backbone.DeepModel', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('returns version', () => {
    assert(/^(\d+\.\d+\.\d+).*$/.test(DeepModel.VERSION))
  })

  it('extends custom class by `extend` static method', () => {
    const Model = DeepModel.extend(
      {
        initialize() {
          this.initialized = 1
        },
      },
      {
        foo: 1,
      }
    )
    assert(Model.foo === 1)
    assert(typeof Model.extend === 'function')
    assert(new Model().initialized === 1)

    const Model2 = Model.extend({
      initialize() {
        Model.prototype.initialize.call(this)
        this.initialized2 = 2
      },
    })
    assert(Model2.foo === 1)
    assert(typeof Model2.extend === 'function')

    const model = new Model2()
    assert(model.initialized === 1)
    assert(model.initialized2 === 2)
  })

  it('extends custom class by `class` syntacs', () => {
    class Model extends DeepModel {
      initialize() {
        this.initialized = 1
      }
    }
    assert(typeof Model.extend === 'function')
    assert(new Model().initialized === 1)

    class Model2 extends Model {
      initialize() {
        super.initialize()
        this.initialized2 = 2
      }
    }
    assert(typeof Model2.extend === 'function')

    const model2 = new Model2()
    assert(model2.initialized === 1)
    assert(model2.initialized2 === 2)
  })

  it('gets attributes', () => {
    const model = new DeepModel({ a: 1, b: { x: '*', y: [true, false] } })
    assert(model.get('a') === 1)
    assert.deepStrictEqual(model.get('b'), { x: '*', y: [true, false] })
    assert(model.get('b.x') === '*')
    assert.deepStrictEqual(model.get('b.y'), [true, false])
    assert(model.get('b.y[0]') === true)
    assert(model.get('b.y.1') === false)
    assert(model.get('b.y[2]') === undefined)
    assert(model.get('c') === undefined)
    assert(model.get('b.z') === undefined)
  })

  it('sets no arguments', () => {
    const model = new DeepModel({ a: 1 })
    assert(model.get('a') === 1)
    assert(model.set() === model)
  })

  it('sets simple attribute', () => {
    const model = new DeepModel()
    const change = sandbox.spy()
    const changeA = sandbox.spy()
    const changeB = sandbox.spy()
    model.on('change', change)
    model.on('change:a', changeA)
    model.on('change:b', changeB)

    const options = { dummy: true }
    model.set('a', 1)
    assert(model.get('a') === 1)

    model.set({ a: 2, b: '*' }, options)
    assert(model.get('a') === 2)
    assert(model.get('b') === '*')

    assert(change.callCount === 2)
    assert.deepStrictEqual(change.args, [
      [model, {}],
      [model, options],
    ])

    assert(changeA.callCount === 2)
    assert.deepStrictEqual(changeA.args, [
      [model, 1, {}],
      [model, 2, options],
    ])

    assert(changeB.callCount === 1)
    assert.deepStrictEqual(changeB.args, [[model, '*', options]])
  })

  it('sets nested attribute', () => {
    const model = new DeepModel({
      a: { b: { c: null } },
      x: { y: [true] },
    })
    const change = sandbox.spy()
    const changeA = sandbox.spy()
    const changeX = sandbox.spy()
    model.on('change', change)
    model.on('change:a', changeA)
    model.on('change:x', changeX)

    const options = { dummy: true }
    model.set('a.b.c', 1, options)
    assert(model.get('a.b.c') === 1)

    model.set({ 'a.b.c': 2 }, options)
    assert(model.get('a.b.c') === 2)

    model.set('a.b', { c: 3 })
    assert(model.get('a.b.c') === 3)

    model.set('x.y[0]', false, options)
    assert(model.get('x.y[0]') === false)
    assert.deepStrictEqual(model.get('x'), { y: [false] })

    model.set('x.y.1', 0, options)
    assert(model.get('x.y.1') === 0)
    assert.deepStrictEqual(model.get('x'), { y: [false, 0] })

    model.set({
      'a.b.c': 9,
      'x.y[0]': null,
      'x.y.1': '-',
    })
    assert.deepStrictEqual(model.toJSON(), {
      a: { b: { c: 9 } },
      x: { y: [null, '-'] },
    })

    assert(change.callCount === 6)
    assert.deepStrictEqual(change.args, [
      [model, options],
      [model, options],
      [model, {}],
      [model, options],
      [model, options],
      [model, {}],
    ])

    assert(changeA.callCount === 4)
    assert.deepStrictEqual(changeA.args, [
      [model, { b: { c: 1 } }, options],
      [model, { b: { c: 2 } }, options],
      [model, { b: { c: 3 } }, {}],
      [model, { b: { c: 9 } }, {}],
    ])

    assert(changeX.callCount === 3)
    assert.deepStrictEqual(changeX.args, [
      [model, { y: [false] }, options],
      [model, { y: [false, 0] }, options],
      [model, { y: [null, '-'] }, {}],
    ])
  })

  it('sets array element', () => {
    const model = new DeepModel()
    model.set('a', ['*'])
    assert.deepStrictEqual(model.toJSON(), { a: ['*'] })
    model.set('a[0]', '?')
    assert.deepStrictEqual(model.toJSON(), { a: ['?'] })
    model.set('a[1]', '/')
    assert.deepStrictEqual(model.toJSON(), { a: ['?', '/'] })
    model.set('a[2]', { b: false })
    assert.deepStrictEqual(model.toJSON(), { a: ['?', '/', { b: false }] })
    model.set('a[2].b', true)
    assert.deepStrictEqual(model.toJSON(), { a: ['?', '/', { b: true }] })
    model.set({
      'a[0]': '-',
      'a[1]': 10,
      'a[2].b': null,
      'a[3].c': [],
      'a[4]': { d: 0.1 },
      'a[5][0]': false,
    })
    assert.deepStrictEqual(model.toJSON(), {
      a: ['-', 10, { b: null }, { c: [] }, { d: 0.1 }, [false]],
    })
  })

  it('cannot set non-existent nested attribute', () => {
    assert.throws(() => new DeepModel().set('a.b', 1))
  })

  describe('Ajax', () => {
    class User extends DeepModel {
      // eslint-disable-next-line class-methods-use-this
      urlRoot() {
        return '/users'
      }

      // eslint-disable-next-line class-methods-use-this
      defaults() {
        return {
          name: { first: '', last: '' },
        }
      }
    }

    let server
    beforeEach(() => {
      server = sandbox.useFakeServer()
      server.respondImmediately = true
    })

    function respondWith(method, url, responseBody) {
      server.respondWith(method, url, [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(responseBody),
      ])
    }

    function assertRequest(method, url, requestBody) {
      assert(server.requests.length === 1)

      const request = server.requests[0]
      assert(request.method === method)
      assert(request.url === url)

      if (requestBody) {
        assert.deepStrictEqual(JSON.parse(request.requestBody), requestBody)
      }
    }

    it('fetches from server', () => {
      respondWith('GET', '/users/1', {
        id: 1,
        name: { first: 'John', last: 'Lennon' },
      })

      const user = new User({ id: 1 })
      user.fetch()
      assert.deepStrictEqual(user.toJSON(), {
        id: 1,
        name: { first: 'John', last: 'Lennon' },
      })

      assertRequest('GET', '/users/1')
    })

    it('saves new model to server', () => {
      respondWith('POST', '/users', {
        id: 1,
        name: { first: 'Paul', last: 'McCartney' },
        updatedAt: '2012-05-09 03:45:21',
      })

      const user = new User()
      user.save({
        'name.first': 'John',
        'name.last': 'Lennon',
      })
      assert(user.toJSON(), {
        id: 1,
        name: { first: 'Paul', last: 'McCartney' },
        updatedAt: '2012-05-09 03:45:21',
      })

      assertRequest('POST', '/users', {
        name: { first: 'John', last: 'Lennon' },
      })
    })

    it('saves updated model to server', () => {
      respondWith('PUT', '/users/1', {
        id: 1,
        name: { first: 'Paul', last: 'McCartney' },
        updatedAt: '2012-05-09 03:45:21',
      })

      const user = new User({ id: 1 })
      user.save({
        'name.first': 'John',
        'name.last': 'Lennon',
      })
      assert.deepStrictEqual(user.toJSON(), {
        id: 1,
        name: { first: 'Paul', last: 'McCartney' },
        updatedAt: '2012-05-09 03:45:21',
      })

      assertRequest('PUT', '/users/1', {
        id: 1,
        name: { first: 'John', last: 'Lennon' },
      })
    })
  })

  describe('configure', () => {
    it('configures path separator', () => {
      DeepModel.defaults({ pathSeparator: '/' })

      const model = new DeepModel()
      model.set('a', {})
      assert.deepStrictEqual(model.toJSON(), { a: {} })
      model.set('a/b', 1)
      assert(model.get('a/b') === 1)
      assert.deepStrictEqual(model.toJSON(), { a: { b: 1 } })
      model.set('a.b', 2)
      assert(model.get('a.b') === 2)
      assert.deepStrictEqual(model.toJSON(), { a: { b: 1 }, 'a.b': 2 })

      DeepModel.defaults(null) // reset

      model.set('a/b', 0)
      assert(model.get('a/b') === 0)
      assert.deepStrictEqual(model.toJSON(), {
        a: { b: 1 },
        'a.b': 2,
        'a/b': 0,
      })
      assert(model.get('a.b') === 1)
    })

    it('configures path parser', () => {
      DeepModel.defaults({
        pathParser(path) {
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
        },
      })

      const model = new DeepModel()
      model.set('_a', {})
      assert.deepStrictEqual(model.toJSON(), { a: {} })
      model.set('_a_b', 1)
      assert(model.get('_a_b') === 1)
      assert.deepStrictEqual(model.toJSON(), { a: { b: 1 } })
      model.set('a.b', 2)
      assert(model.get('a.b') === 2)
      assert.deepStrictEqual(model.toJSON(), { a: { b: 1 }, 'a.b': 2 })
      model.set('*', 3)
      assert(model.get('*') === undefined)

      DeepModel.defaults(null) // reset

      model.set('_a_b', 0)
      assert(model.get('_a_b') === 0)
      assert.deepStrictEqual(model.toJSON(), { a: { b: 1 }, 'a.b': 2, _a_b: 0 })
      assert(model.get('a.b') === 1)
    })

    it('does nothing when passing no arguments', () => {
      const { pathParser } = DeepModel.defaults({ pathSeparator: '_' })
      assert.deepStrictEqual(DeepModel.defaults(), {
        pathSeparator: '_',
        pathParser,
      })
    })

    afterEach(() => {
      DeepModel.defaults(null)
    })
  })
})
