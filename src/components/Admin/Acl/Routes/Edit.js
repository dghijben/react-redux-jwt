import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, getActionStatus} from 'utils/functions';
import {Well, Row, Col} from 'react-bootstrap';
import Ribbon from 'components/Admin/includes/Ribbon';
import {Confirm} from 'components/includes';
import DynamicForm from 'redux-form-generator';
import UserPic from 'components/Admin/includes/UserPic';
import validator from './ValidateEdit';
import * as actions from 'redux/modules/admin/acl/roles/actions';
import fields, {reducerIndex, reducerItem, initialValues} from './fields';

@connect(state=>{
  const obj = {
    'token': state.authorization.token,
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)
class Edit extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'dispatch': PropTypes.func,
    'aclroutes': PropTypes.object.isRequired,
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

  componentWillUnmount() {
    this.clearActionState();
  }

  getActionState() {
    return getActionStatus(this.props, reducerIndex, reducerItem);
  }

  clearActionState() {
    this.props.dispatch(actions.clearNetworkState());
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const promises = [];
    if (!actions.isLoadedItem(state, state.router.params.id)) {
      promises.push(dispatch(actions.loadItem(state.router.params.id)));
    }
    return Promise.all(promises);
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
      dispatch(actions.update(this.props.router.params.id, values))
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
      {name: 'Routers', to: '/admin/acl/routes'},
      {name: _.get(this.props, [reducerIndex, reducerItem, ], 'unknown'), to: '/admin/users/' + _.get(this.props, 'router.params.userId')},
      {name: 'Wijzigen'}
    ];

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>Gebruiker
              <span>
                {' '} {_.get(this.props, [reducerIndex, reducerItem, 'firstname'], '')}
                {' '} {_.get(this.props, [reducerIndex, reducerItem, 'middlename'], '')}
                {' '} {_.get(this.props, [reducerIndex, reducerItem, 'lastname'], '')}
              </span>
            </h1>
            <Row>
              <Col md={2}>
                <UserPic responsive thumbnail pictures={_.get(this.props, [reducerIndex, reducerItem, 'picture'], [])} />
              </Col>
              <Col md={10}>
                <DynamicForm
                  checkKey={'userEdit-' + _.get(this.props, [reducerIndex, reducerItem, 'id'])}
                  formName="userEdit"
                  formClass="form-horizontal"
                  fieldsNeeded={fields(_.get(this.props, [reducerIndex, reducerItem, 'id']), this.props.token, _.get(this.props, 'acl.all', []))}
                  initialValues={initialValues(_.get(this.props, [reducerIndex, reducerItem]))}
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
} export default Edit;
