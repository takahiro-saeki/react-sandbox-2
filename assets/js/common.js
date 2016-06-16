import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './reducers/reducer';
import App from './container/App';

const tests = {
  v1: 'test',
  v2: 'sample',
  v3: 'hey',
  v4: true,
  v5: 0
}

const store = createStore(appReducer, tests);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
