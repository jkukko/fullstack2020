import loginService from '../services/login'
import storage from '../utils/storage'

export const loginUser = ({ username, password }) => {
  return async dispatch => {
    const loggedUser = await loginService.login({username, password})
    storage.saveUser(loggedUser)
    dispatch({
      type: 'USER_LOGIN',
      data: { loggedUser }
    })
  }
}

export const loggoutUser = () => {
  return async dispatch => {
    storage.logoutUser()
    dispatch({
      type: 'USER_LOGOUT'
    })
  }
}

export const setUser2 = () => {
  return async dispatch => {
    const loggedUser = storage.loadUser()
    dispatch({
      type: 'SET_USER',
      data: { loggedUser }
    })
  }
}

const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.data.loggedUser
    case 'USER_LOGOUT':
      return null
    case 'SET_USER':
      return action.data.loggedUser
    default:
      return state
  }
}

export default userReducer