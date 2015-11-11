import _ from 'lodash';
import * as actions from './constants';

const API_PATH = '/admin/acl';
const reducerIndex = 'acl';
const reducerItem = 'item';

export function load(params) {
  return {
    types: [actions.ACL, actions.ACL_SUCCESS, actions.ACL_FAIL],
    promise: (client) => client.get(API_PATH, {
      params: {
        ...params
      }
    })
  };
}

export function update(id, params) {
  return {
    types: [actions.ROLE_UPDATE, actions.ROLE_UPDATE_SUCCESS, actions.ROLE_UPDATE_FAIL],
    promise: (client) => client.put(API_PATH + '/' + id, {
      data: params
    }),
    payload: params
  };
}

export function create(params) {
  return {
    types: [actions.ROLE_CREATE, actions.ROLE_CREATE_SUCCESS, actions.ROLE_CREATE_FAIL],
    promise: (client) => client.post(API_PATH, {
      data: params
    }),
    payload: params
  };
}

export function loadItem(id) {
  return {
    types: [actions.ROLE_LOAD, actions.ROLE_LOAD_SUCCESS, actions.ROLE_LOAD_FAIL],
    promise: (client) => client.get(API_PATH + '/' + id)
  };
}

export function destroyItem(id) {
  return {
    types: [actions.ROLE_DELETE, actions.ROLE_DELETE_SUCCESS, actions.ROLE_DELETE_FAIL],
    promise: (client) => client.del(API_PATH + '/' + id)
  };
}

export function clearList() {
  return {
    type: actions.ACL_CLEAR
  };
}

export function clearItem() {
  return {
    type: actions.ROLE_CLEAR
  };
}

export function clearNetworkState() {
  return {
    type: actions.ROLE_CLEAR_NETWORK_STATE
  };
}

export function isLoaded(globalState, params) {
  return (
    _.get(globalState, [reducerIndex, 'success'], false) === true &&
    parseInt(_.get(globalState, [reducerIndex, 'list', 'current_page'], 1), 10) === parseInt(_.get(params, 'page', 1), 10)
  );
}

export function isLoadedItem(globalState, id) {
  return globalState.ACL && globalState.ACL.ROLE &&
    ((parseInt(globalState[reducerIndex][reducerItem].id, 10) === parseInt(id, 10)
    ) || globalState[reducerIndex][reducerItem].failed === true)
    ;
}
