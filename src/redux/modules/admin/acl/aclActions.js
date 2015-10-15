import * as actions from './aclConstants';

export function load() {
  return {
    types: [actions.ACL, actions.ACL_SUCCESS, actions.ACL_FAIL],
    promise: (client) => client.get('/admin/routes')
  };
}

export function isLoaded(globalState) {
  return globalState.acl && globalState.acl.routes &&
    (globalState.acl.success === true || globalState.acl.failed === true);
}
