
# React Catalyst

Collection of helpers developed for React.

## LinkedStateMixin

Alternate to `React.addons.LinkedStateMixin`, with support for deep path-based state access.

Example:

```js
var WithLink = React.createClass({
  mixins: [Catalyst.LinkedStateMixin],
  getInitialState: function() {
    return { values: [{ text: 'Hello!' }] };
  },
  render: function() {
    return <input type="text" valueLink={this.linkState('values.0.text')} />;
  }
})
```

## MessageBusMixin

Global MessageBus for components.

Quote from [Communicate Between Components](http://facebook.github.io/react/tips/communicate-between-components.html)

> For communication between two components that don't have a parent-child
> relationship, you can set up your own global event system. Subscribe to events
> in componentDidMount(), unsubscribe in componentWillUnmount(), and when you
> receive an event, call setState().

This mixin provide three methods:

### publish(channel, data)

Publish an message to a given channel, with the associated data.

### subscribe(channel, callback)

Subscribe to a channel, `callback` gets called when a message arrive in the
channel.

### subscribeState(channel, key)

Convenient wrapper to `subscribe/setState` combo.

All the listener callbacks are automagically unsubscribed when component
unmount.

```js
var WithMessageBus = React.createClass({
  mixins: [Catalyst.MessageBusMixin],
  componentDidMount: function() {
    this.subscribe("customChannel", function(data) {
      ...
    });
    this.subscribeState("otherChannel", "value")
  },
  ...
})
```

## AJAXMixin

## TODO

- Build script for individual/all module custom builds
- Build script for module wrapper (UMD, doing this manually now)