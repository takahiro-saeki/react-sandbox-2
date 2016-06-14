import React, {Component} from 'react';
import ThreadListItem from '../components/ThreadListItem.react';
import ThreadStore from '../stores/ThreadStore';
import UnreadThreadStore from '../stores/UnreadThreadStore';

function getStateFromStores() {
  return {
    threads: ThreadStore.getAllChrono(),
    currentThreadID: ThreadStore.getCurrentID(),
    unreadCount: UnreadThreadStore.getCount()
  };
}

export default class ThreadSection extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ThreadStore.addChangeListener(this._onChange);
    UnreadThreadStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ThreadStore.removeChangeListener(this._onChange);
    UnreadThreadStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    const threadListItems = this.state.threads.map(thread => {
      return (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          currentThreadID={this.state.currentThreadID}
          />
      );
    });
    var unread =
    this.state.unreadCount === 0 ?
    null :
    <span>Unread threads: {this.state.unreadCount}</span>;
      return (
        <div className="thread-section">
          <div className="thread-count">
            {unread}
          </div>
          <ul className="thread-list">
            {threadListItems}
          </ul>
        </div>
      );
    }
  }
