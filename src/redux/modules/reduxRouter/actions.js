import * as actions from './constants';

export function storeState(route, state) {
  console.log(route);
  return {
    type: actions.ROUTER_STORE_STATE,
    route,
    state
  };
}
