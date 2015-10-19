import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loadUser, isLoadedUser } from '../../../redux/modules/admin/users/userActions';
import {FormControls} from 'react-bootstrap';

@connect(state=>({
  'users': state.users,
  'router': state.router
}))
class UserShow extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    if (!isLoadedUser(state, state.router.params.userId)) {
      return dispatch(loadUser(state.router.params.userId));
    }
  }

  render() {
    return (
      <div>
        <div id="ribbon">
          <ol className="breadcrumb">
            <li><Link to="/admin">Admin</Link></li><li><Link to="/admin/users">Gebruikers</Link></li><li>{_.get(this.props, 'users.user.firstname', '')}</li>
          </ol>
        </div>

        <div id="content">
          <h1>Gebruiker <span>{_.get(this.props, 'users.user.firstname', '')}</span></h1>
          <form className="form-horizontal">
            <FormControls.Static labelClassName="col-md-3" wrapperClassName="col-md-9" label="Voorletters" value={_.get(this.props, 'users.user.initials', '')} />
            <FormControls.Static labelClassName="col-md-3" wrapperClassName="col-md-9" label="Voornamen" value={_.get(this.props, 'users.user.firstname', '')} />
            <FormControls.Static labelClassName="col-md-3" wrapperClassName="col-md-9" label="Tussenvoegsels" value={_.get(this.props, 'users.user.middlename', '')} />
            <FormControls.Static labelClassName="col-md-3" wrapperClassName="col-md-9" label="Achternaam" value={_.get(this.props, 'users.user.lastname', '')} />
            <FormControls.Static labelClassName="col-md-3" wrapperClassName="col-md-9" label="E-mail" value={_.get(this.props, 'users.user.email', '')} />
          </form>
        </div>
      </div>
    );
  }
}

export default UserShow;
