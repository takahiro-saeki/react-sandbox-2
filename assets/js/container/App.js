import React, {Component} from 'react';
import { connect } from 'react-redux';
import { action1, action2, inputText, modal, inc } from '../actions/actionCreater';
import { Comp1 } from '../components/Comp1';
import { Comp2 } from '../components/Comp2';
import { Comp3 } from '../components/Comp3';
import { Modal } from '../components/Modal';
import { Inc } from '../components/Inc';

class RootApp extends Component {
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
        <Inc
          hoge={this.props.inc}
          action={this.props.incs}
          />
      </div>
    )
  }
}

const stateStore = state => {
  return {
    value1: state.v1,
    value2: state.v2,
    value3: state.v3,
    sample: state.v4,
    inc: state.v5
  }
}

const dispatchStore = dispatch => {
  return {
    action1: v1 => dispatch(action1(v1)),
    action2: v2 => dispatch(action2(v2)),
    inputText: v3 => dispatch(inputText(v3)),
    modal: v4 => dispatch(modal(v4)),
    incs: v5 => dispatch(inc(v5))
  }
}

const App = connect(
  stateStore,
  dispatchStore
)(RootApp);

export default App;
