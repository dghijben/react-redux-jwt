import * as actions from './constants';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.CATEGORIES:
      return Object.assign({}, state, {list: state.list}, {pending: true, startTime: Date.now()});
    case actions.CATEGORIES_SUCCESS:
      return Object.assign({}, state, {startTime: state.startTime}, {list: action.result, pending: false, success: true, user: {}});
    case actions.CATEGORIES_FAIL:
      return Object.assign({}, state, {pending: false, failed: true});

    case actions.CATEGORY_LOAD:
      return Object.assign({}, state, Object.assign({}, {categorie: Object.assign({}, {pending: true})}));
    case actions.CATEGORY_LOAD_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {categorie: Object.assign({}, action.result, {pending: false, success: true})}));
    case actions.CATEGORY_LOAD_FAIL:
      return Object.assign({}, state, Object.assign({}, {categorie: {pending: false, failed: true}}));

    case actions.CATEGORY_DELETE:
      return Object.assign({}, state, Object.assign({}, {categorie: Object.assign({}, ...state.user, {pending: true})}));
    case actions.CATEGORY_DELETE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {categorie: Object.assign({}, {pending: false, deleted: true})}));
    case actions.CATEGORY_DELETE_FAIL:
      return Object.assign({}, state, Object.assign({}, {categorie: {pending: false, failed: true}}));

    case actions.CATEGORY_UPDATE:
      return Object.assign({}, state, Object.assign({}, {categorie: Object.assign({}, state.user, {actionStatus: {pending: true}})}));
    case actions.CATEGORY_UPDATE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {categorie: Object.assign({}, state.user, ...action.payload, {actionStatus: {pending: false, success: true}})}));
    case actions.CATEGORY_UPDATE_FAIL:
      return Object.assign({}, state, Object.assign({}, {categorie: Object.assign({}, state.user, {actionStatus: {pending: false, failed: true}})}));

    case actions.CATEGORY_CREATE:
      return Object.assign({}, state, Object.assign({}, {categorie: Object.assign({}, {actionStatus: {pending: true}})}));
    case actions.CATEGORY_CREATE_SUCCESS:
      return Object.assign({}, state, Object.assign({}, {categorie: Object.assign({}, action.result, ...action.payload, {actionStatus: {pending: false, success: true}})}));
    case actions.CATEGORY_CREATE_FAIL:
      return Object.assign({}, state, Object.assign({}, {categorie: Object.assign({}, {actionStatus: {pending: false, failed: true}})}));

    case actions.CATEGORIES_CLEAR:
      return Object.assign({}, state, Object.assign({}, {list: {}}));
    case actions.CATEGORY_CLEAR:
      return Object.assign({}, state, Object.assign({}, {categorie: {}}));
    case actions.CATEGORY_CLEAR_NETWORK_STATE:
      return Object.assign({}, state, Object.assign({}, {categorie: Object.assign({}, state.user, {actionStatus: {}})}));
    default:
      return Object.assign({}, state);
  }
}
