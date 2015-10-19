import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {connectReduxForm} from 'redux-form';
import {loadUser, isLoadedUser } from '../../../redux/modules/admin/users/userActions';
import {Row, Col, Input} from 'react-bootstrap';
import ButtonState from '../../Includes/ButtonState';
import formWrap from '../../Includes/FormWrap';

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
    return (
      <div>
        <div id="ribbon">
          <ol className="breadcrumb">
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/admin/users">Gebruikers</Link></li>
            <li><Link to={'/admin/users/' + _.get(this.props, 'users.user.id', '')}>{_.get(this.props, 'users.user.firstname', '')}</Link></li>
            <li>Wijzigen</li>
          </ol>
        </div>

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
const AfterConnect = connectReduxForm({
  form: 'form',
  fields: ['initials', 'firstname', 'middlename', 'lastname', 'email'],
})(BeforeConnect);

export default AfterConnect;
