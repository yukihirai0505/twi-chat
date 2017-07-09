import {combineReducers} from "redux"
import {reducer as formReducer} from 'redux-form'
import {userReducer} from './modules/User'

export default combineReducers({
  form: formReducer,
  user: userReducer,
})
