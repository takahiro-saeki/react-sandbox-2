import React from 'react';
import randomstring from 'randomstring';

export const Inc = props => (
  <div>
    <button onClick={() => props.action(props.hoge)}>ボタン</button>
      <div>{props.hoge}</div>
    </div>
  )
