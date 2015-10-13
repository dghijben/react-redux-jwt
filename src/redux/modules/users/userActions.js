import * as actions from './userConstants';

export function index() {
  return {
    types: [actions.USERS, actions.USERS_SUCCESS, actions.USERS_FAIL],
    promise: (client) => client.get('/users')
  };
}
