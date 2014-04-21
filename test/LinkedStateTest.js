/*jshint asi:true*/

var React = require('react/addons')
var TestHelper = require('./Helper')
var LinkedStateMixin = require('../src/catalyst/LinkedStateMixin')

describe('LinkedStateMixin', function() {
  it('is defined', function() {
    expect(LinkedStateMixin).toBeDefined()
  })

  it('exposes the #linkState method', function() {
    var linkMethod = LinkedStateMixin.linkState

    expect(linkMethod).toBeDefined()
    expect(typeof linkMethod).toBe('function')
  })

  describe('works as expected', function() {
    var path = 'nested.items.0'
    var oldValue = "new value", newValue = "new value"
    var initialState = { nested: { items: [oldValue] } }

    var component = TestHelper.mock({
      mixins: [LinkedStateMixin],
      getInitialState: function() {
        return initialState
      },
      render: function() {
        return React.DOM.input({
          valueLink: this.linkState(path)
        })
      }
    })
    var input = TestHelper.findTag(component, 'input')

    it('creates required methods for LinkedState', function() {
      var link = component.linkState(path)

      expect(link.requestChange).toBeDefined()
      expect(typeof link.requestChange).toBe('function')

      expect(link.value).toBe(oldValue)
      link.requestChange(newValue)
      expect(link.value).toBe(newValue)
    })

    it('update value according to state', function() {
      component.setState(initialState)
      expect(input.getDOMNode().value).toBe(oldValue)
    })

    it('update state according to value', function() {
      component.setState(initialState)
      TestHelper.simulate(input, 'change', { value: newValue })
      expect(component.state.nested.items[0]).toBe(newValue)
    })
  })
})
