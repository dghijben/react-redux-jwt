import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { usersReducer } from './users';
import { reducer as formReducer } from 'redux-form';
import { routerStateReducer } from 'redux-router';

export default combineReducers({
  router: routerStateReducer,
  authorization: authReducer,
  users: usersReducer,
  form: formReducer
});
