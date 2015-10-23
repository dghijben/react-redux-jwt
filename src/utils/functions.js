import _ from 'lodash';

const params = [];
export function stateMapper(state, pathname, name, obj) {
  _.each(obj, (entry) => {
    if (_.isArray(entry)) {
      stateMapper(state, pathname, name, entry);
    } else {
      params[entry] = _.get(state.router, ['location', 'query', entry]) ||
        _.get(state, ['reduxRouterReducer', 'routes', pathname, entry]) ||
        _.get(state, ['reduxRouterReducer', 'routes', pathname, name, entry]);
    }
  });
  return params;
}
