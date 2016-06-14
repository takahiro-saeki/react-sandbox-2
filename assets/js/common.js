import React, { Component } from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import randomstring from 'randomstring';

/// actionCreators >>>
function action1(value) {
  return {
    type: 'ACTION1',
    value
  }
}

function action2(value) {
  return {
    type: 'ACTION2',
    value
  }
}

function inputText(value) {
  return {
    type: 'INPUT_TEXT',
    value
  }
}

function modal(value) {
  return {
    type: 'MODAL',
    value
  }
}

/// reducers >>>
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
    default:
    return state
  }
}

/// components >>>
const Comp1 = props => (
  <div>
    <div>This is Comp1. value is '{props.value}'.</div>
    <button onClick={() => props.action(
        randomstring.generate({
          length: 8,
          charset: 'alphabetic'
        })
      )} >doAction1</button>
    </div>
  );

  const Comp2 = props => (
    <div>
      <div>これは '{props.value}'だよ.</div>
      <button onClick={() => props.action(
          randomstring.generate({
            length: 4,
            charset: 'alphabetic'
          })
        )} >doAction1</button>
      </div>
    )

    const Comp3 = props => (
      <div>
        <button onClick={() => props.action(
            randomstring.generate({
              length: 5,
              charset: 'alphabetic'
            })
          )}>ボタン</button>
          <div>{props.value}</div>
        </div>
      )

      const Modal = props => (
        <div>
          <button
            onClick={() => props.action(false)}>
            {props.value ? 'テスト！': 'ボタン！'}
          </button>
        </div>
      )

      class RootApp extends Component {
        constructor(props) {
          super(props);
        }

        componentDidUpdate() {
          console.log(this.props)
        }

        render() {
          return (
            <div>
              <Comp1
                value={this.props.value1}
                action={this.props.action1}
                />
              <Comp2
                value={this.props.value2}
                action={this.props.action2}
                />
              <Comp3
                value={this.props.value3}
                action={this.props.inputText}
                />
              <Modal
                value={this.props.sample}
                action={this.props.modal}
                />
            </div>
          )
        }
      }

      const App = connect(
        state => {
          return {
            value1: state.v1,
            value2: state.v2,
            value3: state.v3,
            sample: state.v4
          }
        },
        dispatch => {
          return {
            action1: (v1) => dispatch(action1(v1)),
            action2: (v2) => dispatch(action2(v2)),
            inputText: (v3) => dispatch(inputText(v3)),
            modal: (v4) => dispatch(modal(v4))
          }
        }
      )(RootApp);
      const initialValues = {
        v1: 'initialvalue',
        v2: 'v2だよ',
        v3: '入力内容だよ！',
        v4: true
      };
      const store = createStore(appReducer, initialValues);

      ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById('app')
      );
