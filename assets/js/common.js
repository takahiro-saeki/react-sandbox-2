import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './container/App'
import todoApp from './reducers'
import {defaultData, defaultStatus} from './defaults';

const defaultState = {
  defaultData
};
let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
