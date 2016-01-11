import {load, loadItem, isLoaded, isLoadedItem, isLoadedSimple} from 'redux/modules/store/actions';
const reducerKey = 'profile';
const reducerKeyAff = 'affiliates';
const reducerKeyCats = 'categories';
import {createAllParamsForFetch} from 'utils/functions';

export default function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const apiPath = '/accounts';
  const apiPathAff = '/accounts/' + state.router.params.id + '/affiliates';
  const apiPathCats = '/accounts/categories';
  const promise = [];
  const params = createAllParamsForFetch(getState());

  if (!isLoadedItem(reducerKey, state, state.router.params.id)) {
    promise.push(dispatch(loadItem(reducerKey, apiPath, state.router.params.id)));
  }

  if (!isLoaded(reducerKeyAff, state, state.router.params.id, params)) {
    promise.push(dispatch(load(reducerKeyAff, apiPathAff, params)));
  }
  if (!isLoadedSimple(reducerKeyCats, state)) {
    promise.push(dispatch(load(reducerKeyCats, apiPathCats)));
  }

  if (promise.length > 0) {
    return Promise.all(promise);
  }
}
