/*global describe it*/

var _ = require('assert');

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Mixin from '../src/Mixin';

describe('Mixin', () => {

  it('is a function', () => {
    _.notEqual(Mixin, undefined);
    _.equal(typeof Mixin, 'function');
  });

  describe('#with', () => {

    it('is exposed', () => {
      _.notEqual(Mixin.with, undefined);
      _.equal(typeof Mixin.with, 'function');
    });

    describe('assigns the method to new component', () => {
      class TestMixinComponent extends React.Component {
        render() {
          return <span>{this.message()}</span>;
        }
      }

      it('from object mixin', () => {
        var TestMixinMethod = {
          message: function() {
            return "MESSAGE";
          }
        };

        var element = React.createElement(
          Mixin(TestMixinComponent).with(TestMixinMethod),
          null, null);

        _.ok(/MESSAGE/.test(ReactDOMServer.renderToString(element)));
      });

      it('from class mixin', () => {

      });
    });
  });
});
