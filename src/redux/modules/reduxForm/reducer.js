import * as actions from './constants';

export default {
  searchForm: (state, action) => { // <------ 'searchForm' is name of form given to connectReduxForm()
    switch (action.type) {
      case actions.UPDATE_REDUX_FORM:
        const newState = Object.assign({}, state);
        if (newState.hasOwnProperty(action.field)) {
          newState[action.field].value = action.value;
        } else {
          newState[action.field] = {value: action.value};
        }
        return newState;
      default:
        return state;
    }
  }
};
