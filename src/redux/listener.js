import _ from 'lodash';
import cookie from 'react-cookie';
import { authActions } from './modules/auth';

export default function(store) {

  const token = cookie.load('token');
  if (!_.isEmpty(token)) {

    store.dispatch(authActions.setToken(token));
  }

  store.subscribe(() => {
    const state = store.getState();
    if (_.get(state, 'authorization.user.failed', null) === true) {
      cookie.remove('token');
    } else {
      if (_.get(state, 'authorization.token', null) !== null) {
        cookie.save('token', state.authorization.token);
      }
    }
  });
}
