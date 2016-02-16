import {isAllLoaded, loadAll} from 'redux/modules/store/actions';
import {reducerKeyCats} from './fields';

export default function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const apiPathCats = '/dashboard/accounts/categories';
  const promise = [];

  if (!isAllLoaded(reducerKeyCats, state)) {
    promise.push(dispatch(loadAll(reducerKeyCats, apiPathCats)));
  }

  if (promise.length > 0) {
    return Promise.all(promise);
  }
}
