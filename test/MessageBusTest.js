/*jshint asi:true*/

var React = require('react/addons')
var DOM = React.DOM
var TestHelper = require('./Helper')
var MessageBusMixin = require('../src/catalyst/MessageBusMixin')

describe('MessageBusMixin', function() {
  it('is defined', function() {
    expect(MessageBusMixin).toBeDefined()
  })

  describe('#publish', function() {
    it('is defined', function() {
      var publishMethod = MessageBusMixin.publish

      expect(publishMethod).toBeDefined()
      expect(typeof publishMethod).toBe('function')
    })
  })


  describe('#subscribe', function() {
    it('is defined', function() {
      var subscribeMethod = MessageBusMixin.subscribe

      expect(subscribeMethod).toBeDefined()
      expect(typeof subscribeMethod).toBe('function')
    })
  })

  describe('#unsubscribe', function() {
    it('is defined', function() {
      var unsubscribeMethod = MessageBusMixin.unsubscribe

      expect(unsubscribeMethod).toBeDefined()
      expect(typeof unsubscribeMethod).toBe('function')
    })

    it('unsubscribe form the channel', function() {
      var subscriber = TestHelper.mock({
        mixins: [MessageBusMixin],
        componentDidMount: function() {
          this.subscribe('test', function(data) {})
        },
        render: function() { return DOM.span(null, "Hello, World!") }
      })

      expect(subscriber.__subscriptions.test).toBeDefined()
      subscriber.unsubscribe('test')
      expect(subscriber.__subscriptions.test).toBeUndefined()
    })
  })

  describe('works as expected', function() {
    // Include this redundant component because I'am not sure about the use of
    // `this` in the original mixin object
    var other = TestHelper.mock({
      mixins: [MessageBusMixin],
      render: function() {
        return DOM.span(null, "Hello, World!")
      }
    })

    var publisher = TestHelper.mock({
      mixins: [MessageBusMixin],
      render: function() {
        return DOM.span(null, "Hello, World!")
      }
    })

    var subscriber = TestHelper.mock({
      mixins: [MessageBusMixin],
      getInitialState: function() {
        return { data: null }
      },
      componentDidMount: function() {
        this.subscribe('test', function(data) {
          this.setState({ data: data })
        })
      },
      render: function() {
        return DOM.span(null, "Hello, World!")
      }
    })

    it('updates subscriber with published value', function() {
      var value = 'Hello, World!'
      publisher.publish('test', value)
      expect(subscriber.state.data).toEqual(value)
      expect(other.__subscriptions).toBeUndefined()
    })

    it('unsubscribe on unmount', function() {
      var parent = subscriber.getDOMNode().parentNode
      var unmounted = React.unmountComponentAtNode(parent)

      expect(unmounted).toBe(true)
      expect(subscriber.__subscriptions.test).toBeUndefined()
    })
  })
})
