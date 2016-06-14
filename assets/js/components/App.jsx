import React, {Component} from 'react';
import todoApp from '../reducers/index';
import { changeText, changeColor, showAlert } from '../actions';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      text: 'デフォルト',
      class: '',
      flag: false
    }
    this.create = this.create.bind(this);
  }
  create() {
    console.log(todoApp(changeText(), this.state))
    return todoApp('', 'CHANGE_TEXT')
  }
  render() {
    return (
      <main>
        <h2 onClick={this.create}>テスト</h2>
        <ul>
          <li>ボタン1</li>
          <li>ボタン2</li>
          <li>ボタン3</li>
        </ul>
        <p>テキスト</p>
      </main>
    )
  }
}
