import React from 'react';
import randomstring from 'randomstring';

export const Comp3 = props => (
  <div>
    <button onClick={() => props.action(
        randomstring.generate({
          length: 5,
          charset: 'alphabetic'
        })
      )}>ボタン</button>
      <div>{props.value}</div>
    </div>
  )
