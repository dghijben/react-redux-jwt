import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import usersReducer from './admin/users/userReducer';
import aclReducer from './admin/acl/aclReducer';
import { reducer as formReducer } from 'redux-form';
import { routerStateReducer } from 'redux-router';

export default combineReducers({
  router: routerStateReducer,
  authorization: authReducer,
  users: usersReducer,
  form: formReducer,
  acl: aclReducer
});
