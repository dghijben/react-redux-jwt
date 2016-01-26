import {load, loadItem, isLoaded, isLoadedItem, isLoadedSimple} from 'redux/modules/store/actions';
const reducerKey = 'profile';
const reducerKeyAff = 'affiliates';
const reducerKeyAanb = 'aanbiedingen';
const reducerKeyKK = 'kortingscodes';
const reducerKeyCats = 'categories';
import {createAllParamsForFetch} from 'utils/functions';

export function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const apiPath = '/accounts';
  const promise = [];

  if (!isLoadedItem(reducerKey, state, state.router.params.id)) {
    promise.push(dispatch(loadItem(reducerKey, apiPath, state.router.params.id)));
  }

  if (promise.length > 0) {
    return Promise.all(promise);
  }
}

export function fetchDataDeferred1(getState, dispatch) {
  const state = getState();
  const apiPathAff = '/accounts/' + state.router.params.id + '/affiliates';
  const apiPathCats = '/accounts/categories';
  const promise = [];
  const params = createAllParamsForFetch(getState());

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

export function fetchDataDeferred2(getState, dispatch) {
  const state = getState();
  const apiPathKK = '/accounts/' + state.router.params.id + '/discountcodes';
  const apiPathCats = '/accounts/categories';
  const promise = [];
  const params = createAllParamsForFetch(getState());

  if (!isLoaded(reducerKeyKK, state, state.router.params.id, params)) {
    promise.push(dispatch(load(reducerKeyKK, apiPathKK, params)));
  }

  if (!isLoadedSimple(reducerKeyCats, state)) {
    promise.push(dispatch(load(reducerKeyCats, apiPathCats)));
  }

  if (promise.length > 0) {
    return Promise.all(promise);
  }
}

export function fetchDataDeferred3(getState, dispatch) {
  const state = getState();
  const apiPathAanb = '/accounts/' + state.router.params.id + '/offers';
  const apiPathCats = '/accounts/categories';
  const promise = [];
  const params = createAllParamsForFetch(getState());

  if (!isLoaded(reducerKeyAanb, state, state.router.params.id, params)) {
    promise.push(dispatch(load(reducerKeyAanb, apiPathAanb, params)));
  }

  if (!isLoadedSimple(reducerKeyCats, state)) {
    promise.push(dispatch(load(reducerKeyCats, apiPathCats)));
  }

  if (promise.length > 0) {
    return Promise.all(promise);
  }
}

