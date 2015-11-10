import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from 'utils/functions';
import {Well, Row, Col} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import {Confirm} from 'components/includes';
import DynamicForm from 'redux-form-generator';
import UserPic from 'components/Admin/includes/UserPic';
import validator from './ValidateEdit';
import {loadRecord, isLoadedRecord, update, clearNetworkState} from 'redux/modules/admin/affiliates/actions';
import {reducerIndex, reducerItem, path} from './constants';
import {fields} from './fields';

@connect(state=>({
  'token': state.authorization.token,
  'users': state.users,
  'router': state.router
}), mapDispatchToProps)
class Edit extends Component {

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

  componentWillUnmount() {
    this.clearActionState();
  }

  getActionState() {
    return {
      success: _.get(this.props, [reducerIndex, reducerItem, 'actionStatus', 'success'], false),
      failed: _.get(this.props, [reducerIndex, reducerItem, 'actionStatus', 'failed'], false),
      pending: _.get(this.props, [reducerIndex, reducerItem, 'actionStatus', 'pending'], false)
    };
  }

  clearActionState() {
    this.props.dispatch(clearNetworkState());
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    if (!isLoadedRecord(state, state.router.params.id)) {
      return dispatch(loadRecord(state.router.params.id));
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
      dispatch(update(this.props.router.params.id, values))
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
      {name: 'Users', to: '/admin/' + path},
      {name: _.get(this.props, [reducerIndex, reducerItem, 'name'], 'unknown'), to: '/admin/' + path + '/' + _.get(this.props, 'router.params.id')},
      {name: 'Wijzigen'}
    ];

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>Affiliate
              <span>
                {' '} {_.get(this.props, [reducerIndex, reducerItem, 'name'], '')}
              </span>
            </h1>
            <Row>
              <Col md={2}>
                <UserPic responsive thumbnail pictures={_.get(this.props, [reducerIndex, reducerItem, 'picture'], [])} />
              </Col>
              <Col md={10}>
                <DynamicForm
                  checkKey={'edit-' + _.get(this.props, [reducerIndex, reducerItem, 'id'])}
                  formName="userEdit"
                  formClass="form-horizontal"
                  fieldsNeeded={fields(_.get(this.props, [reducerIndex, reducerItem, 'id']), this.props.token)}
                  initialValues={_.get(this.props, [reducerIndex, reducerItem])}
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

