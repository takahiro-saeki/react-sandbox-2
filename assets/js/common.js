import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {EventEmitter} from 'events';
import {Dispatcher} from 'flux';
import assign from 'object-assign';

const testDispatcher = new Dispatcher();
const CHANGE_EVENT = "change";
const testConstants = {
  TEST: "test"
};

class DisTest extends Dispatcher {
  test() {
    this.dispatch({
      actionType: 'actionTest',
      value: 'valueTest',
    })
  }
}
const distest = new DisTest()

//dispatcher test
class DispatcherClass extends Dispatcher {
  constructor() {
    super()
    this.handleViewAction('view')
    this.handleServerAction('server')
  }

  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action,
    });
  }

  handleServerAction(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action,
    });
  }

  test(test) {
    console.log(test)
    this.dispatch({
      test: test
    })
  }
}

const AppDispatcher = new DispatcherClass();
console.log(AppDispatcher.test('testです'))

var dispatcher = new Dispatcher({
  logLevel: 'ALL'
});
class Actions {
  navigate(newRoute) {
    dispatcher.dispatch('NAVIGATE', { location: newRoute });
  }
}
console.log(new Actions().navigate('test'))

let TestAction = {
  test: testValue => {
    testDispatcher.dispatch({
      actionType: testConstants.TEST,
      value: testValue
    });
  }
};

class TestStore extends EventEmitter {
  constructor() {
    super();
    this._test = {value: null}
  }
  getAll() {
    return this._test
  }
  emitChange() {
    this.emit(CHANGE_EVENT)
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }
  dispatcherIndex() {
    testDispatcher.register(payload => {
      if (payload.actionType === testConstants.TEST) {
        this._test.value = payload.value;
        TestStore.emitChange();
      }
    })
  }
}

TestStore = new TestStore()

class TestApp extends Component {
  constructor(props) {
    super(props);
    this.state = TestStore.getAll()
  }

  componentDidMount() {
    TestStore.addChangeListener(() => this.setState(TestStore.getAll()));
  }

  render() {
    return (
      <div className="testApp">
        <TestForm />
        <TestDisplay data={this.state.value} />
      </div>
    )
  }
}

class TestForm extends Component {
  constructor(props) {
    super(props);
    this.send = this.send.bind(this);
  }

  send(e) {
    e.preventDefault();
    let testValue = ReactDOM.findDOMNode(this.refs.test_value).value.trim();
    TestAction.test(testValue);
    ReactDOM.findDOMNode(this.refs.test_value).value = "";
    return;
  }

  render() {
    return (
      <form>
        <input type="text" ref="test_value" />
        <button onClick={this.send}>送信</button>
      </form>
    )
  }
}

class TestDisplay extends Component {
  render() {
    var message = this.props.data;
    return (
      <div>{message}</div>
    )
  }
}

ReactDOM.render(
  <TestApp />,
  document.getElementById("app")
);
