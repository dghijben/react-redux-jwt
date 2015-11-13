import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadUser, destroyUser, isLoadedUser } from '../../../redux/modules/admin/users/actions';
import {Well, Row, Col, Button} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import {Confirm, Pending} from 'components/includes';
import DynamicForm from 'redux-form-generator';
import UserPic from 'components/Admin/includes/UserPic';
import * as acl from 'redux/modules/admin/acl/actions';
import {mapDispatchToProps} from 'utils/functions';
import fields, {reducerIndex, reducerItem, initialValues} from './fields';

@connect(state=>({
  'acl': state.acl,
  'users': state.users,
  'router': state.router
}), mapDispatchToProps)
class Show extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'acl': PropTypes.object.isRequired,
    'users': PropTypes.object.isRequired,
    'history': PropTypes.object,
    'dispatch': PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.close = this.close.bind(this);
    this.confirmed = this.confirmed.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.state = {
      showModal: false,
      modalSuccess: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (_.get(nextProps, 'users.user.deleted', false) === true) {
      this.props.history.pushState({}, '/admin/users');
    }
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const promises = [];
    if (!isLoadedUser(state, state.router.params.userId)) {
      promises.push(dispatch(loadUser(state.router.params.userId)));
    }
    if (!acl.isAllLoaded(state)) {
      promises.push(dispatch(acl.loadAll()));
    }
    return Promise.all(promises);
  }

  confirmDelete() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false, modalSuccess: false});
  }

  confirmed() {
    this.setState({showModal: false});
    this.props.dispatch(destroyUser(this.props.router.params.userId));
  }

  renderModal() {
    return (<Confirm showModal={this.state.showModal} close={this.close} confirmed={this.confirmed}/>);
  }

  render() {
    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Users', to: '/admin/users'},
      {name: _.get(this.props, 'users.user.firstname', 'unknown')},
    ];

    const editLink = () => {
      this.props.history.pushState({}, '/admin/users/' + _.get(this.props, 'router.params.userId') + '/edit');
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
                  <DynamicForm
                    checkKey={'userEdit-' + _.get(this.props, [reducerIndex, reducerItem, 'id'])}
                    formName="userEdit"
                    formClass="form-horizontal"
                    fieldsNeeded={fields(_.get(this.props, [reducerIndex, reducerItem, 'id']), null, _.get(this.props, 'acl.all', []))}
                    initialValues={initialValues(_.get(this.props, [reducerIndex, reducerItem]))}
                    static
                  />
                  <Row>
                    <Col md={10} mdOffset={2}>
                      <Button bsStyle="primary" onClick={editLink}>wijzigen</Button>
                      {' '}
                      <Button bsStyle="danger" onClick={this.confirmDelete}>verwijderen</Button>
                    </Col>
                  </Row>
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

export default Show;