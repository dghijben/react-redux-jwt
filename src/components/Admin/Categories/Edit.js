import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from 'utils/functions';
import {loadUser, isLoadedUser } from '../../../redux/modules/admin/users/userActions';
import {Well, Row, Col} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import {Confirm} from 'components/includes';
import DynamicForm from 'redux-form-generator';
import UserPic from 'components/Admin/includes/UserPic';
import validator from './ValidateEdit';
import {update, clearNetworkState} from 'redux/modules/admin/users/userActions';
import fields from './fields';

@connect(state=>({
  'token': state.authorization.token,
  'users': state.users,
  'router': state.router
}), mapDispatchToProps)
class UserEdit extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'dispatch': PropTypes.func,
    'users': PropTypes.object.isRequired,
    'token': PropTypes.string.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.close = this.close.bind(this);
    this.confirmed = this.confirmed.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.getActionState = this.getActionState.bind(this);
    this.clearActionState = this.clearActionState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      showModal: false
    };
  }

/*  shouldComponentUpdate(nextProps: Object) {
    // Important when using dynamic redux forms and serverside validation on submit

    let updateComponent = true;
    if (deepEqual(_.get(nextProps, 'users.user.id'), _.get(this.props, 'users.user.id'))) {
      updateComponent = false;
    }

    return updateComponent;
  }*/

  componentWillUnmount() {
    this.clearActionState();
  }

  getActionState() {
    return {
      success: _.get(this.props, 'users.user.actionUpdate.success', false),
      failed: _.get(this.props, 'users.user.actionUpdate.failed', false),
      pending: _.get(this.props, 'users.user.actionUpdate.pending', false)
    };
  }

  clearActionState() {
    this.props.dispatch(clearNetworkState());
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

  handleSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(update(this.props.router.params.userId, values))
        .then((ret)=> {
          if (_.has(ret, 'error')) {
            reject(ret.error);
          } else {
            resolve();
          }
        });
    });
  }

  renderModal() {
    return (<Confirm showModal={this.state.showModal} close={this.close} confirmed={this.confirmed} />);
  }

  render() {
    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Users', to: '/admin/users'},
      {name: _.get(this.props, 'users.user.firstname', 'unknown'), to: '/admin/users/' + _.get(this.props, 'router.params.userId')},
      {name: 'Wijzigen'}
    ];

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
                <DynamicForm
                  checkKey={'userEdit-' + _.get(this.props, 'users.user.id')}
                  formName="userEdit"
                  formClass="form-horizontal"
                  fieldsNeeded={fields(this.props.users.user.id, this.props.token)}
                  initialValues={_.get(this.props, 'users.user')}
                  validate={validator}
                  onSubmit={this.handleSubmit}
                  getActionState={this.getActionState}
                  clearActionState={this.clearActionState}
                  />
              </Col>
            </Row>
          </Well>
        </div>
        {this.renderModal()}
      </div>
    );
  }
} export default UserEdit;