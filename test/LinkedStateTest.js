
var DOM = React.DOM

describe('Catalyst', function() {
  describe('LinkedStateMixin', function() {
    it('is defined', function() {
      expect(Catalyst.LinkedStateMixin).toBeDefined()
    })

    it('exposes the #linkState method', function() {
      var linkMethod = Catalyst.LinkedStateMixin.linkState

      expect(linkMethod).toBeDefined()
      expect(typeof linkMethod).toBe('function')
    })

    it('works as expected', function() {
      // This is too verbose
      var link, oldValue = "new value", newValue = "new value"

      var component = React.createClass({
        mixins: [Catalyst.LinkedStateMixin],
        getInitialState: function() {
          return { nested: { items: [oldValue] } }
        },
        render: function() {
          return DOM.h1(null, "Hello, World!")
        }
      })()

      React.renderComponent(component, document.createElement('div'))

      link = component.linkState('nested.items.0')

      expect(link.requestChange).toBeDefined()
      expect(typeof link.requestChange).toBe('function')

      expect(link.value).toBe(oldValue)
      link.requestChange(newValue)
      expect(link.value).toBe(newValue)
    })
  })
})
