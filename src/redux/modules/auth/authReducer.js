import _ from 'lodash';
import * as actions from './authConstants';

const initialState = {
  'token': null,
  'loggedIn': false
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    case actions.AUTH_SET_TOKEN:
      return Object.assign({}, state, {token: action.token, loggedIn: true, success: true});
    case actions.LOGIN:
      return Object.assign({}, state, {token: null, loggedIn: false, pending: true, failed: false, success: false});
    case actions.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.result.token,
        loggedIn: true,
        pending: false,
        failed: false,
        success: true
      });
    case actions.LOGIN_FAIL:
      return Object.assign({}, state, {token: null, loggedIn: false, pending: false, failed: true});
    case actions.USERINFO:
      return Object.assign({}, state, {user: {pending: true}});
    case actions.USERINFO_SUCCSS: {

      const result = action.result.user;
      return Object.assign({}, state, {user: {...result, pending: false, success: true}});
    }
    case actions.USERINFO_FAIL:
      return Object.assign({}, state, {loggedIn: false, user: {pending: false, failed: true}});
    case actions.AUTH_LOGOUT:
      return Object.assign({}, {token: null, loggedIn: false});

    case actions.PASSWORD:
      return Object.assign({}, state, {password: {pending: true}});
    case actions.PASSWORD_SUCCESS:
      return Object.assign({}, state, {password: {pending: false, success: true}});
    case actions.PASSWORD_FAIL:
      return Object.assign({}, state, {password: {pending: false, failed: true}});

    case actions.PASSWORD_CHANGE:
      return Object.assign({}, state, {passwordChange: {pending: true}});
    case actions.PASSWORD_CHANGE_SUCCESS:
      return Object.assign({}, state, {passwordChange: {pending: false, success: true}});
    case actions.PASSWORD_CHANGE_FAIL:
      return Object.assign({}, state, {passwordChange: {msg: action.result, pending: false, failed: true}});
    case actions.SET_ACCOUNT_AFFILIATES_SUCCESS: {
      const accountIndex = _.findIndex(state.user.accounts, 'id', _.get(action, ['result', 'id']));
      const affiliateIds = _.get(action, ['result', 'affiliate_ids'], []);
      _.set(state, ['user', 'accounts', accountIndex, 'affiliate_ids'], affiliateIds);
      return Object.assign({}, state);
    }
    default:
      return Object.assign({}, state);
  }
}
