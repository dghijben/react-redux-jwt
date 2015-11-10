import _ from 'lodash';
import * as actions from './constants';

export function load(params) {
  return {
    types: [actions.CATEGORIES, actions.CATEGORIES_SUCCESS, actions.CATEGORIES_FAIL],
    promise: (client) => client.get('/admin/categories', {
      params: {
        ...params
      }
    })
  };
}

export function updateItem(id, params) {
  return {
    types: [actions.CATEGORY_UPDATE, actions.CATEGORY_UPDATE_SUCCESS, actions.CATEGORY_UPDATE_FAIL],
    promise: (client) => client.put('/admin/categories/' + id + '/edit', {
      data: params
    }),
    payload: params
  };
}

export function createItem(params) {
  return {
    types: [actions.CATEGORY_CREATE, actions.CATEGORY_CREATE_SUCCESS, actions.CATEGORY_CREATE_FAIL],
    promise: (client) => client.post('/admin/categories/new', {
      data: params
    }),
    payload: params
  };
}

export function showItem(id) {
  return {
    types: [actions.CATEGORY_LOAD, actions.CATEGORY_LOAD_SUCCESS, actions.CATEGORY_LOAD_FAIL],
    promise: (client) => client.get('/admin/categories/' + id)
  };
}

export function destroyItem(id) {
  return {
    types: [actions.CATEGORY_DELETE, actions.CATEGORY_DELETE_SUCCESS, actions.CATEGORY_DELETE_FAIL],
    promise: (client) => client.del('/admin/categories/' + id)
  };
}

export function clearList() {
  return {
    type: actions.CATEGORIES_CLEAR
  };
}

export function clearItem() {
  return {
    type: actions.CATEGORY_CLEAR
  };
}

export function clearNetworkState() {
  return {
    type: actions.CATEGORY_CLEAR_NETWORK_STATE
  };
}

export function isLoaded(globalState, params) {
  return (
    _.get(globalState, 'categories.success', false) === true &&
    parseInt(_.get(globalState, 'categories.list.current_page', 1), 10) === parseInt(_.get(params, 'page', 1), 10)
  );
}

export function isLoadedItem(globalState, userId) {
  return globalState.users && globalState.users.user &&
    ((parseInt(globalState.users.user.id, 10) === parseInt(userId, 10)
    ) || globalState.users.user.failed === true)
    ;
}
