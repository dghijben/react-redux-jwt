import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import {load, isLoaded } from '../../../redux/modules/admin/users/userActions';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {bootstrapSelectLink} from 'utils/bootstrapLink';
const Paginator = require('react-laravel-paginator');

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    pushState: bindActionCreators(pushState, dispatch)
  };
}

@connect(state=>({
  'users': state.users,
  'router': state.router,
}), mapDispatchToProps ) class Users extends Component {

  static propTypes = {
    'users': PropTypes.object,
    'router': PropTypes.object,
    'history': PropTypes.object,
    'pushState': PropTypes.func,
    'dispatch': PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.switchPage = this.switchPage.bind(this);
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const params = {};
    if (_.has(state.router, 'location.query.page')) {
      params.page = _.get(state.router, 'location.query.page');
    }
    if (!isLoaded(state, params)) {
      return dispatch(load(params));
    }
  }

  switchPage(page) {
    this.props.pushState({users: this.props.users, mango: 'kipkaas'}, _.get(this.props.router, 'location.pathname') + '?page=' + page);
    // this.props.dispatch(load({page: page}));
  }

  users() {
    if (_.has(this.props, 'users.list.data') === true) {
      return _.map(_.get(this.props, 'users.list.data', []), (item, key) => {
        return (
          <tr key={key}>
            <td><input type="checkbox" /></td>
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
                <MenuItem divider />
                <MenuItem eventKey="2" {...bootstrapSelectLink(this.props.history, null, '/dashboard')}>verwijderen</MenuItem>
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

    return (
      <div id="content">
        <h2>Users</h2>
        <DropdownButton bsStyle="default" title="acties" id="xxx">
          <MenuItem eventKey="1">Action</MenuItem>
          <MenuItem eventKey="2">Another action</MenuItem>
          <MenuItem eventKey="3" active>Active Item</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4">Separated link</MenuItem>
        </DropdownButton>
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
        </div>
        <Paginator currPage={currentPage} lastPage={lastPage} onChange={this.switchPage} />
      </div>
    );
  }
}

export default Users;
