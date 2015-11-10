import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import { load, destroyItem } from '../../../redux/modules/admin/affiliates/actions';
import { connect } from 'react-redux';
import {Well} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import {Confirm} from 'components/includes';
import DataOverview from '../includes/DataOverview';
import {mapDispatchToProps, filterFields, createParamsForFetch} from 'utils/functions';
import {reducerIndex, reducerItem, name, path, searchFields} from './constants';

const breadCrumbs = [
  {name: 'Admin', to: '/admin'},
  {name: 'Affiliates'}
];

const fieldNames = filterFields(searchFields);

@connect(state=>{
  const obj = {
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)

class Index extends Component {

  static propTypes = {
    'affiliates': PropTypes.object,
    'history': PropTypes.object,
    'dispatch': PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.fetchDataCallBack = this.fetchDataCallBack.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.close = this.close.bind(this);
    this.confirmed = this.confirmed.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.state = {
      showModal: false,
      status: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (_.get(this.props, [reducerIndex, reducerItem, 'deleted'], false) === false && _.get(nextProps, [reducerIndex, reducerItem, 'deleted'], false) === true) {
      this.setState({status: {success: true}});
      this.props.dispatch(load(createParamsForFetch(this.props, name, fieldNames)));
    }

    if (_.get(this.props, [reducerIndex, reducerItem, 'failed'], false) === false && _.get(nextProps, [reducerIndex, reducerItem, 'failed'], false) === true) {
      this.setState({status: {failed: true}});
    }
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(load(createParamsForFetch(getState(), name, fieldNames)));
  }

  fetchDataCallBack(state) {
    this.props.dispatch(load(state));
  }

  confirmDelete(item) {
    this.setState({showModal: true, destroyId: item.id});
  }

  close() {
    this.setState({showModal: false, status: {}});
  }

  confirmed() {
    this.props.dispatch(destroyItem(this.state.destroyId));
  }

  renderModal() {
    return (<Confirm showModal={this.state.showModal} close={this.close} confirmed={this.confirmed} status={this.state.status}/>);
  }

  render() {
    const show = (item) => {
      this.props.history.pushState({}, '/admin/' + path + '/' + item.id);
    };

    const edit = (item) => {
      this.props.history.pushState({}, '/admin/' + path + '/' + item.id + '/edit');
    };

    const destroy = (item) => {
      this.confirmDelete(item);
    };

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <DataOverview
              name={name}
              fetchData={this.fetchDataCallBack}
              data={_.get(this.props, reducerIndex)}
              form={{
                key: 'form',
                fields: searchFields
              }}
              cols={[
                {name: 'Affiliate', show: 'name'},
                {name: 'Aangemaakt', show: 'created_at'},
                {name: 'Gewijzigd', show: 'updated_at'},
                {name: 'Acties', dropdownButton: [
                  {name: 'bekijken', onClick: show},
                  {name: 'wijzigen', onClick: edit},
                  {divider: true},
                  {name: 'verwijder', onClick: destroy},
                ]}
              ]}
              />
          </Well>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default Index;
