import loadScript from './load-script';

const needs = 'Object.assign,Promise,fetch';
const polyfillURL = `//cdn.polyfill.io/v2/polyfill.min.js?features=${needs}`;

export default (callback = () => {}) => {
  if (
    'fetch' in window &&
    'Promise' in window &&
    'assign' in Object
  ) {
    callback();
  } else {
    loadScript(polyfillURL, callback);
  }
};