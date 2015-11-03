import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadRecord, isLoadedRecord } from '../../../redux/modules/admin/affiliates/actions';
import {Well} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import DynamicForm from 'components/Admin/includes/DynamicForm';
import {Confirm, Pending} from 'components/includes';

const REDUCER = 'affiliates';

@connect(state=>({
  'affiliates': state.affiliates,
  'router': state.router
}))

class Show extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'affiliates': PropTypes.object.isRequired,
    'history': PropTypes.object,
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

  shouldComponentUpdate(nextProps: Object) {
    // Important when using dynamic redux forms

    let updateComponent = true;
    if (_.get(nextProps, [REDUCER, 'record', 'id']) === _.get(this.props, [REDUCER, 'record', 'id'])) {
      updateComponent = false;
    }
    return updateComponent;
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

    const fields = [
      {name: 'name', label: 'Naam', type: 'static', placeholder: 'Voorletters', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
      {name: 'description', label: 'Omschrijving', type: 'static', placeholder: 'Voornamen', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
      {name: 'url_site', label: 'Url Site', type: 'static', placeholder: 'Tussenvoegsel', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
      {name: 'url_affiliate', label: 'Url affiliate', type: 'static', placeholder: 'Achternaam', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
      {name: 'active', label: 'Actief', type: 'static', placeholder: 'E-mail', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
      {row:
      {col:
        [
          {md: 9, mdOffset: 3, children: [{type: 'button', name: 'edit', value: 'wijzigen', onClick: editLink}]}
        ]
      }
      }
    ];

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
                formName="recordEdit"
                formKey="recordEdit"
                formClass="form-horizontal"
                fieldsNeeded={fields}
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
