import * as actions from './constants';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.AFFILIATES:
      return Object.assign({}, state, {list: state.list}, {pending: true, startTime: Date.now()});
    case actions.AFFILIATES_SUCCESS:
      return Object.assign({}, state, {startTime: state.startTime}, {list: action.result, pending: false, success: true, failed: false});
    case actions.AFFILIATES_FAIL:
      return Object.assign({}, state, {pending: false, failed: true, success: false});

    case actions.AFFILIATE_LOAD:
      return Object.assign({}, state, Object.assign({}, {record: Object.assign({}, {pending: true})}));
    case actions.AFFILIATE_LOAD_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {record: Object.assign({}, action.result, {pending: false, success: true})}));
    case actions.AFFILIATE_LOAD_FAIL:
      return Object.assign({}, state, Object.assign({}, {record: {pending: false, failed: true}}));

    case actions.AFFILIATE_UPDATE:
      return Object.assign({}, state, Object.assign({}, {record: Object.assign({}, state.record, {actionUpdate: {pending: true}})}));
    case actions.AFFILIATE_UPDATE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {record: Object.assign({}, state.record, ...action.payload, {actionUpdate: {pending: false, success: true}})}));
    case actions.AFFILIATE_UPDATE_FAIL:
      return Object.assign({}, state, Object.assign({}, {record: Object.assign({}, state.record, {actionUpdate: {pending: false, failed: true}})}));
    case actions.AFFILIATES_CLEAR:
      return Object.assign({}, state, Object.assign({}, {list: {}}));
    case actions.AFFILIATE_CLEAR:
      return Object.assign({}, state, Object.assign({}, {record: {}}));
    case actions.AFFILIATE_CLEAR_NETWORK_STATE:
      return Object.assign({}, state, Object.assign({}, {record: Object.assign({}, state.record, {actionUpdate: {}})}));
    default:
      return Object.assign({}, state);
  }
}
