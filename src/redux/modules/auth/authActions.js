import * as actions from './authConstants';
import ApiClient from '../../../helpers/ApiClient';
import cookie from 'react-cookie';
const client = new ApiClient();

export function logout() {
  if (cookie.load('token')) {
    cookie.remove('token', {path: '/'});
  }
  return {
    type: actions.AUTH_LOGOUT
  };
}

export function setAccountAffiliates(path, params) {
  return {
    types: [actions.SET_ACCOUNT_AFFILIATES, actions.SET_ACCOUNT_AFFILIATES_SUCCESS, actions.SET_ACCOUNT_AFFILIATES_FAILED],
    promise: () => client.put(path, {
      data: params
    })
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
  cookie.remove('token');
  return {
    type: actions.USERINFO_FAIL,
    exception: Exception
  };
}

export function getUser(token) {

  return dispatch => {
    dispatch(getUserAttempt());
    return client.get('/authuser', {
      headers: {
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

export function passwordReset(payload) {
  return {
    types: [actions.PASSWORD, actions.PASSWORD_SUCCESS, actions.PASSWORD_FAIL],
    promise: () => client.post('/password', {
      data: {
        email: payload.email
      }
    })
  };
}

export function passwordChange(payload) {
  return {
    types: [actions.PASSWORD_CHANGE, actions.PASSWORD_CHANGE_SUCCESS, actions.PASSWORD_CHANGE_FAIL],
    promise: () => client.post('/password-reset', {
      data: {
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.passwordCheck,
        token: payload.token
      }
    })
  };
}


export function isLoaded(globalState) {
  return globalState.authorization && globalState.authorization.user &&
    (globalState.authorization.user.success === true || globalState.authorization.user.pending === true || globalState.authorization.user.failed === true);
}
