export const changeText = () => {
  return {
    type: 'CHANGE_TEXT',
    text: 'テキストだよ',
    class: ''
  }
}

export const changeColor = () => {
  return {
    type: 'CHANGE_COLOR',
    text: '',
    class: 'changeClass'
  }
}

export const showAlert = () => {
  return {
    type: 'SHOW_ALERT',
    text: '',
    class: ''
  }
}
