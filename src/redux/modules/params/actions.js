import * as actions from './constants';

export function store(key, value) {
  return {
    type: actions.PARAMS_STORE,
    key,
    value
  };
}

export function clear(key) {
  return {
    type: actions.PARAMS_CLEAR,
    key
  };
}
