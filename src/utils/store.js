import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducer';

const reducer = combineReducers(reducers);
export const store = createStore(reducer, applyMiddleware(thunk));

