import React from 'react';

export const Modal = props => (
  <div>
    <button
      onClick={() => props.action(false)}>
      {props.value ? 'テスト！': 'ボタン！'}
    </button>
  </div>
)
