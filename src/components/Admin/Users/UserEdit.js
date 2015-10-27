import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {loadUser, isLoadedUser } from '../../../redux/modules/admin/users/userActions';
import {Row, Col, Input} from 'react-bootstrap';
import ButtonState from '../../Includes/ButtonState';
import formWrap from '../../Includes/FormWrap';
import Ribbon from '../includes/Ribbon';

@connect(state=>({
  'users': state.users,
  'router': state.router
}))
class UserEdit extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired
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
      {name: _.get(this.props, 'fields.firstname', 'unknown'), to: ('/admin/users/' + _.get(this.props, 'fields.id'))},
      {name: 'wijzigen'}
    ];

    return (
      <div>
        <Ribbon breadcrumps={breadcrumps}/>

        <div id="content">
          <h1>Gebruiker <span>{_.get(this.props, 'users.user.firstname', '')}</span></h1>
          <form className="form-horizontal">
            <Input {...this.props.fields.inititals} type="text" labelClassName="col-md-3" wrapperClassName="col-md-9" label="Voorletters" value={_.get(this.props, 'users.user.initials', '')} />
            <Input type="text" labelClassName="col-md-3" wrapperClassName="col-md-9" label="Voornamen" value={_.get(this.props, 'users.user.firstname', '')} />
            <Input type="text" labelClassName="col-md-3" wrapperClassName="col-md-9" label="Tussenvoegsels" value={_.get(this.props, 'users.user.middlename', '')} />
            <Input type="text" labelClassName="col-md-3" wrapperClassName="col-md-9" label="Achternaam" value={_.get(this.props, 'users.user.lastname', '')} />
            <Input type="text" labelClassName="col-md-3" wrapperClassName="col-md-9" label="E-mail" value={_.get(this.props, 'users.user.email', '')} />
            <Row>
              <Col md={9} mdOffset={3}>
                <ButtonState bsStyle="primary" fa="fa-save">opslaan</ButtonState>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    );
  }
}


const BeforeConnect = formWrap(UserEdit);
const AfterConnect = reduxForm({
  form: 'form',
  fields: ['initials', 'firstname', 'middlename', 'lastname', 'email'],
})(BeforeConnect);

export default AfterConnect;
