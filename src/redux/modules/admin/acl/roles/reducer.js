import * as actions from './constants';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.ADMIN_ACL_ROLES:
      return Object.assign({}, state, {list: state.list}, {pending: true, startTime: Date.now()});
    case actions.ADMIN_ACL_ROLES_SUCCESS:
      return Object.assign({}, state, {startTime: state.startTime}, {list: action.result, pending: false, failed: false, success: true, item: {}});
    case actions.ADMIN_ACL_ROLES_FAIL:
      return Object.assign({}, state, {pending: false, failed: true});

    case actions.ADMIN_ACL_ROLES_ALL:
      return Object.assign({}, state, {all: state.all}, {allStatus: {pending: true}});
    case actions.ADMIN_ACL_ROLES_ALL_SUCCESS:
      return Object.assign({}, state, {all: action.result}, {allStatus: {pending: false, success: true}});
    case actions.ADMIN_ACL_ROLES_ALL_FAIL:
      return Object.assign({}, state, {all: []}, {allStatus: {pending: false, failed: true}});
    case actions.ADMIN_ACL_ROLES_ALL_CLEAR:
      return Object.assign({}, state, {all: []}, {allStatus: {}});

    case actions.ADMIN_ACL_ROLE_LOAD:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, {pending: true})}));
    case actions.ADMIN_ACL_ROLE_LOAD_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, action.result, {pending: false, success: true})}));
    case actions.ADMIN_ACL_ROLE_LOAD_FAIL:
      return Object.assign({}, state, Object.assign({}, {item: {pending: false, failed: true}}));

    case actions.ADMIN_ACL_ROLE_DELETE:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, ...state.item, {pending: true})}));
    case actions.ADMIN_ACL_ROLE_DELETE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, {pending: false, deleted: true})}));
    case actions.ADMIN_ACL_ROLE_DELETE_FAIL:
      return Object.assign({}, state, Object.assign({}, {item: {pending: false, failed: true}}));

    case actions.ADMIN_ACL_ROLE_UPDATE:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, state.item, {actionStatus: {pending: true}})}));
    case actions.ADMIN_ACL_ROLE_UPDATE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, ...action.result, {actionStatus: {pending: false, success: true}})}));
    case actions.ADMIN_ACL_ROLE_UPDATE_FAIL:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, state.item, {actionStatus: {pending: false, failed: true}})}));

    case actions.ADMIN_ACL_ROLE_CREATE:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, {actionStatus: {pending: true}})}));
    case actions.ADMIN_ACL_ROLE_CREATE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, action.result, ...action.payload, {actionStatus: {pending: false, success: true}})}));
    case actions.ADMIN_ACL_ROLE_CREATE_FAIL:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, {actionStatus: {pending: false, failed: true}})}));

    case actions.ADMIN_ACL_ROLES_CLEAR:
      return Object.assign({}, state, Object.assign({}, {list: {}}));
    case actions.ADMIN_ACL_ROLE_CLEAR:
      return Object.assign({}, state, Object.assign({}, {item: {}}));
    case actions.ADMIN_ACL_ROLE_CLEAR_NETWORK_STATE:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, state.item, {actionStatus: {}})}));
    default:
      return Object.assign({}, state);
  }
}
