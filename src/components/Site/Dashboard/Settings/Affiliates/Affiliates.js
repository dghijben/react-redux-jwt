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
import PageHeader from '../../../Includes/PageHeader';

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
}, mapDispatchToProps) class Affiliates extends React.Component {
  static propTypes = {
    'accounts': PropTypes.array,
    'account': PropTypes.object,
    'router': PropTypes.object,
    'store': PropTypes.object,
    'dispatch': PropTypes.func,
    'switchPage': PropTypes.func,
    'getParams': PropTypes.func,
    'toggleOnStack': PropTypes.func,
    'onStack': PropTypes.func,
    'sortOnStack': PropTypes.func
  };

  constructor() {
    super();
    this.categories = this.categories.bind(this);
    this.filter = this.filter.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.subscribeAll = this.subscribeAll.bind(this);
    this.updateState = this.updateState.bind(this);
    this.pushFilterToState = this.pushFilterToState.bind(this);
    this.affiliateState = this.affiliateState.bind(this);
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
          {affiliates: [e.target.value]}
        )
      );
    } else {
      this.props.dispatch(
        setAccountAffiliates(
          '/dashboard/settings/' + this.props.router.params.id + '/affiliates/detach-affiliate',
          {affiliates: [e.target.value]}
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
              <div>
                <div />
              </div>
            </label>
          </th>
          <th className="hover" onClick={() => { this.pushSortToState('name'); }}>Affiliate</th>
          <th className="hover" onClick={() => { this.pushSortToState('cpm'); }}>cpm</th>
          <th className="hover" onClick={() => { this.pushSortToState('cps'); }}>cps</th>
          <th className="hover" onClick={() => { this.pushSortToState('cpl'); }}>cpl</th>
          <th className="hover" onClick={() => { this.pushSortToState('cpc'); }}>cpc</th>
          <th className="hover" onClick={() => { this.pushSortToState('csr');} }>csr</th>
          <th className="hover" onClick={() => { this.pushSortToState('ecpc'); }}>ecpc</th>
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
                  <div>
                    <div />
                  </div>
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

  pushSortToState(field) {
    this.props.sortOnStack(field);
  }

  pushFilterToState(name, id) {
    this.props.toggleOnStack(name, id);
  }

  categories() {
    const list = _.get(this.props, ['store', 'categories', 'list'], []);
    if (list.length > 0) {
      return (
        <ul>
          {_.map(list, (category, key) => {
            return this.filter('c', key, category);
          })}
        </ul>
      );
    }
  }

  filter(name, key, item) {
    const checkBox = () => {
      if (this.props.onStack(name, item.id)) {
        return (<i className="fa fa-check-square-o pull-right"></i>);
      }
      return (<i className="fa fa-square-o pull-right"></i>);
    };

    return (
      <li key={key} onClick={() => { this.pushFilterToState(name, item.id); }}>
        {checkBox()}
        <i className="fa fa-angle-right"></i>
        {' '}
        {item.name}
      </li>
    );
  }

  affiliateState() {
    const state = [
      {'name': 'Wel abonnee', id: 1},
      {'name': 'Niet abonnee', id: 2}
    ];

    return (
      <ul>
        {_.map(state, (item, key) => {
          return this.filter('status', key, item);
        })}
      </ul>
    );
  }

  render() {
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
      <div>
        <PageHeader
          title="Affiliates koppelen"
          desc="Kies hier de affiliates die u op uw persoonlijke pagina wilt weergeven"
          links={[
            {name: 'Home', to: '/'},
            {name: 'Dashboard', to: '/dashboard'},
            {name: 'Affiliates'}
          ]}
          />

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
                    {this.affiliateState()}
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

export default Affiliates;

