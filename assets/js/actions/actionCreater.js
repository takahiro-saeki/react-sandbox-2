export const action1 = value => {
  return {
    type: 'ACTION1',
    value
  }
}

export const action2 = value => {
  return {
    type: 'ACTION2',
    value
  }
}

export const inputText = value => {
  return {
    type: 'INPUT_TEXT',
    value
  }
}

export const modal = value => {
  return {
    type: 'MODAL',
    value
  }
}

export const inc = hoge => {
  hoge++
  return {
    type: 'INC',
    hoge
  }
}
