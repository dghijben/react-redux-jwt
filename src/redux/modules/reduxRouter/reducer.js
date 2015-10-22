import * as actions from './constants';

const initialState = {
  routes: {}
};

const storeState = (object, id, value) => {
  const clone = Object.assign({}, object);
  clone[id] = value;
  return clone;
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.ROUTER_STORE_STATE:
      return Object.assign({}, state, {routes: storeState(state.routes, action.route, action.state)});
    default:
      return Object.assign({}, state);
  }
}
