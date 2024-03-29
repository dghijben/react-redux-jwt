import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Well, Row, Col, Button} from 'react-bootstrap';
import Ribbon from 'components/Admin/includes/Ribbon';
import {Confirm, Pending} from 'components/includes';
import DynamicForm from 'redux-form-generator';
import * as acl from 'redux/modules/admin/acl/roles/actions';
import {mapDispatchToProps} from 'utils/functions';
import fields, {reducerIndex, reducerItem, initialValues} from './fields';

@connect(state=>({
  'acl': state.acl,
  'router': state.router
}), mapDispatchToProps)
class Show extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'acl': PropTypes.object.isRequired,
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
    if (_.get(nextProps, [reducerIndex, reducerItem, 'deleted'], false) === true) {
      this.props.history.pushState({}, '/admin/' + reducerIndex);
    }
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const promises = [];
    if (!acl.isLoadedItem(state, state.router.params.id)) {
      promises.push(dispatch(acl.loadItem(state.router.params.id)));
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
    this.props.dispatch(acl.destroyItem(this.props.router.params.id));
  }

  renderModal() {
    return (<Confirm showModal={this.state.showModal} close={this.close} confirmed={this.confirmed}/>);
  }

  render() {
    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Acl', to: '/admin/acl'},
      {name: _.get(this.props, [reducerIndex, reducerItem, 'desc'], 'unknown')},
    ];

    const editLink = () => {
      this.props.history.pushState({}, '/admin/' + reducerIndex + '/' + _.get(this.props, 'router.params.id') + '/edit');
    };

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>Rol
              <span>
                {' '} {_.get(this.props, [reducerIndex, reducerItem, 'desc'], '')}
              </span>
            </h1>

            <Row>
              <Col md={2}>
                Extra info?
              </Col>
              <Col md={10}>
                <Pending state={_.get(this.props, [reducerIndex, reducerItem, 'pending'], false)}>
                  <DynamicForm
                    checkKey={reducerIndex + '_' + reducerItem + _.get(this.props, [reducerIndex, reducerItem, 'id'])}
                    formName={reducerIndex + '_' + reducerItem}
                    formClass="form-horizontal"
                    fieldsNeeded={fields(_.get(this.props, [reducerIndex, reducerItem, 'id']))}
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
