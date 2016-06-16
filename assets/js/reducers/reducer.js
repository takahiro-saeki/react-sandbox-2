//import { combineReducers } from 'redux';

function appReducer(state, action) {
  switch (action.type) {
    case 'ACTION1':
    return Object.assign({}, state, { v1: action.value });
    case 'ACTION2':
    return Object.assign({}, state, { v2: action.value });
    case 'INPUT_TEXT':
    return Object.assign({}, state, { v3: action.value });
    case 'MODAL':
    return Object.assign({}, state, { v4: action.value });
    case 'INC':
    return Object.assign({}, state, { v5: action.hoge });
    default:
    return state
  }
}

export default appReducer;
