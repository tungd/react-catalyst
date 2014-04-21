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

  it('works as expected', function() {
    // This is too verbose
    var link, oldValue = "new value", newValue = "new value"

    var component = TestHelper.mountedComponent({
      mixins: [LinkedStateMixin],
      getInitialState: function() {
        return { nested: { items: [oldValue] } }
      },
      render: function() {
        return React.DOM.h1(null, "Hello, World!")
      }
    })

    link = component.linkState('nested.items.0')

    expect(link.requestChange).toBeDefined()
    expect(typeof link.requestChange).toBe('function')

    expect(link.value).toBe(oldValue)
    link.requestChange(newValue)
    expect(link.value).toBe(newValue)
  })
})
