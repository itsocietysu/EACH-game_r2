import Expo from 'expo';

if(!global._babelPolyfill) { require('babel-polyfill'); }
Expo.registerRootComponent(require('./src/App').default);
