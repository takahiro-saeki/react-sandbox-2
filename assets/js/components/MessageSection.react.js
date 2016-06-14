import React, {Component} from 'react';
import MessageComposer from './MessageComposer.react';
import MessageListItem from './MessageListItem.react';
import MessageStore from '../stores/MessageStore';
import ThreadStore from '../stores/ThreadStore';

function getStateFromStores() {
  return {
    messages: MessageStore.getAllForCurrentThread(),
    thread: ThreadStore.getCurrent()
  };
}

function getMessageListItem(message) {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  );
}

export default class MessageSection extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    this._scrollToBottom();
    MessageStore.addChangeListener(this._onChange);
    ThreadStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
    ThreadStore.removeChangeListener(this._onChange);
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom() {
    var ul = this.refs.messageList;
    ul.scrollTop = ul.scrollHeight;
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    var messageListItems = this.state.messages.map(getMessageListItem);
    return (
      <div className="message-section">
        <h3 className="message-thread-heading">{this.state.thread.name}</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>
        <MessageComposer threadID={this.state.thread.id}/>
      </div>
    )
  }
}
