let timeoutID
export const setNotification = (notification, time , isError) => {
  window.clearTimeout(timeoutID)
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: [notification, isError]
    })

    timeoutID = window.setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, time * 1000)
  }
}

const initialState = null

const reducer = (state = initialState, action, isError) => {
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