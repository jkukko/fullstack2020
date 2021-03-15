export const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    content: content
  }
}

const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.content
    default:
      return state
  }
}

export default reducer