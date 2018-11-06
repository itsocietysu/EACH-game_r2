import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducers from '../reducers';

const middlewares = [thunk];
const enhancer = composeWithDevTools({
    // Options: https://github.com/jhen0409/react-native-debugger#options
})(applyMiddleware(...middlewares));

export default function configureStore(initialState) {
    const store = createStore(reducers, initialState, enhancer);
    if (module.hot) {
        module.hot.accept(() => {
            store.replaceReducer(require('./../reducers').default);
        });
    }
    return store;
}

/* const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk, logger),
  )
);

export default store;*/
