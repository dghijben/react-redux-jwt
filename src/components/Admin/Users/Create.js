import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from 'utils/functions';
import {Well, Row, Col} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import DynamicForm from 'redux-form-generator';
import validator from './ValidateEdit';
import {create} from 'redux/modules/admin/users/userActions';
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
    'history': PropTypes.object.isRequired,
    'users': PropTypes.object.isRequired,
    'token': PropTypes.string.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.getActionState = this.getActionState.bind(this);
    this.clearActionState = this.clearActionState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      showModal: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (_.get(nextProps, 'users.user.actionStatus.success') === true ) {
      this.props.history.pushState({}, '/admin/users/' + _.get(nextProps, 'users.user.id') + '/edit');
    }
  }

  componentWillUnmount() {
    // this.clearActionState();
  }

  getActionState() {
    return {
      success: _.get(this.props, 'users.user.actionStatus.success', false),
      failed: _.get(this.props, 'users.user.actionStatus.failed', false),
      pending: _.get(this.props, 'users.user.actionStatus.pending', false)
    };
  }

  clearActionState() {
    // this.props.dispatch(clearNetworkState());
  }

  handleSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(create(values))
        .then((ret)=> {
          if (_.has(ret, 'error')) {
            reject(ret.error);
          } else {
            resolve();
          }
        });
    });
  }

  render() {
    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Users', to: '/admin/users'},
      {name: 'nieuw'}
    ];

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>Nieuwe gebruiker
            </h1>
            <Row>
              <Col md={2} />
              <Col md={10}>
                <DynamicForm
                  checkKey={'userEdit-new'}
                  formName="userEdit"
                  formClass="form-horizontal"
                  fieldsNeeded={fields('new', this.props.token)}
                  initialValues={{}}
                  validate={validator}
                  onSubmit={this.handleSubmit}
                  getActionState={this.getActionState}
                  clearActionState={this.clearActionState}
                  />
              </Col>
            </Row>
          </Well>
        </div>
      </div>
    );
  }
} export default UserEdit;
