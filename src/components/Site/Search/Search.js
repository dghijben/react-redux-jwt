import _ from 'lodash';
import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import {mapDispatchToProps} from 'utils/functions';
import { connect } from 'react-redux';
import connectData from 'helpers/connectData';
import connectToFilter from 'helpers/connectToFilter';
import {Input} from 'react-bootstrap';
import List from './List';
import Pending from 'components/includes/Pending';
import {fetchDataDeferred} from './fetchDataDeferred';
import PageHeader from '../Includes/PageHeader';
let myTimeout = null;

@connectData(null, fetchDataDeferred)
@connectToFilter()
@connect(state=> {
  const obj = {
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer,
    'categories': state.store.categories,
    'accounts': state.store.accounts,
    'params': state.params
  };
  return obj;
}, mapDispatchToProps)
class Search extends React.Component {

  static propTypes = {
    'profile': PropTypes.object,
    'affiliates': PropTypes.object,
    'router': PropTypes.object,
    'params': PropTypes.object,
    'store': PropTypes.object,
    'dispatch': PropTypes.func,
    'switchPage': PropTypes.func,
    'getParams': PropTypes.func,
    'toggleOnStack': PropTypes.func,
    'onStack': PropTypes.func,
    'sortOnStack': PropTypes.func,
    'pushOnState': PropTypes.func,
    'inputOnStack': PropTypes.func
  };

  constructor() {
    super();
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.searchBar = this.searchBar.bind(this);
    this.pushSearch = this.pushSearch.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.filter = this.filter.bind(this);
    this.categories = this.categories.bind(this);
    this.categoryList = this.categoryList.bind(this);
    this.state = {
      affiliateIds: [],
      q: '',
      skip: 0
    };
  }

  componentWillMount() {
    this.setState({q: this.props.inputOnStack('q')});
  }

  componentDidMount() {
    if (_.has(this.props.params, 'scroll')) {
      window.scroll(0, _.get(this.props.params, 'scroll'));
    }
  }

  componentWillReceiveProps(nextProps) {
    const action = nextProps.router.location.action;
    if (action === 'POP' && this.state.skip === 0) {
      this.setState({q: nextProps.inputOnStack('q'), skip: false});
    }

    if (this.state.skip > 0) {
      this.setState({skip: this.state.skip - 1});
    }
  }

  pushSearch(e) {
    const value = e.target.value;
    this.setState({
      q: value,
      skip: 2
    }, () => {

      if (myTimeout) {
        clearTimeout(myTimeout);
      }

      myTimeout = setTimeout(() => {
        this.props.pushOnState('q', value);
      }, 500);
    });
  }

  clearTimer() {
    if (myTimeout) {
      clearTimeout(myTimeout);
    }
  }

  searchBar() {
    // TODO Reset value on POP state
    // console.log('Value' + this.props.inputOnStack('q'));
    return (
      <div className="panel panel-border-tb">
        <div className="panel-heading">
          <h4 className="pnael-title">Zoeken</h4>
        </div>
        <div className="panel-body">
          <Input type="text" placeholder="zoeken" onChange={this.pushSearch} onKeyDown={this.clearTimer}
                 value={this.state.q}/>
        </div>
      </div>);
  }

  categoryList() {
    const list = _.get(this.props, ['categories', 'list'], []);
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

  categories() {
    return (
      <div className="panel panel-border-tb">
        <div className="panel-heading">
          <h4 className="pnael-title">Categorieen</h4>
        </div>
        <div className="panel-body">
          <ul>
            {this.categoryList()}
          </ul>
        </div>
      </div>);
  }

  filter(name, key, item) {
    const checkBox = () => {
      if (this.props.onStack(name, item.id)) {
        return (<i className="fa fa-check-square-o pull-right"></i>);
      }
      return (<i className="fa fa-square-o pull-right"></i>);
    };

    return (
      <li key={key} onClick={() => { this.props.toggleOnStack(name, item.id); }}>
        {checkBox()}
        <i className="fa fa-angle-right"></i>
        {' '}
        {item.name}
      </li>
    );
  }


  render() {
    const {profile} = this.props;

    return (
      <div id="content" role="main" ref="main">
        <Helmet
          title={_.get(profile, 'name')}
          link={[
            {'rel': 'stylesheet', 'href': '/boss/css/jquery.selectbox.css', 'type': 'text/css', 'media': 'screen'}
          ]}
          script={[
            {'src': '/boss/js/jquery.selectbox.min.js'}
          ]}
        />
        <PageHeader
          title={_.get(profile, 'name')}
          links={[
            {to: '/', name: 'Home'},
            {to: '/dashboard', name: 'Dashboard'},
            {name: 'Account'}
          ]}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-md-push-3 ">
              <Pending state={_.get(this.props, ['accounts', 'pending'], false)}>
                <List
                  list={_.get(this.props, ['accounts', 'list'])}
                  switchPage={this.props.switchPage}
                  pushOnState={this.props.pushOnState}
                  inputOnStack={this.props.inputOnStack}
                />
              </Pending>
            </div>
            <aside className="col-md-3 col-md-pull-9 sidebar">
              <div className="widget">
                <div className="filter-group-widget">
                  <div className="panel-group">
                    {this.searchBar()}
                    {this.categories()}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

    );
  }
}
export default Search;
