import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import usersReducer from './admin/users/reducer';
import affiliatesSitesReducer from './admin/affiliates/sites/reducer';
import affiliatesCategoriesReducer from './admin/affiliates/categories/reducer';
import aclRolesReducer from './admin/acl/roles/reducer';
import { reducer as formReducer } from 'redux-form';
import { routerStateReducer } from 'redux-router';
import reduxFormReducer from './reduxForm/reducer';
import reduxRouterReducer from './reduxRouter/reducer';

export default combineReducers({
  router: routerStateReducer,
  authorization: authReducer,
  users: usersReducer,
  affiliatesSites: affiliatesSitesReducer,
  affiliatesCategories: affiliatesCategoriesReducer,
  form: formReducer.plugin(reduxFormReducer),
  aclRoles: aclRolesReducer,
  reduxRouterReducer: reduxRouterReducer
});
