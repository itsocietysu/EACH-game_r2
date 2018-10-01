import Expo from 'expo';
import App from './src/App';

if(!global._babelPolyfill) { require('babel-polyfill'); }
Expo.registerRootComponent(require('./src/App').default);
