import _ from 'lodash';
import * as actions from './constants';

const initialState = {
};

export default function reducer(orgState = initialState, action = {}) {
  const state = Object.assign({}, orgState);

  switch (action.type) {
    case actions.PARAMS_STORE:
      return Object.assign({}, state, _.set(state, action.key, action.value));
    case actions.PARAMS_CLEAR:
      return Object.assign({}, _.omit(state, action.key));
    default:
      return Object.assign({}, state);
  }
}
