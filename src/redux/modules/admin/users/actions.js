import _ from 'lodash';
import * as actions from './constants';

const API_PATH = '/admin/users';
const reducerIndex = 'users';
const reducerItem = 'user';

export function load(params) {
  return {
    types: [actions.USERS, actions.USERS_SUCCESS, actions.USERS_FAIL],
    promise: (client) => client.get(API_PATH, {
      params: {
        ...params
      }
    })
  };
}

export function update(id, params) {
  return {
    types: [actions.USER_UPDATE, actions.USER_UPDATE_SUCCESS, actions.USER_UPDATE_FAIL],
    promise: (client) => client.put(API_PATH + '/' + id, {
      data: params
    }),
    payload: params
  };
}

export function create(params) {
  return {
    types: [actions.USER_CREATE, actions.USER_CREATE_SUCCESS, actions.USER_CREATE_FAIL],
    promise: (client) => client.post(API_PATH, {
      data: params
    }),
    payload: params
  };
}

export function loadUser(id) {
  return {
    types: [actions.USER_LOAD, actions.USER_LOAD_SUCCESS, actions.USER_LOAD_FAIL],
    promise: (client) => client.get(API_PATH + '/' + id)
  };
}

export function destroyUser(id) {
  return {
    types: [actions.USER_DELETE, actions.USER_DELETE_SUCCESS, actions.USER_DELETE_FAIL],
    promise: (client) => client.del(API_PATH + '/' + id)
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
    _.get(globalState, [reducerIndex, 'success'], false) === true &&
    parseInt(_.get(globalState, [reducerIndex, 'list', 'current_page'], 1), 10) === parseInt(_.get(params, 'page', 1), 10)
  );
}

export function isLoadedUser(globalState, id) {
  return globalState.users && globalState.users.user &&
    ((parseInt(globalState[reducerIndex][reducerItem].id, 10) === parseInt(id, 10)
    ) || globalState[reducerIndex][reducerItem].failed === true)
    ;
}
