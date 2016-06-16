export default function todos(state = [], action) {
  switch (action.type) {
    case 'BTN_1':
      return Object.assign({}, state, action)
    default:
      return state
  }
}
