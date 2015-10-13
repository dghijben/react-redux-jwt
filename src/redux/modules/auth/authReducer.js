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
      return Object.assign({}, state, {token: null, loggedIn: false, pending: true});
    case actions.LOGIN_SUCCESS:
      return Object.assign({}, state, {token: action.result.token, loggedIn: true, pending: false, success: true});
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
    default:
      return Object.assign({}, state);
  }
}
