import * as actions from './userConstants';

export function load() {
  return {
    types: [actions.USERS, actions.USERS_SUCCESS, actions.USERS_FAIL],
    promise: (client) => client.get('/admin/users')
  };
}

export function loadUser(userId) {
  return {
    types: [actions.USER_LOAD, actions.USER_LOAD_SUCCESS, actions.USER_LOAD_FAIL],
    promise: (client) => client.get('/admin/users/' + userId)
  };
}

export function isLoaded(globalState) {
  return globalState.users && globalState.users.data &&
    (globalState.users.success === true || globalState.users.failed === true);
}

export function isLoadedUser(globalState, userId) {
  return globalState.users && globalState.users.user &&
    ((globalState.users.user.success === true &&
        globalState.users.user.id === userId
    ) || globalState.users.user.failed === true)
    ;
}
