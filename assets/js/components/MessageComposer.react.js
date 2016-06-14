import React, {Component} from 'react';
import ChatMessageActionCreators from '../actions/ChatMessageActionCreators';
const ENTER_KEY_CODE = 13;

export default class MessageComposer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  static propTypes = {
    threadID: React.PropTypes.string.isRequired
  }

  _onChange(event, value) {
    this.setState({text: event.target.value});
  }

  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      let text = this.state.text.trim();
      if (text) {
        ChatMessageActionCreators.createMessage(text, this.props.threadID);
      }
      this.setState({text: ''});
    }
  }

  render() {
    return (
      <textarea
        className="message-composer"
        name="message"
        value={this.state.text}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
    )
  }
}
