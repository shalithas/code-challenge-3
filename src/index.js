import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import './styles/_main.scss';
import { store, persistor } from "store";

ReactDOM.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <CoreLayout>
          <Routes />
        </CoreLayout>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
  document.getElementById('root')
);
