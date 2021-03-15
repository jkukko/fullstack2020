
export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: notification
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, time * 1000)
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