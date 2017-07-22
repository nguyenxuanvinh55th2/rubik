import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux'

import { client } from '../apollo-client.js';

import users from './users.js'
import notification from './notification.js'
import header from './header.js'
const rootReducer = combineReducers({
  users,
  notification,
  header,
  routing: routerReducer,
  apollo: client.reducer(),
})

export default rootReducer;
