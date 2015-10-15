import * as actions from './userConstants';

export function load() {
  return {
    types: [actions.USERS, actions.USERS_SUCCESS, actions.USERS_FAIL],
    promise: (client) => client.get('/admin/users')
  };
}

export function isLoaded(globalState) {
  return globalState.users && globalState.users.data &&
    (globalState.users.success === true || globalState.users.failed === true);
}
