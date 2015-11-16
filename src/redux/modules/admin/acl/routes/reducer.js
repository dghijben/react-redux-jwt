import * as actions from './constants';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.ACL_ROUTES:
      return Object.assign({}, state, {list: state.list}, {pending: true, startTime: Date.now()});
    case actions.ACL_ROUTES_SUCCESS:
      return Object.assign({}, state, {startTime: state.startTime}, {list: action.result, pending: false, failed: false, success: true, item: {}});
    case actions.ACL_ROUTES_FAIL:
      return Object.assign({}, state, {pending: false, failed: true});

    case actions.ACL_ROUTES_ALL:
      return Object.assign({}, state, {all: state.all}, {allStatus: {pending: true}});
    case actions.ACL_ROUTES_ALL_SUCCESS:
      return Object.assign({}, state, {all: action.result}, {allStatus: {pending: false, success: true}});
    case actions.ACL_ROUTES_ALL_FAIL:
      return Object.assign({}, state, {all: []}, {allStatus: {pending: false, failed: true}});
    case actions.ACL_ROUTES_ALL_CLEAR:
      return Object.assign({}, state, {all: []}, {allStatus: {}});

    case actions.ACL_ROUTE_LOAD:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, {pending: true})}));
    case actions.ACL_ROUTE_LOAD_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, action.result, {pending: false, success: true})}));
    case actions.ACL_ROUTE_LOAD_FAIL:
      return Object.assign({}, state, Object.assign({}, {item: {pending: false, failed: true}}));

    case actions.ACL_ROUTE_DELETE:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, ...state.item, {pending: true})}));
    case actions.ACL_ROUTE_DELETE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, {pending: false, deleted: true})}));
    case actions.ACL_ROUTE_DELETE_FAIL:
      return Object.assign({}, state, Object.assign({}, {item: {pending: false, failed: true}}));

    case actions.ACL_ROUTE_UPDATE:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, state.item, {actionStatus: {pending: true}})}));
    case actions.ACL_ROUTE_UPDATE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, ...action.result, {actionStatus: {pending: false, success: true}})}));
    case actions.ACL_ROUTE_UPDATE_FAIL:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, state.item, {actionStatus: {pending: false, failed: true}})}));

    case actions.ACL_ROUTE_CREATE:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, {actionStatus: {pending: true}})}));
    case actions.ACL_ROUTE_CREATE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, action.result, ...action.payload, {actionStatus: {pending: false, success: true}})}));
    case actions.ACL_ROUTE_CREATE_FAIL:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, {actionStatus: {pending: false, failed: true}})}));

    case actions.ACL_ROUTES_CLEAR:
      return Object.assign({}, state, Object.assign({}, {list: {}}));
    case actions.ACL_ROUTE_CLEAR:
      return Object.assign({}, state, Object.assign({}, {item: {}}));
    case actions.ACL_ROUTE_CLEAR_NETWORK_STATE:
      return Object.assign({}, state, Object.assign({}, {item: Object.assign({}, state.item, {actionStatus: {}})}));
    default:
      return Object.assign({}, state);
  }
}
