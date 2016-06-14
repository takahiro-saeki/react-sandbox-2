import React, {Component} from 'react';
import MessageSection from './MessageSection.react';
import ThreadSection from './ThreadSection.react';

export default class ChatApp extends Component {
  render() {
    return (
      <div className="chatapp">
        <ThreadSection />
        <MessageSection />
      </div>
    )
  }
}
