import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadUser, isLoadedUser } from '../../../redux/modules/admin/users/userActions';
import {FormControls} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import Pending from 'components/Includes/Pending';
import Failed from 'components/Includes/Failed';

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
    const breadcrumps = [
      {name: 'Admin', to: '/admin'},
      {name: 'Users', to: '/admin/users'},
      {name: _.get(this.props, 'fields.firstname', 'unknown')},
    ];

    return (
      <div>
        <Ribbon breadcrumps={breadcrumps}/>
        <Pending state={_.get(this.props, 'users.user.pending', false)}/>
        <Failed state={_.get(this.props, 'users.user.failed', false)}/>
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
