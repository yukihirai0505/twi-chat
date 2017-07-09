import {api as API} from 'Config'
import {CALL_API} from '../middlewares/ApiClient'
import UserRecord from '../records/User'

// Action types
export const REQUEST_USER_GET = 'REQUEST_USER_GET'
export const SUCCESS_USER_GET = 'SUCCESS_USER_GET'
export const FAILED_USER_GET = 'FAILED_USER_GET'

export const REQUEST_USER_CREATE = 'REQUEST_USER_CREATE'
export const SUCCESS_USER_CREATE = 'SUCCESS_USER_CREATE'
export const FAILED_USER_CREATE = 'FAILED_USER_CREATE'

export const SHOW_PASSWORD = 'SHOW_PASSWORD'

// Action
export const getUsers = () => {
  return {
    [CALL_API]: {
      api: API.user.getUsers,
      requestTypes: [REQUEST_USER_GET],
      successTypes: [SUCCESS_USER_GET],
      failedTypes: [FAILED_USER_GET]
    }
  }
}

export const createUser = (data) => {
  return {
    [CALL_API]: {
      api: API.user.createUser,
      requestTypes: [REQUEST_USER_CREATE],
      successTypes: [SUCCESS_USER_CREATE],
      failedTypes: [FAILED_USER_CREATE],
      body: data
    }
  }
}

export const showPassword = (data) => {
  return {
    type: SHOW_PASSWORD,
    data: data
  }
}


// Reducer
export const userReducer = (state = new UserRecord(), action) => {
  const {type} = action
  switch (type) {
    case SUCCESS_USER_GET:
      return state.getUser(action.response)
    case SHOW_PASSWORD:
      return state.showPassword(action.data)
    default:
      return state
  }
}
