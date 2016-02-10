import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, getActionStatus} from 'utils/functions';
import {Well, Row, Col} from 'react-bootstrap';
import Ribbon from 'components/Admin/includes/Ribbon';
import DynamicForm from 'redux-form-generator';
import validator from './ValidateEdit';
import * as actions from 'redux/modules/data/actions';
import fields, {reducerIndex, reducerKey, reducerItem, initialValues} from './fields';

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
    'acl': PropTypes.object.isRequired,
    'token': PropTypes.string.isRequired
  };

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
    this.props.dispatch(actions.clearNetworkState(reducerKey));
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const promises = [];
    if (!actions.isLoadedItem(reducerKey, state, state.router.params.id)) {
      promises.push(dispatch(actions.loadItem(reducerKey, state.router.params.id)));
    }
    return Promise.all(promises);
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

  render() {
    const item = _.get(this.props, [reducerIndex, reducerKey, reducerItem], {});

    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Acl', to: '/admin/acl'},
      {name: _.get(item, ['desc'], 'unknown'), to: '/admin/acl/roles/' + _.get(item, 'id')},
      {name: 'Wijzigen'}
    ];

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>Gebruiker
              <span>
                {' '} {_.get(item, ['desc'], '')}
              </span>
            </h1>
            <Row>
              <Col md={2}>
                .x
              </Col>
              <Col md={10}>
                <DynamicForm
                  checkKey={reducerIndex + reducerKey + reducerItem + _.get(item, ['id'])}
                  formName={reducerIndex + reducerKey + reducerItem}
                  formClass="form-horizontal"
                  fieldsNeeded={fields(_.get(item, ['id']), this.props.token, _.get(this.props, 'actions.all', []))}
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
