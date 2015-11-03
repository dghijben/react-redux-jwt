import _ from 'lodash';
import * as actions from './constants';

const URL = '/admin/affiliates';
const REDUCER = 'affiliates';

export function load(params) {
  return {
    types: [actions.AFFILIATES, actions.AFFILIATES_SUCCESS, actions.AFFILIATES_FAIL],
    promise: (client) => client.get(URL, {
      params: {
        ...params
      }
    })
  };
}

export function update(id, params) {
  console.log('mango', params);
  return {
    types: [actions.AFFILIATE_UPDATE, actions.AFFILIATE_UPDATE_SUCCESS, actions.AFFILIATE_UPDATE_FAIL],
    promise: (client) => client.post(URL + '/' + id + '/edit', {
      formData: params
    }),
    payload: params
  };
}

export function loadRecord(id) {
  return {
    types: [actions.AFFILIATE_LOAD, actions.AFFILIATE_LOAD_SUCCESS, actions.AFFILIATE_LOAD_FAIL],
    promise: (client) => client.get(URL + '/' + id)
  };
}

export function clearList() {
  return {
    type: actions.AFFILIATES_CLEAR
  };
}

export function clearItem() {
  return {
    type: actions.AFFILIATE_CLEAR
  };
}

export function clearNetworkState() {
  return {
    type: actions.AFFILIATE_CLEAR_NETWORK_STATE
  };
}

export function isLoaded(globalState, params) {
  return (
    _.get(globalState, [REDUCER, 'success'], false) === true &&
    parseInt(_.get(globalState, [REDUCER, 'list', 'current_page'], 1), 10) === parseInt(_.get(params, 'page', 1), 10)
  );
}

export function isLoadedRecord(globalState, id) {
  return globalState[REDUCER] && globalState[REDUCER].record &&
    ((globalState[REDUCER].record.success === true &&
        globalState[REDUCER].record.id === id
    ) || globalState[REDUCER].record.failed === true)
    ;
}
