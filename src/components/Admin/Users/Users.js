import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import {load, isLoaded } from '../../../redux/modules/admin/users/userActions';
import {connect} from 'react-redux';
import {DropdownButton, MenuItem} from 'react-bootstrap';

@connect(state=>({
  'users': state.users
})) class Users extends Component {

  static propTypes = {
    'users': PropTypes.object.isRequierd
  };

  static fetchDataDeferred(getState, dispatch) {
    if (!isLoaded(getState())) {
      return dispatch(load());
    }
  }

  users() {
    if (_.get(this.props, 'users.success', false) === true) {
      return _.map(_.get(this.props, 'users.data.data', []), (item, key) => {
        return (
          <tr key={key}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.created_at}</td>
            <td>{item.updated_at}</td>
            <td>
              <DropdownButton bsStyle="default" title="acties">
                <MenuItem eventKey="1">Action</MenuItem>
                <MenuItem eventKey="2">Another action</MenuItem>
                <MenuItem eventKey="3" active>Active Item</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4">Separated link</MenuItem>
              </DropdownButton>
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div id="content">
        <h2>Users</h2>
        <DropdownButton bsStyle="default" title="acties">
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
      </div>
    );
  }
}

export default Users;
