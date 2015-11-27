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
import Resource from './Resource';
import {update, clearNetworkState} from 'redux/modules/data/actions';
import fields, {path, title, reducerIndex, reducerKey, reducerKeySites, reducerItem, initialValues, fetchDataDeferred} from './fields';

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
    this.renderResource = this.renderResource.bind(this);
    this.showResource = this.showResource.bind(this);
    this.closeResource = this.closeResource.bind(this);
    this.state = {
      showModal: false,
      showResource: false
    };
  }

  componentWillUnmount() {
    this.clearActionState();
  }

  getActionState() {
    return getActionStatus(this.props, [reducerIndex, reducerKey, reducerItem]);
  }

  clearActionState() {
    this.props.dispatch(clearNetworkState(reducerKey));
  }

  handleSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(update(reducerKey, this.props.router.params.id, values))
        .then((ret)=> {
          if (_.has(ret, 'error')) {
            reject(ret.error);
          } else {
            resolve();
          }
        });
    });
  }

  showResource(values, list, cb) {
    this.setState({
      showResource: true,
      resourceValues: values,
      resourceList: list,
      resourceCB: cb
    });
  }

  closeResource() {
    this.setState({showResource: false});
  }

  renderResource() {
    return (<Resource show={this.state.showResource} close={this.closeResource} values={_.clone(this.state.resourceValues)} list={_.clone(this.state.resourceList)} callBack={this.state.resourceCB}/>);
  }


  render() {
    const item = _.get(this.props, [reducerIndex, reducerKey, reducerItem], {});
    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Affiliates', to: '/admin/affiliates'},
      {name: title, to: '/admin/' + path},
      {name: _.get(this.props, [reducerIndex, reducerKey, reducerItem, 'name']), to: '/admin/' + path + '/' + _.get(this.props, [reducerIndex, reducerKey, reducerItem, 'id'])},
      {name: 'Wijzigen'}
    ];

    const checkKey = () => {
      return [
        _.has(this.props, [reducerIndex, reducerKeySites, 'allStatus', 'success']),
        _.get(item, ['name'])
      ];
    };

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>{title}
              <span>
                {_.get(this.props, [reducerIndex, reducerKey, reducerItem, 'name'])}
              </span>
            </h1>
            <Row>
              <Col md={2}>
                <UserPic responsive thumbnail pictures={_.get(item, ['picture'], [])} />
              </Col>
              <Col md={10}>
                <DynamicForm
                  checkKey={reducerKey + checkKey()}
                  formName={reducerKey}
                  formClass="form-horizontal"
                  fieldsNeeded={fields(_.get(item, ['id']), this.props.token, this.showResource)}
                  initialValues={initialValues(item)}
                  validate={validator}
                  onSubmit={this.handleSubmit}
                  getActionState={this.getActionState}
                  clearActionState={this.clearActionState}
                  />
              </Col>
            </Row>
            {this.renderResource()}
          </Well>
        </div>
      </div>
    );
  }
} export default Edit;
