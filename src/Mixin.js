
let Mixin = (type) => {
  type.with = Mixin.with.bind(null, type);
  return type;
};

Mixin.with = (base, ...mixins) => {
  mixins.forEach((mixin) => {
    // Babel compiles ES6 classes into constructor function
    if (typeof mixin === 'function' && mixin.hasOwnProperty('prototype')) {
      mixin = mixin.prototype;
    }

    if (typeof mixin === 'object') {
      Object.getOwnPropertyNames(mixin).forEach((method) => {
        base.prototype[method] = mixin[method];
      });
    }
  });

  return base;
};

export default Mixin;
