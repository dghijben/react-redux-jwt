import {loadItem, isLoadedItem} from 'redux/modules/store/actions';
const reducerKey = 'profile';

export default function fetchDataDeferred(getState, dispatch) {
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
