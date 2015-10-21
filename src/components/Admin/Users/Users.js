import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import { load } from '../../../redux/modules/admin/users/userActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import {Well, DropdownButton, MenuItem} from 'react-bootstrap';
import {bootstrapSelectLink} from 'utils/bootstrapLink';
const queryString = require('query-string');
const Paginator = require('react-laravel-paginator');
import SearchForm from '../includes/SearchForm';

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    pushState: bindActionCreators(pushState, dispatch)
  };
}

@connect(state=>({
  'users': state.users,
  'router': state.router,
}), mapDispatchToProps)

class Users extends Component {

  static propTypes = {
    'users': PropTypes.object,
    'router': PropTypes.object,
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
      searchForm: {search: 'lala'}
    };
  }

  componentWillMount() {
    this.setState({searchForm: {search: _.get(this.props.router, 'location.query.search')}});
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

    // if (!isLoaded(state, params)) {
    return dispatch(load(params));
    // }
  }

  pushState() {
    const q = queryString.stringify({
      page: this.state.page,
      search: _.get(this.state, 'searchForm.search')
    });
    this.props.pushState(null, _.get(this.props.router, 'location.pathname') + '?' + q);
  }

  switchPage(page) {
    this.setState({page: page}, this.pushState);
  }

  handleSearch(data) {
    this.setState({searchForm: {...data}, page: 1}, this.pushState);
  }

  users() {
    if (_.has(this.props, 'users.list.data') === true) {
      return _.map(_.get(this.props, 'users.list.data', []), (item, key) => {
        return (
          <tr key={key}>
            <td><input type="checkbox"/></td>
            <td>
              {item.firstname}
              {' '}
              {item.middlename}
              {' '}
              {item.lastname}
            </td>
            <td>{item.email}</td>
            <td>{item.created_at}</td>
            <td>{item.updated_at}</td>
            <td>
              <DropdownButton bsStyle="default" title="acties" id="acties">
                <MenuItem eventKey="1" {...bootstrapSelectLink(this.props.history, null, '/admin/users/' + item.id)}>wijzigen</MenuItem>
                <MenuItem divider/>
                <MenuItem
                  eventKey="2" {...bootstrapSelectLink(this.props.history, null, '/dashboard')}>verwijderen</MenuItem>
              </DropdownButton>
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    const lastPage = _.get(this.props, 'users.list.last_page', 0);
    const currentPage = _.get(this.props, 'users.list.current_page', 0);
    const paged = <Paginator currPage={currentPage} lastPage={lastPage} onChange={this.switchPage}/>;
    const dropDownFields = [
      {default: 'Allexx'},
      {title: 'Voornaam', field: 'firstname'},
      {title: 'Achternaam', field: 'lastname'},
      {title: 'Volledige naam', field: 'fullname'},
      {title: 'E-mail', field: 'email'}
    ];

    return (
      <div id="content">
        <Well>
          <h1>Gebruikers</h1>
          <SearchForm placeHolder="...zoeken" dropDownTitle="alles" dropDown={dropDownFields} onSubmit={this.handleSearch} initialValues={{search: this.state.searchForm.search}}/>

          {paged}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
              <tr>
                <th></th>
                <th>Naam</th>
                <th>E-mail</th>
                <th>Aangemaakt</th>
                <th>Gewijzigd</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {this.users()}
              </tbody>
            </table>
            {paged}
          </div>

        </Well>
      </div>
    );
  }
}

export default Users;
