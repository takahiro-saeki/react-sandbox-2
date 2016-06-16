import React from 'react';
import randomstring from 'randomstring';

export const Comp2 = props => (
  <div>
    <div>これは '{props.value}'だよ.</div>
    <button onClick={() => props.action(
        randomstring.generate({
          length: 4,
          charset: 'alphabetic'
        })
      )} >doAction1</button>
    </div>
  )
