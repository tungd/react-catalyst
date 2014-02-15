/**
 * Catalyst.LinkedStateMixin
 *
 * LinkedState for Facebook's React UI, with support for
 * deep path state access.
 *
 * Author: Tung Dao <me@tungdao.com>
 *
 * Usage:
 *
 * var WithLink = React.createClass({
 *   mixins: [Catalyst.LinkedStateMixin],
 *   getInitialState: function() {
 *     return { values: [{ text: 'Hello!' }] };
 *   },
 *   render: function() {
 *     return <input type="text" valueLink={this.linkState('values.0.text')} />;
 *   }
 * });
 */

window.Catalyst = window.Catalyst || {};

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Catalyst.LinkedStateMixin = factory();
  }
}(this, function () {
  "use strict";

  function getIn(object, path) {
    var stack = path.split('.');
    while (stack.length > 1) {
      object = object[stack.shift()];
    }
    return object[stack.shift()];
  }

  function updateIn(object, path, value) {
    var current = object, stack = path.split('.');
    while (stack.length > 1) {
      current = current[stack.shift()];
    }
    current[stack.shift()] = value;
    return object;
  }

  function setPartialState(component, path, value) {
    component.setState(
      updateIn(component.state, path, value));
  }

  return {
    linkState: function(path) {
      return {
        value: getIn(this.state, path),
        requestChange: setPartialState.bind(null, this, path)
      }
    }
  }
}));
