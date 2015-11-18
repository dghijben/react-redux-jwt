import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Well, Row, Col, Button} from 'react-bootstrap';
import Ribbon from 'components/Admin/includes/Ribbon';
import {Confirm, Pending} from 'components/includes';
import DynamicForm from 'redux-form-generator';
import * as actions from 'redux/modules/data/actions';
import {mapDispatchToProps} from 'utils/functions';
import fields, {path, reducerIndex, reducerKey, reducerItem, initialValues} from './fields';

@connect(state=>{
  const obj = {
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)
class Show extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'aclRoles': PropTypes.object.isRequired,
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
    if (_.get(nextProps, [reducerIndex, reducerKey, reducerItem, 'deleted'], false) === true) {
      this.props.history.pushState({}, '/admin/' + reducerIndex);
    }
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const promises = [];
    if (!actions.isLoadedItem(reducerKey, state, state.router.params.id)) {
      promises.push(dispatch(actions.loadItem(reducerKey, state.router.params.id)));
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
    this.props.dispatch(actions.destroyItem(reducerKey, this.props.router.params.id));
  }

  renderModal() {
    return (<Confirm showModal={this.state.showModal} close={this.close} confirmed={this.confirmed}/>);
  }

  render() {
    const item = _.get(this.props, [reducerIndex, reducerKey, reducerItem], {});

    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Acl', to: '/admin/acl'},
      {name: _.get(item, ['desc'], 'unknown')},
    ];

    const editLink = () => {
      this.props.history.pushState({}, '/admin/' + path + '/' + _.get(this.props, 'router.params.id') + '/edit');
    };

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>Rol
              <span>
                {' '} {_.get(item, ['desc'], '')}
              </span>
            </h1>

            <Row>
              <Col md={2}>
                .
              </Col>
              <Col md={10}>
                <Pending state={_.get(item, ['pending'], false)}>
                  <DynamicForm
                    checkKey={reducerIndex + reducerKey + reducerItem + _.get(item, ['id'])}
                    formName={reducerIndex + '_' + reducerKey + '_' + reducerItem}
                    formClass="form-horizontal"
                    fieldsNeeded={fields(_.get(item, ['id']))}
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
