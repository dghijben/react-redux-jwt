import _ from 'lodash';
import * as actions from './userConstants';

export function load(params) {
  return {
    types: [actions.USERS, actions.USERS_SUCCESS, actions.USERS_FAIL],
    promise: (client) => client.get('/admin/users', {
      params: {
        ...params
      }
    })
  };
}

export function update(userId, params) {
  return {
    types: [actions.USER_UPDATE, actions.USER_UPDATE_SUCCESS, actions.USER_UPDATE_FAIL],
    promise: (client) => client.put('/admin/users/' + userId + '/edit', {
      data: params
    }),
    payload: params
  };
}

export function loadUser(userId) {
  return {
    types: [actions.USER_LOAD, actions.USER_LOAD_SUCCESS, actions.USER_LOAD_FAIL],
    promise: (client) => client.get('/admin/users/' + userId)
  };
}

export function destroyUser(userId) {
  return {
    types: [actions.USER_DELETE, actions.USER_DELETE_SUCCESS, actions.USER_DELETE_FAIL],
    promise: (client) => client.del('/admin/users/' + userId)
  };
}

export function clearList() {
  return {
    type: actions.USERS_CLEAR
  };
}

export function clearItem() {
  return {
    type: actions.USER_CLEAR
  };
}

export function clearNetworkState() {
  return {
    type: actions.USER_CLEAR_NETWORK_STATE
  };
}

export function isLoaded(globalState, params) {
  return (
    _.get(globalState, 'users.success', false) === true &&
    parseInt(_.get(globalState, 'users.list.current_page', 1), 10) === parseInt(_.get(params, 'page', 1), 10)
  );
}

export function isLoadedUser(globalState, userId) {
  return globalState.users && globalState.users.user &&
    ((globalState.users.user.success === true &&
        globalState.users.user.id === userId
    ) || globalState.users.user.failed === true)
    ;
}
