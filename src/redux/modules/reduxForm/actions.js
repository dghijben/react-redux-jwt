import * as actions from './constants';

export function updateField(field, value) {
  return {
    type: actions.UPDATE_REDUX_FORM,
    field: field,
    value: value
  };
}
