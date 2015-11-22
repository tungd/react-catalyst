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

    describe('assigns mixed-in method to the component', () => {
      it('from mixin object', () => {
        var MixinObject = {
          message: function() {
            return "MESSAGE";
          }
        };

        class TestMixinComponent extends React.Component {
          render() {
            return <span>{this.message()}</span>;
          }
        }

        var element = React.createElement(
          Mixin(TestMixinComponent).with(MixinObject),
          null, null);

        _.ok(/MESSAGE/.test(ReactDOMServer.renderToString(element)));
      });

      it('from mixin class', () => {
        class MixinClass {
          message() {
            return "MESSAGE";
          }
        };

        class TestMixinComponent extends React.Component {
          render() {
            return <span>{this.message()}</span>;
          }
        }

        var element = React.createElement(
          Mixin(TestMixinComponent).with(MixinClass),
          null, null);

        console.log(ReactDOMServer.renderToString(element));
        _.ok(/MESSAGE/.test(ReactDOMServer.renderToString(element)));
      });
    });
  });
});
