import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadUser, isLoadedUser } from '../../../redux/modules/admin/users/userActions';
import {Well, Row, Col, FormControls, Button} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import {Confirm, Pending} from 'components/includes';
import UserPic from 'components/Admin/includes/UserPic';

@connect(state=>({
  'users': state.users,
  'router': state.router
}))
class UserShow extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'users': PropTypes.object.isRequired,
    'history': PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.close = this.close.bind(this);
    this.confirmed = this.confirmed.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.state = {
      showModal: false
    };
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    if (!isLoadedUser(state, state.router.params.userId)) {
      return dispatch(loadUser(state.router.params.userId));
    }
  }

  confirmDelete() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  confirmed() {
    this.setState({showModal: false});
  }

  renderModal() {
    return (<Confirm showModal={this.state.showModal} close={this.close} confirmed={this.confirmed} />);
  }

  render() {
    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Users', to: '/admin/users'},
      {name: _.get(this.props, 'users.user.firstname', 'unknown')},
    ];

    const editLink = () => {
      this.props.history.pushState({}, '/admin/users/' + _.get(this.props, 'users.user.id') + '/edit');
    };

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>Gebruiker
              <span>
                {' '} {_.get(this.props, 'users.user.firstname', '')}
                {' '} {_.get(this.props, 'users.user.middlename', '')}
                {' '} {_.get(this.props, 'users.user.lastname', '')}
              </span>
            </h1>

            <Row>
              <Col md={2}>
                <UserPic responsive thumbnail pictures={_.get(this.props, 'users.user.picture', [])} />
              </Col>
              <Col md={10}>
                <Pending state={_.get(this.props, 'users.user.pending', false)}>
                  <form className="form-horizontal">
                    <FormControls.Static labelClassName="col-md-3" wrapperClassName="col-md-9" label="Voorletters" value={_.get(this.props, 'users.user.initials', '')} />
                    <FormControls.Static labelClassName="col-md-3" wrapperClassName="col-md-9" label="Voornamen" value={_.get(this.props, 'users.user.firstname', '')} />
                    <FormControls.Static labelClassName="col-md-3" wrapperClassName="col-md-9" label="Tussenvoegsels" value={_.get(this.props, 'users.user.middlename', '')} />
                    <FormControls.Static labelClassName="col-md-3" wrapperClassName="col-md-9" label="Achternaam" value={_.get(this.props, 'users.user.lastname', '')} />
                    <FormControls.Static labelClassName="col-md-3" wrapperClassName="col-md-9" label="E-mail" value={_.get(this.props, 'users.user.email', '')} />
                    <Row>
                      <Col md={9} mdOffset={3}>
                        <Button bsStyle="primary" onClick={editLink}>wijzigen</Button>
                        {' '}
                        <Button bsStyle="danger" onClick={this.confirmDelete}>verwijderen</Button>
                      </Col>
                    </Row>
                  </form>
                </Pending>
              </Col>
            </Row>
          </Well>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default UserShow;
