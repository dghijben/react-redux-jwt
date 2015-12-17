import _ from 'lodash';
import React, {PropTypes} from 'react';
import Paginator from 'react-laravel-paginator';
import {reducerIndex, reducerKey} from './settings';
import {mapDispatchToProps} from 'utils/functions';
import { connect } from 'react-redux';
import {setAccountAffiliates} from 'redux/modules/auth/authActions';
import connectData from 'helpers/connectData';
import connectToFilter from 'helpers/connectToFilter';
import fetchDataDeferred from './fetchDataDeferred';

@connectData(null, fetchDataDeferred)
@connectToFilter()
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
    'accounts': PropTypes.array,
    'account': PropTypes.object,
    'router': PropTypes.object,
    'store': PropTypes.object,
    'dispatch': PropTypes.func,
    'switchPage': PropTypes.func,
    'getParams': PropTypes.func,
    'toggleOnStack': PropTypes.func,
    'onStack': PropTypes.func
  };

  constructor() {
    super();
    this.categories = this.categories.bind(this);
    this.category = this.category.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.subscribeAll = this.subscribeAll.bind(this);
    this.updateState = this.updateState.bind(this);
    this.pushCategoryToState = this.pushCategoryToState.bind(this);
    this.state = {
      affiliateIds: []
    };
  }

  componentWillMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateState(nextProps);
  }

  updateState(props) {
    const accountId = props.router.params.id;
    const accountIndex = _.findIndex(_.get(props, 'accounts', []), 'id', parseInt(accountId, 10));
    const affiliateIds = _.pluck(_.get(this.props.accounts, [accountIndex, 'affiliate_ids']), 'affiliate_id');

    if (this.state.affiliateIds !== affiliateIds) {
      this.setState({affiliateIds: affiliateIds});
    }
  }

  subscribeAll(e) {

    const params = this.props.getParams();
    if (e.target.checked === true) {
      this.props.dispatch(
          setAccountAffiliates(
            '/dashboard/settings/' + this.props.router.params.id + '/affiliates/attach-all-affiliate',
            params
          )
      );
    } else {
      this.props.dispatch(
          setAccountAffiliates(
            '/dashboard/settings/' + this.props.router.params.id + '/affiliates/detach-all-affiliate',
            params
          )
      );
    }
  }

  subscribe(e) {
    if (e.target.checked === true) {
      this.props.dispatch(
          setAccountAffiliates(
            '/dashboard/settings/' + this.props.router.params.id + '/affiliates/attach-affiliate',
            {affiliates: [e.target.value] }
          )
      );
    } else {
      this.props.dispatch(
          setAccountAffiliates(
            '/dashboard/settings/' + this.props.router.params.id + '/affiliates/detach-affiliate',
            { affiliates: [e.target.value] }
          )
      );
    }
  }

  sites() {
    return (
      <table className="table table-bordered table-hover table-condensed">
        <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox"
                     className="ios-switch tinyswitch"
                     onChange={this.subscribeAll}
              />
              <div><div /></div>
            </label>
          </th>
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

        {_.map(_.get(this.props, [reducerIndex, reducerKey, 'list', 'data'], []), (item, key) => {
          return (
            <tr key={key}>
              <td>
                <label>
                  <input type="checkbox"
                         className="ios-switch tinyswitch"
                         value={item.id}
                         onChange={this.subscribe}
                         checked={(this.state.affiliateIds.indexOf(item.id) > -1)}

                  />
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


  pushCategoryToState(category) {
    this.props.toggleOnStack('category', category);

  }

  categories() {
    const {store: {categories: {list}}} = this.props;
    if (!!list && list.length > 0) {
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

    const checkBox = () => {
      if (this.props.onStack('category', category.id)) {
        return (<i className="fa fa-check-square-o pull-right"></i>);
      }

      return (<i className="fa fa-square-o pull-right"></i>);
    };


    return (
      <li key={key} onClick={() => { this.pushCategoryToState(category.id); }}>
        {checkBox()}
        <i className="fa fa-angle-right"></i>
        {' '}
        {category.name}
      </li>
    );
  }

  render() {
    // console.log(this.props);
    const paged = () => {
      const list = _.get(this.props, [reducerIndex, reducerKey, 'list']);
      if (list) {
        const currentPage = list.current_page;
        const lastPage = list.last_page;
        return <Paginator currPage={currentPage} lastPage={lastPage} onChange={this.props.switchPage}/>;
      }
    };

    const pagedCalled = paged();

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-md-push-3">
            {pagedCalled}

            {this.sites()}

            {pagedCalled}
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
