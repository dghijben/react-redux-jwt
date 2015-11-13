import _ from 'lodash';
import * as actions from './constants';

const API_PATH = '/admin/acl/routes';
const reducerIndex = 'aclroutes';
const reducerItem = 'item';

export function load(params) {
  return {
    types: [actions.ACL_ROUTES, actions.ACL_ROUTES_SUCCESS, actions.ACL_ROUTES_FAIL],
    promise: (client) => client.get(API_PATH, {
      params: {
        ...params
      }
    })
  };
}

export function loadAll() {
  return {
    types: [actions.ACL_ROUTES_ALL, actions.ACL_ROUTES_ALL_SUCCESS, actions.ACL_ROUTES_ALL_FAIL],
    promise: (client) => client.get(API_PATH, {
      params: {
        'all': true
      }
    })
  };
}

export function clearAll() {
  return {
    type: actions.ACL_ROUTES_ALL_CLEAR
  };
}

export function update(id, params) {
  return {
    types: [actions.ACL_ROUTE_UPDATE, actions.ACL_ROUTE_UPDATE_SUCCESS, actions.ACL_ROUTE_UPDATE_FAIL],
    promise: (client) => client.put(API_PATH + '/' + id, {
      data: params
    }),
    payload: params
  };
}

export function create(params) {
  return {
    types: [actions.ACL_ROUTE_CREATE, actions.ACL_ROUTE_CREATE_SUCCESS, actions.ACL_ROUTE_CREATE_FAIL],
    promise: (client) => client.post(API_PATH, {
      data: params
    }),
    payload: params
  };
}

export function loadItem(id) {
  return {
    types: [actions.ACL_ROUTE_LOAD, actions.ACL_ROUTE_LOAD_SUCCESS, actions.ACL_ROUTE_LOAD_FAIL],
    promise: (client) => client.get(API_PATH + '/' + id)
  };
}

export function destroyItem(id) {
  return {
    types: [actions.ACL_ROUTE_DELETE, actions.ACL_ROUTE_DELETE_SUCCESS, actions.ACL_ROUTE_DELETE_FAIL],
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
    type: actions.ACL_ROUTE_CLEAR
  };
}

export function clearNetworkState() {
  return {
    type: actions.ACL_ROUTE_CLEAR_NETWORK_STATE
  };
}

export function isAllLoaded(globalState) {
  return (_.get(globalState, [reducerIndex, 'allStatus', 'success'], false));
}

export function isLoaded(globalState, params) {
  return (
    _.get(globalState, [reducerIndex, 'success'], false) === true &&
    parseInt(_.get(globalState, [reducerIndex, 'list', 'current_page'], 1), 10) === parseInt(_.get(params, 'page', 1), 10)
  );
}

export function isLoadedItem(globalState, id) {
  return globalState[reducerIndex] && globalState[reducerIndex][reducerItem] &&
    ((parseInt(globalState[reducerIndex][reducerItem].id, 10) === parseInt(id, 10)
    ) || globalState[reducerIndex][reducerItem].failed === true)
    ;
}
