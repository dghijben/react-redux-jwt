import * as actions from './userConstants';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.USERS:
      return Object.assign({}, state, {list: state.list}, {pending: true, startTime: Date.now()});
    case actions.USERS_SUCCESS:
      return Object.assign({}, state, {startTime: state.startTime}, {list: action.result, pending: false, success: true});
    case actions.USERS_FAIL:
      return Object.assign({}, state, {pending: false, failed: true});

    case actions.USER_LOAD:
      return Object.assign({}, state, Object.assign({}, {user: Object.assign({}, {pending: true})}));
    case actions.USER_LOAD_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {user: Object.assign({}, action.result, {pending: false, success: true})}));
    case actions.USER_LOAD_FAIL:
      return Object.assign({}, state, Object.assign({}, {user: {pending: false, failed: true}}));

    case actions.USER_UPDATE:
      return Object.assign({}, state, Object.assign({}, {user: Object.assign({}, state.user, {actionUpdate: {pending: true}})}));
    case actions.USER_UPDATE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {user: Object.assign({}, state.user, ...action.payload, {actionUpdate: {pending: false, success: true}})}));
    case actions.USER_UPDATE_FAIL:
      return Object.assign({}, state, Object.assign({}, {user: Object.assign({}, state.user, {actionUpdate: {pending: false, failed: true}})}));
    case actions.USERS_CLEAR:
      return Object.assign({}, state, Object.assign({}, {list: {}}));
    case actions.USER_CLEAR:
      return Object.assign({}, state, Object.assign({}, {user: {}}));
    case actions.USER_CLEAR_NETWORK_STATE:
      return Object.assign({}, state, Object.assign({}, {user: Object.assign({}, state.user, {actionUpdate: {}})}));
    default:
      return Object.assign({}, state);
  }
}
