import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, getActionStatus} from 'utils/functions';
import {Well, Row, Col} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import DynamicForm from 'redux-form-generator';
import validator from './ValidateEdit';
import * as acl from 'redux/modules/admin/acl/roles/actions';
import {create} from 'redux/modules/data/actions';
import fields, {reducerIndex, reducerKey, reducerItem} from './fields';

@connect(state=>{
  const obj = {
    'token': state.authorization.token,
    'router': state.router,
    'aclRoles': state.aclRoles,
    'reduxRouterReducer': state.reduxRouterReducer
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)
class Create extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'dispatch': PropTypes.func,
    'history': PropTypes.object.isRequired,
    'users': PropTypes.object.isRequired,
    'aclRoles': PropTypes.object,
    'token': PropTypes.string.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.getActionState = this.getActionState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (_.get(nextProps, [reducerIndex, reducerKey, reducerItem, 'actionStatus', 'success']) === true ) {
      this.props.history.pushState({}, '/admin/users/' + _.get(nextProps, [reducerIndex, reducerKey, reducerItem, 'id']) + '/edit');
    }
  }

  getActionState() {
    return getActionStatus(this.props, [reducerIndex, reducerKey, reducerItem]);
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const promises = [];
    if (!acl.isAllLoaded(state)) {
      promises.push(dispatch(acl.loadAll()));
    }
    return Promise.all(promises);
  }

  handleSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(create(reducerKey, values))
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
      {name: 'Gebruikers', to: '/admin/users'},
      {name: 'Nieuw'}
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
                  checkKey={'userEdit-new-' + _.get(this.props, 'aclRoles.allStatus.success', false)}
                  formName="userEdit"
                  formClass="form-horizontal"
                  fieldsNeeded={fields('new', this.props.token)}
                  initialValues={{}}
                  validate={validator}
                  onSubmit={this.handleSubmit}
                  getActionState={this.getActionState}
                  />
              </Col>
            </Row>
          </Well>
        </div>
      </div>
    );
  }
} export default Create;
