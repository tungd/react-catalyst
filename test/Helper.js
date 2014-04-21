/*jshint asi:true*/

var React = require('react/addons')
var TestUtils = React.addons.TestUtils

exports.mountedComponent = function(spec) {
  return TestUtils.renderIntoDocument(
    React.createClass(spec)())
}
