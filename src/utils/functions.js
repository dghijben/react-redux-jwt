import _ from 'lodash';

const params = {};
export function stateMapper(state, pathname, name, obj, deep = 0) {
  if (deep === 0) {
    obj.push('page');
  }
  _.each(obj, (entry) => {
    if (_.isArray(entry)) {
      const deeper = deep + 1;
      stateMapper(state, pathname, name, entry, deeper);
    } else {
      params[entry] = _.get(state.router, ['location', 'query', entry]) ||
        _.get(state, ['reduxRouterReducer', 'routes', pathname, entry]) ||
        _.get(state, ['reduxRouterReducer', 'routes', pathname, name, entry]);
    }
  });
  return _.omit(params, (value)=>{ return !value; });
}

export function pickDeep(collection, predicate, thisArg) {

  const keys = _.flatten(_.rest(arguments));
  const newPredicate = (_.isFunction(predicate) ? _.callback(predicate, thisArg) : (key) => { return _.contains(keys, key); });

  return _.transform(collection, (memo, val, key) => {
    let include = newPredicate(key);
    if (!include && _.isObject(val)) {
      const newVal = pickDeep(val, predicate);
      include = !_.isEmpty(newVal);
    }
    if (include) {
      if (_.isArray(collection)) {
        memo.push(val);
      } else {
        memo[key] = val;
      }
    }
  });
}
