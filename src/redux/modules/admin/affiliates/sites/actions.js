import _ from 'lodash';
import * as actions from './constants';

const API_PATH = '/admin/affiliates/sites';
const reducerIndex = 'affiliatesSites';
const reducerItem = 'item';

export function load(params) {
  return {
    types: [actions.ADMIN_AFFLI_SITES, actions.ADMIN_AFFLI_SITES_SUCCESS, actions.ADMIN_AFFLI_SITES_FAIL],
    promise: (client) => client.get(API_PATH, {
      params: {
        ...params
      }
    })
  };
}

export function loadAll() {
  return {
    types: [actions.ADMIN_AFFLI_SITES_ALL, actions.ADMIN_AFFLI_SITES_ALL_SUCCESS, actions.ADMIN_AFFLI_SITES_ALL_FAIL],
    promise: (client) => client.get(API_PATH, {
      params: {
        'all': true
      }
    })
  };
}

export function clearAll() {
  return {
    type: actions.ADMIN_AFFLI_SITES_ALL_CLEAR
  };
}

export function update(id, params) {
  return {
    types: [actions.ADMIN_AFFL_SITE_UPDATE, actions.ADMIN_AFFL_SITE_UPDATE_SUCCESS, actions.ADMIN_AFFL_SITE_UPDATE_FAIL],
    promise: (client) => client.put(API_PATH + '/' + id, {
      data: params
    }),
    payload: params
  };
}

export function create(params) {
  return {
    types: [actions.ADMIN_AFFL_SITE_CREATE, actions.ADMIN_AFFL_SITE_CREATE_SUCCESS, actions.ADMIN_AFFL_SITE_CREATE_FAIL],
    promise: (client) => client.post(API_PATH, {
      data: params
    }),
    payload: params
  };
}

export function loadItem(id) {
  return {
    types: [actions.ADMIN_AFFL_SITE_LOAD, actions.ADMIN_AFFL_SITE_LOAD_SUCCESS, actions.ADMIN_AFFL_SITE_LOAD_FAIL],
    promise: (client) => client.get(API_PATH + '/' + id)
  };
}

export function destroyItem(id) {
  return {
    types: [actions.ADMIN_AFFL_SITE_DELETE, actions.ADMIN_AFFL_SITE_DELETE_SUCCESS, actions.ADMIN_AFFL_SITE_DELETE_FAIL],
    promise: (client) => client.del(API_PATH + '/' + id)
  };
}

export function clearList() {
  return {
    type: actions.ADMIN_ACL_ACL_CLEAR
  };
}

export function clearItem() {
  return {
    type: actions.ADMIN_AFFL_SITE_CLEAR
  };
}

export function clearNetworkState() {
  return {
    type: actions.ADMIN_AFFL_SITE_CLEAR_NETWORK_STATE
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
