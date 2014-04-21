/*jshint asi:true*/

var React = require('react/addons')
var TestUtils = React.addons.TestUtils

exports.mock = function(spec) {
  return TestUtils.renderIntoDocument(React.createClass(spec)())
}

exports.findTag = function(component, tag) {
  return TestUtils.findRenderedDOMComponentWithTag(component, tag)
}

exports.simulate = function(component, event, args) {
  TestUtils.Simulate[event](component, args)
}
