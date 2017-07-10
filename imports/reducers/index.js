import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux'

import { client } from '../apollo-client.js';

import users from './users.js'
import notification from './notification.js'
const rootReducer = combineReducers({
  users,
  notification,
  routing: routerReducer,
  apollo: client.reducer(),
})

export default rootReducer;
