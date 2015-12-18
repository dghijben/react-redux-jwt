import {load, isLoaded, isLoadedSimple} from 'redux/modules/store/actions';
import {reducerKey, reducerKeyCats} from './settings';
import {createAllParamsForFetch} from 'utils/functions';

export default function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const apiPath = '/dashboard/settings/' + state.router.params.id + '/affiliates';
  const apiPathCats = '/dashboard/settings/' + state.router.params.id + '/affiliates/categories';
  const promise = [];
  const params = createAllParamsForFetch(getState());

  if (!isLoaded(reducerKey, state, params)) {
    promise.push(dispatch(load(reducerKey, apiPath, params)));
  }
  if (!isLoadedSimple(reducerKeyCats, state)) {
    promise.push(dispatch(load(reducerKeyCats, apiPathCats)));
  }

  if (promise.length > 0) {
    return Promise.all(promise);
  }
}
