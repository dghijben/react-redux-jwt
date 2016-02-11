import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import {mapDispatchToProps, getActionStatus} from 'utils/functions';
import {Well, Row, Col} from 'react-bootstrap';
import Ribbon from 'components/Admin/includes/Ribbon';
import {Confirm} from 'components/includes';
import DynamicForm from 'redux-form-generator';
import UserPic from 'components/Admin/includes/UserPic';
import validator from './ValidateEdit';
import * as actions from 'redux/modules/data/actions';
import fields, {reducerIndex, reducerKey, reducerItem, initialValues, fetchDataDeferred, reducerKeySites} from './fields';

@connectData(null, fetchDataDeferred)
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
    'token': PropTypes.string.isRequired
  };

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
    return getActionStatus(this.props, [reducerIndex, reducerKey, reducerItem]);
  }

  clearActionState() {
    this.props.dispatch(actions.clearNetworkState(reducerKey));
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
      dispatch(actions.update(reducerKey, this.props.router.params.id, values))
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
      {name: 'Accounts', to: '/admin/accounts'},
      {name: 'Categorieen', to: '/admin/accounts/categories'},
      {name: _.get(this.props, [reducerIndex, reducerKey, reducerItem, 'name'], 'unknown'), to: '/admin/accounts/categories/' + _.get(this.props, [reducerIndex, reducerKey, reducerItem, 'id'])},
      {name: 'wijzigen'}
    ];
    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>Site
              <span>
                {' '} {_.get(this.props, [reducerIndex, reducerKey, reducerItem, 'name'], '')}
              </span>
            </h1>
            <Row>
              <Col md={2}>
                <UserPic responsive thumbnail pictures={_.get(this.props, [reducerIndex, reducerKey, reducerItem, 'picture'], [])} />
              </Col>
              <Col md={10}>
                <DynamicForm
                  checkKey={'edit-' + _.get(this.props, [reducerIndex, reducerKey, reducerItem, 'id']) + _.has(this.props, [reducerIndex, reducerKeySites, 'all'])}
                  formName="edit"
                  formClass="form-horizontal"
                  fieldsNeeded={fields(_.get(this.props, [reducerIndex, reducerKeySites, 'all'], []))}
                  initialValues={initialValues(_.get(this.props, [reducerIndex, reducerKey, reducerItem]))}
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
