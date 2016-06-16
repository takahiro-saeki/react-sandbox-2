import React from 'react';
import randomstring from 'randomstring';

export const Comp1 = props => (
  <div>{console.log(props)}
    <div>This is Comp1. value is '{props.value}'.</div>
    <button onClick={() => props.action(
        randomstring.generate({
          length: 8,
          charset: 'alphabetic'
        })
      )} >doAction1</button>
    </div>
  );
