import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import thunkMiddleware from 'redux-thunk'
import './styles/_main.scss';
import { createLogger } from 'redux-logger';
import reducers from './reducers/songs';

const loggerMiddleware = createLogger();

let store = createStore(reducers, applyMiddleware( thunkMiddleware, loggerMiddleware ))

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <CoreLayout>
        <Routes />
      </CoreLayout>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
