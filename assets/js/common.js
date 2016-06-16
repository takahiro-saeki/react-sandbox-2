import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './reducers/reducer';
import App from './container/App';

const initialValues = {
  v1: 'initialvalue',
  v2: 'v2だよ',
  v3: '入力内容',
  v4: true,
  v5: 5
};

const store = createStore(appReducer, initialValues);
//console.log(appReducer.state)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
