import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import usersReducer from './admin/users/userReducer';
import aclReducer from './admin/acl/aclReducer';
import { reducer as formReducer } from 'redux-form';
import { routerStateReducer } from 'redux-router';
import reduxFormReducer from './reduxForm/reducer';
import reduxRouterReducer from './reduxRouter/reducer';

export default combineReducers({
  router: routerStateReducer,
  authorization: authReducer,
  users: usersReducer,
  form: formReducer.plugin(reduxFormReducer),
  acl: aclReducer,
  reduxRouterReducer: reduxRouterReducer
});
