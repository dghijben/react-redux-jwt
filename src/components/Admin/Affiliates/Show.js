import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadRecord, isLoadedRecord } from '../../../redux/modules/admin/affiliates/actions';
import {Well} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import DynamicForm from 'components/Admin/includes/DynamicForm';
import {Confirm, Pending} from 'components/includes';
import {fieldsShow} from './fields';

const REDUCER = 'affiliates';

@connect(state=>({
  'token': state.authorization.token,
  'affiliates': state.affiliates,
  'router': state.router
}))

class Show extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'affiliates': PropTypes.object.isRequired,
    'history': PropTypes.object,
    'token': PropTypes.string.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.close = this.close.bind(this);
    this.confirmed = this.confirmed.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.state = {
      showModal: false
    };
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

  renderModal() {
    return (<Confirm showModal={this.state.showModal} close={this.close} confirmed={this.confirmed} />);
  }

  render() {
    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Affiliates', to: '/admin/affiliates'},
      {name: _.get(this.props, 'affiliates.record.name', 'unknown')},
    ];

    const editLink = () => {
      this.props.history.pushState({}, '/admin/affiliates/' + _.get(this.props, [REDUCER, 'record', 'id']) + '/edit');
    };

    const id = _.get(this.props, [REDUCER, 'record', 'id']);
    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>Affiliate
              <span>
                {' '} {_.get(this.props, [REDUCER, 'record', 'name'])}
              </span>
            </h1>
            <Pending state={_.get(this.props, [REDUCER, 'record', 'pending'])}>
              <DynamicForm
                checkKey={'recordEdit-' + id}
                formName="recordEdit"
                formKey="recordEdit"
                formClass="form-horizontal"
                fieldsNeeded={fieldsShow(id, this.props.token, editLink, this.confirmDelete)}
                initialValues={_.get(this.props, [REDUCER, 'record'])}
                />
            </Pending>
          </Well>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default Show;
