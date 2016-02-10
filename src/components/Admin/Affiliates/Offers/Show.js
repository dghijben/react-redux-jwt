import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import {destroyItem, clearItem} from 'redux/modules/data/actions';
import {Well, Row, Col, Button} from 'react-bootstrap';
import Ribbon from 'components/Admin/includes/Ribbon';
import {Confirm, Pending} from 'components/includes';
import DynamicForm from 'redux-form-generator';
import UserPic from 'components/Admin/includes/UserPic';
import {mapDispatchToProps} from 'utils/functions';
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
class Show extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'aclRoles': PropTypes.object,
    'data': PropTypes.object.isRequired,
    'history': PropTypes.object,
    'dispatch': PropTypes.func.isRequired
  };

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
      this.props.dispatch(clearItem(reducerKey));
      this.props.history.pushState({}, '/admin/' + path);
    }
  }

  confirmDelete() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false, modalSuccess: false});
  }

  confirmed() {
    this.setState({showModal: false});
    this.props.dispatch(destroyItem(reducerKey, this.props.router.params.id));
  }

  renderModal() {
    return (<Confirm showModal={this.state.showModal} close={this.close} confirmed={this.confirmed}/>);
  }

  render() {
    const item = _.get(this.props, [reducerIndex, reducerKey, reducerItem], {});
    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Affiliates', to: '/admin/affiliates'},
      {name: title, to: '/admin/' + path},
      {name: _.get(this.props, [reducerIndex, reducerKey, reducerItem, 'name'])}
    ];

    const editLink = () => {
      this.props.history.pushState({}, '/admin/' + path + '/' + _.get(this.props, 'router.params.id') + '/edit');
    };

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>{title}
              <span>
                 {' '} {_.get(item, ['name'], '')}
              </span>
            </h1>

            <Row>
              <Col md={2}>
                <UserPic responsive thumbnail pictures={_.get(item, ['picture'], [])} />
              </Col>
              <Col md={10}>
                <Pending state={_.get(this.props, [reducerKey, reducerIndex, 'pending'], false)}>
                  <DynamicForm
                    checkKey={reducerKey + _.get(item, ['id'])}
                    formName={reducerKey}
                    formClass="form-horizontal"
                    fieldsNeeded={fields(_.get(item, ['id']), null, _.get(this.props, [reducerIndex, reducerKeySites, 'all'], []))}
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
