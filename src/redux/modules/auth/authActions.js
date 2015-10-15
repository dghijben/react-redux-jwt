import * as actions from './authConstants';
import ApiClient from '../../../helpers/ApiClient';
import cookie from 'react-cookie';
const client = new ApiClient();

export function logout() {
  cookie.remove('token');
  return {
    type: actions.AUTH_LOGOUT
  };
}

export function getUserAttempt() {
  return {
    type: actions.USERINFO
  };
}

export function getUserSuccess(result) {
  return {
    type: actions.USERINFO_SUCCSS,
    result
  };
}

export function getUserFailure(Exception) {
  if (!__SERVER__) {
    cookie.remove('token');
  }
  return {
    type: actions.USERINFO_FAIL,
    exception: Exception
  };
}

export function getUser(token) {
  return dispatch => {
    dispatch(getUserAttempt());
    return client.get('/authuser', {
      set: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(result => dispatch(getUserSuccess(result)))
      .catch(Exception => dispatch(getUserFailure(Exception)));
  };
}

export function loginAttempt() {
  return {
    type: actions.LOGIN
  };
}

export function loginSucces(result) {
  return dispatch=> {
    dispatch(getUser(result.token));
    dispatch({
      type: actions.LOGIN_SUCCESS,
      result: result
    });
  };
}

export function loginFailure() {
  return {
    type: actions.LOGIN_FAIL
  };
}

export function authenticate(payload) {
  return dispatch => {
    dispatch(loginAttempt());
    return client.post('/authenticate', {
      data: {
        email: payload.email,
        password: payload.password
      }
    })
      .then(response => dispatch(loginSucces(response)))
      .catch(Exception => dispatch(loginFailure(Exception)));
  };
}

export function setToken(token) {
  return dispatch=> {
    dispatch({
      type: actions.AUTH_SET_TOKEN,
      token
    });
  };
}

export function isLoaded(globalState) {
  return globalState.authorization && globalState.authorization.user &&
    (globalState.authorization.user.success === true || globalState.authorization.user.pending === true || globalState.authorization.user.failed === true);
}
