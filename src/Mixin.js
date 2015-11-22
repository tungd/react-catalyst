
let Mixin = (type) => {
  type.with = Mixin.with.bind(null, type);
  return type;
};

Mixin.with = (base, ...mixins) => {
  mixins.forEach((mixin) => {
    // console.log(typeof mixin);
    // console.log(Object.getOwnPropertyNames(mixin));

    if (typeof mixin === 'object') {
      Object.getOwnPropertyNames(mixin).forEach((method) => {
        base.prototype[method] = mixin[method];
      });
    }

  });

  return base;
};

export default Mixin;
