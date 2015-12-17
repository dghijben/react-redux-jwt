import _ from 'lodash';
import * as actions from './constants';

const reducerIndex = 'store';
const reducerItem = 'item';

export function load(key, path, params) {
  return {
    types: [actions.STORE_LIST, actions.STORE_LIST_SUCCESS, actions.STORE_LIST_FAIL],
    key,
    promise: (client) => client.get(path, {
      params: {
        ...params
      }
    })
  };
}

export function loadAll(key, path) {
  return {
    types: [actions.STORE_LIST_ALL, actions.STORE_LIST_ALL_SUCCESS, actions.STORE_LIST_ALL_FAIL],
    key,
    promise: (client) => client.get(path, {
      params: {
        'all': true
      }
    })
  };
}

export function clearAll(key) {
  return {
    type: actions.STORE_LIST_ALL_CLEAR,
    key
  };
}

export function update(key, path, id, params) {
  return {
    types: [actions.STORE_ITEM_UPDATE, actions.STORE_ITEM_UPDATE_SUCCESS, actions.STORE_ITEM_UPDATE_FAIL],
    key,
    promise: (client) => client.put(path + '/' + id, {
      data: params
    }),
    payload: params
  };
}

export function create(key, path, params) {
  return {
    types: [actions.STORE_ITEM_CREATE, actions.STORE_ITEM_CREATE_SUCCESS, actions.STORE_ITEM_CREATE_FAIL],
    key,
    promise: (client) => client.post(path, {
      data: params
    }),
    payload: params
  };
}

export function loadItem(key, path, id) {
  return {
    types: [actions.STORE_ITEM_LOAD, actions.STORE_ITEM_LOAD_SUCCESS, actions.STORE_ITEM_LOAD_FAIL],
    key,
    promise: (client) => client.get(path + '/' + id)
  };
}

export function destroyItem(key, path, id) {
  return {
    types: [actions.STORE_ITEM_DELETE, actions.STORE_ITEM_DELETE_SUCCESS, actions.STORE_ITEM_DELETE_FAIL],
    key,
    promise: (client) => client.del(path + '/' + id)
  };
}

export function clearList(key) {
  return {
    type: actions.STORE_LIST_CLEAR,
    key
  };
}

export function clearItem(key) {
  return {
    type: actions.STORE_ITEM_CLEAR,
    key
  };
}

export function clearNetworkState(key) {
  return {
    type: actions.STORE_ITEM_CLEAR_NETWORK_STATE,
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

export function isLoadedSimple(key, globalState) {
  return (
    _.get(globalState, [reducerIndex, key, 'success'], false) === true
  );
}


export function isLoadedItem(key, globalState, id) {
  return globalState[reducerIndex] && globalState[reducerIndex][key] && globalState[reducerIndex][key][reducerItem] &&
    ((parseInt(globalState[reducerIndex][key][reducerItem].id, 10) === parseInt(id, 10)
    ) || globalState[reducerIndex][key][reducerItem].failed === true)
    ;
}

export function isLoadedItemByString(key, globalState, id) {
  return globalState[reducerIndex] && globalState[reducerIndex][key] && globalState[reducerIndex][key][reducerItem] &&
    ((String(globalState[reducerIndex][key][reducerItem].id) === String(id)
    ) || globalState[reducerIndex][key][reducerItem].failed === true)
    ;
}
