import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import {mapDispatchToProps, getActionStatus} from 'utils/functions';
import {Well, Row, Col} from 'react-bootstrap';
import Ribbon from 'components/Admin/includes/Ribbon';
import DynamicForm from 'redux-form-generator';
import UserPic from 'components/Admin/includes/UserPic';
import validator from './ValidateEdit';
import {update, clearNetworkState} from 'redux/modules/data/actions';
import fields, {reducerIndex, reducerKey, reducerItem, initialValues, fetchDataDeferred} from './fields';

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
    'data': PropTypes.object.isRequired,
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

  componentWillUnmount() {
    this.clearActionState();
  }

  getActionState() {
    return getActionStatus(this.props, [reducerIndex, reducerKey, reducerItem]);
  }

  clearActionState() {
    this.props.dispatch(clearNetworkState());
  }

  handleSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(update(reducerKey, this.props.router.params.userId, values))
        .then((ret)=> {
          if (_.has(ret, 'error')) {
            console.log('error');
            reject(ret.error);
          } else {
            resolve();
          }
        });
    });
  }

  render() {
    const item = _.get(this.props, [reducerIndex, reducerKey, reducerItem], {});
    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Affiliates', to: '/admin/affiliates'},
      {name: 'Kortingscodes', to: '/admin/discount-codes'},
      {name: _.get(this.props, [reducerIndex, reducerKey, reducerItem, 'name']), to: '/admin/discount-codes/' + _.get(this.props, [reducerIndex, reducerKey, reducerItem, 'id'])},
      {name: 'Wijzigen'}
    ];

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
                <DynamicForm
                  checkKey={'userEdit-' + _.get(item, ['id'])}
                  formName="userEdit"
                  formClass="form-horizontal"
                  fieldsNeeded={fields(_.get(item, ['id']), this.props.token)}
                  initialValues={initialValues(item)}
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
} export default Edit;
