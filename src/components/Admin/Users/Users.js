import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import { load } from '../../../redux/modules/admin/users/userActions';
import { storeState } from '../../../redux/modules/reduxRouter/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import {Well} from 'react-bootstrap';
const queryString = require('query-string');
import SearchForm from '../includes/SearchForm';
import DataTable from '../includes/DataTable';
import Ribbon from '../includes/Ribbon';

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    pushState: bindActionCreators(pushState, dispatch)
  };
}

@connect(state=>({
  'users': state.users,
  'router': state.router,
  'reduxRouterReducer': state.reduxRouterReducer
}), mapDispatchToProps)

class Users extends Component {

  static propTypes = {
    'users': PropTypes.object,
    'router': PropTypes.object,
    'reduxRouterReducer': PropTypes.object,
    'fields': PropTypes.object,
    'history': PropTypes.object,
    'pushState': PropTypes.func,
    'dispatch': PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.switchPage = this.switchPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.pushState = this.pushState.bind(this);
    this.state = {
      searchForm: {}
    };
  }

  componentWillMount() {
    const pathname = this.props.router.location.pathname;

    this.setState({
      searchForm: {
        search: _.get(this.props.router, 'location.query.search') || _.get(this.props, 'reduxRouterReducer.routes[' + pathname + '].searchForm.search', ''),
        searchField: _.get(this.props.router, 'location.query.searchField') || _.get(this.props, 'reduxRouterReducer.routes[' + pathname + '].searchForm.searchField', '')
      }
    });
    this.pushState();
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const params = {};

    if (_.has(state.router, 'location.query.page')) {
      params.page = _.get(state.router, 'location.query.page');
    }
    if (_.has(state.router, 'location.query.search')) {
      params.search = _.get(state.router, 'location.query.search');
    }
    if (_.has(state.router, 'location.query.searchField')) {
      params.searchField = _.get(state.router, 'location.query.searchField');
    }

    return dispatch(load(params));
  }

  pushState() {
    const q = queryString.stringify({
      page: this.state.page,
      search: _.get(this.state, 'searchForm.search'),
      searchField: _.get(this.state, 'searchForm.searchField')
    });
    this.props.dispatch(storeState(this.props.router.location.pathname, this.state));
    this.props.pushState(null, _.get(this.props.router, 'location.pathname') + '?' + q);
  }

  switchPage(page) {
    this.setState({page: page}, this.pushState);
  }

  handleSearch(data) {
    this.setState({searchForm: {...data}, page: 1}, this.pushState);
  }

  render() {
    const lastPage = _.get(this.props, 'users.list.last_page', 0);
    const currentPage = _.get(this.props, 'users.list.current_page', 0);
    const dropDownFields = [
      {default: 'Alle'},
      {name: 'Voornaam', field: 'firstname'},
      {name: 'Achternaam', field: 'lastname'},
      {name: 'Volledige naam', field: 'fullname'},
      {name: 'E-mail', field: 'email'}
    ];

    const click1 = (item) => {
      this.props.history.pushState({}, '/admin/users/' + item.id);
    };

    const click2 = () => {
      console.log('CLick 2');
    };

    const dataTable = (<DataTable
      cols={[
        {name: 'Naam', show: ['firstname', 'middlename', 'lastname']},
        {name: 'Email', show: 'email'},
        {name: 'Aangemaakt', show: 'created_at'},
        {name: 'Gewijzigd', show: 'updated_at'},
        {name: 'Acties', dropdownButton: [
          {name: 'wijzigen', onClick: click1},
          {divider: true},
          {name: 'verwijder', onClick: click2},
        ]}
      ]}
      records={_.get(this.props, 'users.list.data', [])}
      paginator={{
        currPage: currentPage,
        lastPage: lastPage,
        onChange: this.switchPage
      }}
      />);

    const breadcrumps = [
      {name: 'Admin', to: '/admin'},
      {name: 'Users'}
    ];

    return (
      <div>
        <Ribbon breadcrumps={breadcrumps}/>
        <div id="content">
          <Well>
            <h1>Gebruikers</h1>
            <SearchForm placeHolder="...zoeken" dropDownTitle="alles" dropDown={dropDownFields} onSubmit={this.handleSearch} initialValues={this.state.searchForm}/>
            {dataTable}
          </Well>
        </div>
      </div>
    );
  }
}

export default Users;
