import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import array from './array';
import promise from './promise';
import whitelist from './whitelist';

const persistConfig = {
  timeout: 90000,
  whitelist,
  key: 'root',
  storage
};

const middlewares = [createLogger()];


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(...middlewares, ...[thunk, promise, array]),
);

export const persistor = persistStore(store, {}, () => {

});