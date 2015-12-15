import _ from 'lodash';
import * as actions from './constants';

const initialState = {
};

export default function reducer(orgState = initialState, action = {}) {
  const state = Object.assign({}, orgState);
  const key = action.key;
  const keyState = Object.assign({}, _.get(state, key));

  switch (action.type) {
    case actions.STORE_LIST:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {pending: true, failed: false})));
    case actions.STORE_LIST_SUCCESS:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {list: action.result, pending: false, success: true, failed: false})));
    case actions.STORE_LIST_FAIL:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {pending: false, failed: true})));

    case actions.STORE_LIST_ALL:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {all: keyState.all, allStatus: {pending: true}})));
    case actions.STORE_LIST_ALL_SUCCESS:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {all: action.result, allStatus: {pending: false, success: true}})));
    case actions.STORE_LIST_ALL_FAIL:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {all: keyState.all, allStatus: {pending: false, failed: true}})));
    case actions.STORE_LIST_ALL_CLEAR:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {all: {}})));

    case actions.STORE_ITEM_LOAD:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: Object.assign({}, {pending: true})})));
    case actions.STORE_ITEM_LOAD_SUCCESS:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: Object.assign({}, action.result, {pending: false, success: true})})));
    case actions.STORE_ITEM_LOAD_FAIL:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: {pending: false, failed: true}})));

    case actions.STORE_ITEM_DELETE:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: Object.assign({}, {pending: true})})));
    case actions.STORE_ITEM_DELETE_SUCCESS:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: Object.assign({}, {pending: false, deleted: true})})));
    case actions.STORE_ITEM_DELETE_FAIL:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: Object.assign({}, {pending: false, failed: true})})));

    case actions.STORE_ITEM_UPDATE:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: Object.assign({}, keyState.item, {actionStatus: {pending: true}})})));
    case actions.STORE_ITEM_UPDATE_SUCCESS:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: Object.assign({}, action.result, {actionStatus: {pending: false, success: true}})})));
    case actions.STORE_ITEM_UPDATE_FAIL:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: Object.assign({}, keyState.item, {actionStatus: {pending: false, failed: true}})})));

    case actions.STORE_ITEM_CREATE:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: Object.assign({}, {actionStatus: {pending: true}})})));
    case actions.STORE_ITEM_CREATE_SUCCESS:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: Object.assign({}, action.payload, action.result, {actionStatus: {pending: false, success: true}})})));
    case actions.STORE_ITEM_CREATE_FAIL:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: Object.assign({}, {actionStatus: {pending: false, failed: true}})})));

    case actions.STORE_LIST_CLEAR:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {list: {}})));
    case actions.STORE_ITEM_CLEAR:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: {}})));
    case actions.STORE_ITEM_CLEAR_NETWORK_STATE:
      return Object.assign({}, state, _.set(state, key, Object.assign({}, keyState, {item: Object.assign({}, keyState.item, {actionStatus: {}})})));
    default:
      return Object.assign({}, state);
  }
}
