
var registry = {};
var SUBSCRIPTIONS = '__subscriptions';

var Registry = {};

var MessageBus = {
  publish: function(channel, data) {
    if (Registry[channel]) {
      Registry[channel].forEach(function(subscriber) {
        subscriber[SUBSCRIPTIONS][channel].call(subscriber, data);
      });
    }
  },

  subscribe: function(component, channel, callback) {
    // TODO: guard from multiple subscribe
    if (!Registry[channel]) Registry[channel] = [];
    Registry[channel].push(component);

    if (!component[SUBSCRIPTIONS]) component[SUBSCRIPTIONS] = {};
    component[SUBSCRIPTIONS][channel] = callback;
  },

  unsubscribe: function(component, channel) {
    if (Registry[channel]) {
      var nth = Registry[channel].indexOf(component);
      if (nth > -1) Registry[channel].splice(nth, 1);
      delete component[SUBSCRIPTIONS][channel];
    }
  }
};

module.exports = {
  publish: MessageBus.publish.bind(Registry),
  subscribe: function(channel, callback) {
    MessageBus.subscribe(this, channel, callback);
  },
  unsubscribe: function(channel) {
    MessageBus.unsubscribe(this, channel);
  },
  componentWillUnmount: function() {
    Object.keys(this[SUBSCRIPTIONS]).forEach(this.unsubscribe);
  }
};
