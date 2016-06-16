import React, { Component } from 'react';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  clickBtn() {
    console.log(store.dispatch(btn('test')))
    store.dispatch(btn('test'))
  }

  render() {
    return (
      <main>
        <button onClick={this.clickBtn}>ボタン</button>
      </main>
    )
  }
}
