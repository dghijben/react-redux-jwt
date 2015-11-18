import _ from 'lodash';
import * as actions from './constants';

const reducerIndex = 'data';
const reducerItem = 'item';

const apiPaths = {
  'users': '/admin/users',
  'aclRoles': '/admin/acl/roles'
};

export function load(key, params) {
  return {
    types: [actions.DATA_LIST, actions.DATA_LIST_SUCCESS, actions.DATA_LIST_FAIL],
    key,
    promise: (client) => client.get(_.get(apiPaths, key), {
      params: {
        ...params
      }
    })
  };
}

export function loadAll(key) {
  return {
    types: [actions.DATA_LIST_ALL, actions.DATA_LIST_ALL_SUCCESS, actions.DATA_LIST_ALL_FAIL],
    key,
    promise: (client) => client.get(_.get(apiPaths, key), {
      params: {
        'all': true
      }
    })
  };
}

export function clearAll(key) {
  return {
    type: actions.DATA_LIST_ALL_CLEAR,
    key
  };
}

export function update(key, id, params) {
  return {
    types: [actions.DATA_ITEM_UPDATE, actions.DATA_ITEM_UPDATE_SUCCESS, actions.DATA_ITEM_UPDATE_FAIL],
    key,
    promise: (client) => client.put(_.get(apiPaths, key) + '/' + id, {
      data: params
    }),
    payload: params
  };
}

export function create(key, params) {
  return {
    types: [actions.DATA_ITEM_CREATE, actions.DATA_ITEM_CREATE_SUCCESS, actions.DATA_ITEM_CREATE_FAIL],
    key,
    promise: (client) => client.post(_.get(apiPaths, key), {
      data: params
    }),
    payload: params
  };
}

export function loadItem(key, id) {
  return {
    types: [actions.DATA_ITEM_LOAD, actions.DATA_ITEM_LOAD_SUCCESS, actions.DATA_ITEM_LOAD_FAIL],
    key,
    promise: (client) => client.get(_.get(apiPaths, key) + '/' + id)
  };
}

export function destroyItem(key, id) {
  return {
    types: [actions.DATA_ITEM_DELETE, actions.DATA_ITEM_DELETE_SUCCESS, actions.DATA_ITEM_DELETE_FAIL],
    key,
    promise: (client) => client.del(_.get(apiPaths, key) + '/' + id)
  };
}

export function clearList(key) {
  return {
    type: actions.DATA_LIST_CLEAR,
    key
  };
}

export function clearItem(key) {
  return {
    type: actions.DATA_ITEM_CLEAR,
    key
  };
}

export function clearNetworkState(key) {
  return {
    type: actions.DATA_ITEM_CLEAR_NETWORK_STATE,
    key
  };
}

export function isAllLoaded(key, globalState) {
  return (_.get(globalState, [reducerIndex, key, 'allStatus', 'success'], false));
}

export function isLoaded(key, globalState, params) {
  return (
    _.get(globalState, [reducerIndex, key, 'success'], false) === true &&
    parseInt(_.get(globalState, [reducerIndex, key, 'list', 'current_page'], 1), 10) === parseInt(_.get(params, 'page', 1), 10)
  );
}

export function isLoadedItem(key, globalState, id) {
  return globalState[reducerIndex] && globalState[reducerIndex][key] && globalState[reducerIndex][key][reducerItem] &&
    ((parseInt(globalState[reducerIndex][key][reducerItem].id, 10) === parseInt(id, 10)
    ) || globalState[reducerIndex][key][reducerItem].failed === true)
    ;
}
