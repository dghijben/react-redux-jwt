import * as actions from './constants';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.ACL:
      return Object.assign({}, state, {list: state.list}, {pending: true, startTime: Date.now()});
    case actions.ACL_SUCCESS:
      return Object.assign({}, state, {startTime: state.startTime}, {list: action.result, pending: false, success: true, item: {}});
    case actions.ACL_FAIL:
      return Object.assign({}, state, {pending: false, failed: true});

    case actions.ROLE_LOAD:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, {pending: true})}));
    case actions.ROLE_LOAD_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, action.result, {pending: false, success: true})}));
    case actions.ROLE_LOAD_FAIL:
      return Object.assign({}, state, Object.assign({}, {item: {pending: false, failed: true}}));

    case actions.ROLE_DELETE:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, ...state.item, {pending: true})}));
    case actions.ROLE_DELETE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, {pending: false, deleted: true})}));
    case actions.ROLE_DELETE_FAIL:
      return Object.assign({}, state, Object.assign({}, {item: {pending: false, failed: true}}));

    case actions.ROLE_UPDATE:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, state.item, {actionStatus: {pending: true}})}));
    case actions.ROLE_UPDATE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, ...action.result, {actionStatus: {pending: false, success: true}})}));
    case actions.ROLE_UPDATE_FAIL:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, state.item, {actionStatus: {pending: false, failed: true}})}));

    case actions.ROLE_CREATE:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, {actionStatus: {pending: true}})}));
    case actions.ROLE_CREATE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, action.result, ...action.payload, {actionStatus: {pending: false, success: true}})}));
    case actions.ROLE_CREATE_FAIL:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, {actionStatus: {pending: false, failed: true}})}));

    case actions.ROLES_CLEAR:
      return Object.assign({}, state, Object.assign({}, {list: {}}));
    case actions.ROLE_CLEAR:
      return Object.assign({}, state, Object.assign({}, {item: {}}));
    case actions.ROLE_CLEAR_NETWORK_STATE:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, state.item, {actionStatus: {}})}));
    default:
      return Object.assign({}, state);
  }
}
