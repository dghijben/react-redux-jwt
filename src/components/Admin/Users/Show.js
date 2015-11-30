import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadItem, destroyItem, isLoadedItem } from 'redux/modules/data/actions';
import {Well, Row, Col, Button} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import {Confirm, Pending} from 'components/includes';
import DynamicForm from 'redux-form-generator';
import UserPic from 'components/Admin/includes/UserPic';
import * as acl from 'redux/modules/admin/acl/roles/actions';
import {mapDispatchToProps} from 'utils/functions';
import fields, {reducerIndex, reducerKey, reducerItem, initialValues} from './fields';

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
class Show extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'aclRoles': PropTypes.object,
    'data': PropTypes.object.isRequired,
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
    if (!acl.isAllLoaded(state)) {
      promises.push(dispatch(acl.loadAll()));
    }

    if (!isLoadedItem(reducerKey, state, state.router.params.userId)) {
      promises.push(dispatch(loadItem(reducerKey, state.router.params.userId)));
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
    this.props.dispatch(destroyItem(reducerKey, this.props.router.params.userId));
  }

  renderModal() {
    return (<Confirm showModal={this.state.showModal} close={this.close} confirmed={this.confirmed}/>);
  }

  render() {
    const item = _.get(this.props, [reducerIndex, reducerKey, reducerItem], {});
    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Users', to: '/admin/users'},
      {name: _.get(this.props, [reducerIndex, reducerKey, reducerItem, 'firstname'], '')},
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
                 {' '} {_.get(item, ['firstname'], '')}
                {' '} {_.get(item, ['middlename'], '')}
                {' '} {_.get(item, ['lastname'], '')}
              </span>
            </h1>

            <Row>
              <Col md={2}>
                <UserPic responsive thumbnail pictures={_.get(item, ['picture'], [])} />
              </Col>
              <Col md={10}>
                <Pending state={_.get(this.props, [reducerIndex, reducerKey, reducerItem, 'pending'], false)}>
                  <DynamicForm
                    checkKey={'userEdit-' + _.get(item, ['id'])}
                    formName="userEdit"
                    formClass="form-horizontal"
                    fieldsNeeded={fields(_.get(item, ['id']), null, _.get(this.props, 'aclRoles.all', []))}
                    initialValues={initialValues(item)}
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
