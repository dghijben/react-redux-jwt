import {loadItem, isLoadedItem, isAllLoaded, loadAll} from 'redux/modules/store/actions';
import {reducerKey, reducerKeyCats} from './fields';

export default function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const apiPath = '/dashboard/accounts';
  const apiPathCats = '/dashboard/accounts/categories';
  const promise = [];

  if (!isAllLoaded(reducerKeyCats, state)) {
    promise.push(dispatch(loadAll(reducerKeyCats, apiPathCats)));
  }

  if (!isLoadedItem(reducerKey, state, state.router.params.id)) {
    promise.push(dispatch(loadItem(reducerKey, apiPath, state.router.params.id)));
  }

  if (promise.length > 0) {
    return Promise.all(promise);
  }
}
