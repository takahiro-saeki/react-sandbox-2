import React, {Component} from 'react';
import classNames from 'classnames';
import ChatThreadActionCreators from '../actions/ChatThreadActionCreators';

export default class ThreadListItem extends Component {
  _onClick() {
    ChatThreadActionCreators.clickThread(this.props.thread.id);
  }

  render() {
    var thread = this.props.thread;
    var lastMessage = thread.lastMessage;
    return (
      <li
        className={classNames({
          'thread-list-item': true,
          'active': thread.id === this.props.currentThreadID
        })}
        onClick={this._onClick}>
        <h5 className="thread-name">{thread.name}</h5>
        <div className="thread-time">
          {lastMessage.date.toLocaleTimeString()}
        </div>
        <div className="thread-last-message">
          {lastMessage.text}
        </div>
      </li>
    )
  }
}
