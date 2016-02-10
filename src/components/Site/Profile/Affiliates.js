import _ from 'lodash';
import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import {mapDispatchToProps} from 'utils/functions';
import { connect } from 'react-redux';
import connectData from 'helpers/connectData';
import connectToFilter from 'helpers/connectToFilter';
import {Input} from 'react-bootstrap';
import ImageList from './ImageList';
import Pending from 'components/includes/Pending';
import {fetchDataDeferred1} from './fetchDataDeferred';
let myTimeout = null;

@connectData(null, fetchDataDeferred1)
@connectToFilter()
@connect(state=> {
  const obj = {
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer,
    'affiliates': state.store.affiliates,
    'categories': state.store.categories,
    'profile': _.get(state, 'store.profile.item.data', {}),
    'params': state.params
  };
  return obj;
}, mapDispatchToProps)
class Affiliates extends React.Component {

  static propTypes = {
    'profile': PropTypes.object,
    'affiliates': PropTypes.object,
    'router': PropTypes.object,
    'store': PropTypes.object,
    'params': PropTypes.object,
    'dispatch': PropTypes.func,
    'switchPage': PropTypes.func,
    'getParams': PropTypes.func,
    'toggleOnStack': PropTypes.func,
    'onStack': PropTypes.func,
    'alphabet': PropTypes.func,
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
          <h4 className="pnael-title">Categorieën</h4>
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
      <div>
        <Helmet
          title={_.get(profile, 'name')}
        />
        <div className="row pos-relative">
          <div className="col-md-9 col-md-push-3 ">
            <Pending state={_.get(this.props, ['affiliates', 'pending'], true)} failed={_.get(this.props, ['affiliates', 'failed'], true)}>
              <ImageList
                list={_.get(this.props, ['affiliates', 'list'])}
                switchPage={this.props.switchPage}
                pushOnState={this.props.pushOnState}
                inputOnStack={this.props.inputOnStack}
                profile={this.props.profile}
              />
            </Pending>
          </div>
          <aside className="col-md-3 col-md-pull-9 sidebar">
            <div className="widget">
              <div className="filter-group-widget">
                <div className="panel-group">
                  {this.searchBar()}
                  {this.categories()}
                  {this.props.alphabet()}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

    );
  }
}
export default Affiliates;
