import {load, isLoaded, isLoadedSimple} from 'redux/modules/store/actions';
const reducerKey = 'accounts';
const reducerKeyCats = 'categories';
import {createAllParamsForFetch} from 'utils/functions';

export function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const apiPathAccounts = '/accounts';
  const apiPathCats = '/accounts/categories-account';
  const promise = [];
  const params = createAllParamsForFetch(getState());

  if (!isLoaded(reducerKey, state, state.router.params.id, params)) {
    promise.push(dispatch(load(reducerKey, apiPathAccounts, params)));
  }

  if (!isLoadedSimple(reducerKeyCats, state)) {
    promise.push(dispatch(load(reducerKeyCats, apiPathCats)));
  }

  if (promise.length > 0) {
    return Promise.all(promise);
  }
}


