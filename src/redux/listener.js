import _ from 'lodash';
import cookie from 'react-cookie';
import {setToken} from './modules/auth/authActions';

export default function(store) {
  console.log('HOI');
  const token = cookie.load('token');
  if (!_.isEmpty(token) && !_.isNull(token)) {
    console.log('WE HAVE AN TOKEN', token);
    store.dispatch(setToken(token));
  }

  store.subscribe(() => {
    const state = store.getState();
    if (_.get(state, 'authorization.user.failed', null) === true) {
      cookie.remove('token');
    } else {
      if (_.get(state, 'authorization.token', null) !== null) {
        if (!cookie.load('token')) {
          cookie.save('token', state.authorization.token, {path: '/'});
        }
      }
    }
  });
}
