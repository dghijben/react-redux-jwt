import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import {mapDispatchToProps, getActionStatus} from 'utils/functions';
import {Well, Row, Col} from 'react-bootstrap';
import Ribbon from 'components/Admin/includes/Ribbon';
import DynamicForm from 'redux-form-generator';
import validator from './ValidateEdit';
import * as actions from 'redux/modules/data/actions';
import fields, {reducerIndex, reducerKey, reducerKeyCats, reducerItem, path, fetchDataDeferred} from './fields';

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
class Create extends Component {

  static propTypes = {
    'token': PropTypes.string,
    'router': PropTypes.object.isRequired,
    'dispatch': PropTypes.func,
    'history': PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.getActionState = this.getActionState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (_.get(nextProps, [reducerIndex, reducerKey, reducerItem, 'actionStatus', 'success']) === true ) {
      this.props.history.pushState({}, '/admin/' + path + '/' + _.get(nextProps, [reducerIndex, reducerKey, reducerItem, 'id']) + '/edit');
    }
  }

  getActionState() {
    return getActionStatus(this.props, [reducerIndex, reducerKey, reducerItem]);
  }

  handleSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(actions.create(reducerKey, values))
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
      {name: 'Affiliates', to: '/admin/affiliates'},
      {name: 'Sites'},
      {name: 'Nieuw'},
    ];
    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>Nieuwe site
            </h1>
            <Row>
              <Col md={2} />
              <Col md={10}>
                <DynamicForm
                  checkKey={reducerIndex + '-new-' + _.get(this.props, [reducerIndex, reducerKeyCats, 'allStatus', 'success'], false)}
                  formName={reducerIndex}
                  formClass="form-horizontal"
                  fieldsNeeded={fields('new', this.props.token, _.get(this.props, 'data.categories.all', []))}
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
