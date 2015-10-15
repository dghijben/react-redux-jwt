import * as actions from './aclConstants';

const initialState = {
  data: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.ACL:
      return Object.assign({}, state, {data: null, pending: true});
    case actions.ACL_SUCCESS:
      return Object.assign({}, state, {data: action.result, pending: false, success: true});
    case actions.ACL_FAIL:
      return Object.assign({}, state, {data: null, pending: false, failed: true});
    default:
      return Object.assign({}, state);
  }
}
