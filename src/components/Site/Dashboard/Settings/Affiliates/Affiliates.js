import _ from 'lodash';
import React, {PropTypes} from 'react';
import {reducerIndex, reducerKey, reducerKeyCats, searchFields} from './settings';
import {load} from 'redux/modules/store/actions';
import {mapDispatchToProps, filterFields, createParamsForFetch} from 'utils/functions';
import { connect } from 'react-redux';
import {setAccountAffiliates} from 'redux/modules/auth/authActions';
const fieldNames = filterFields(searchFields);

@connect(state=> {
  const obj = {
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer,
    'accounts': state.authorization.user.accounts
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)
class Affiliates extends React.Component {
  static propTypes = {
    'accounts': PropTypes.object,
    'account': PropTypes.object,
    'router': PropTypes.object,
    'store': PropTypes.object,
    'dispatch': PropTypes.func
  };

  constructor() {
    super();
    this.categories = this.categories.bind(this);
    this.category = this.category.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const apiPath = '/dashboard/settings/' + state.router.params.id + '/affiliates';
    const apiPathCats = '/dashboard/settings/' + state.router.params.id + '/affiliates/categories';
    const promise = [];
    promise.push(dispatch(load(reducerKey, apiPath, createParamsForFetch(getState(), reducerIndex, fieldNames))));
    promise.push(dispatch(load(reducerKeyCats, apiPathCats)));
    return Promise.all(promise);
  }

  subscribe(e) {
    console.log(e);
    if (e.target.checked === true) {
      //

      this.props.dispatch(
          setAccountAffiliates(
              '/dashboard/settings/' + this.props.router.params.id + '/affiliates/add-affiliate',
              [e.target.value]
          )
      );
    }
  }

  site() {
    return (
      <table className="table table-bordered table-hover table-condensed">
        <thead>
        <tr>
          <th>Abonneer</th>
          <th>Affiliate</th>
          <th>cpm</th>
          <th>cps</th>
          <th>cpl</th>
          <th>cpc</th>
          <th>csr</th>
          <th>ecpc</th>
        </tr>
        </thead>
        <tbody>

        {_.map(_.get(this.props, [reducerIndex, reducerKey, 'list', 'data'], []), (item) => {
          return (
            <tr>
              <td>
                <label>
                  <input type="checkbox" className="ios-switch tinyswitch" value={item.id} onChange={this.subscribe}/>
                  <div><div /></div>
                </label>
              </td>
              <td>{item.name}</td>
              <td>{item.cpm}</td>
              <td>{item.cps}</td>
              <td>{item.cpl}</td>
              <td>{item.cpc}</td>
              <td>{item.csr}</td>
              <td>{item.ecpc}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  }

  categories() {
    const {store: {categories: {list}}} = this.props;
    console.log('MANGO', list);

    if (list.length > 0) {
      return (
        <ul>
          {_.map(list, (category, key) => {
            return this.category(key, category);
          })}
        </ul>
      );
    }
  }

  category(key, category) {
    return (
      <li key={key}>
        <i className="fa fa-square-o pull-right"></i>
        <i className="fa fa-angle-right"></i>
        {' '}
        {category.name}
      </li>
    );
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-md-push-3">
            {this.site()}
          </div>

          <aside className="col-md-3 col-md-pull-9 sidebar">
            <div className="widget">
              <h3>Categories</h3>
              <ul id="category-widget">
                <li className="open"><a href="#">Categorieen <span className="category-widget-btn"></span></a>
                  {this.categories()}
                </li>
                <li className="open"><a href="#">Abonnee <span className="category-widget-btn"></span></a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}

export default Affiliates;
