export const setNotification = (notification) => {
  return {
    type: 'NOTIFICATION',
    data: notification
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.data
    case 'RESET':
      return initialState
    default:
      return state
    }
}

export default reducer