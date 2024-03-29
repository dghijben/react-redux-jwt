import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import {load, destroyItem} from 'redux/modules/data/actions';
import { connect } from 'react-redux';
import {Well} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import DataOverview from '../includes/DataOverview';
import {Confirm} from 'components/includes';
import {mapDispatchToProps, filterFields, createParamsForFetch} from 'utils/functions';
import {searchFields, reducerIndex, reducerKey, reducerItem, path} from './fields';
const fieldNames = filterFields(searchFields);

@connect(state=>{
  const obj = {
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)

class List extends Component {

  static propTypes = {
    'users': PropTypes.object,
    'history': PropTypes.object,
    'children': PropTypes.object,
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
      this.props.dispatch(load(reducerKey, createParamsForFetch(this.props, reducerIndex, fieldNames)));
    }

    if (_.get(this.props, [reducerIndex, reducerItem, 'failed'], false) === false && _.get(nextProps, [reducerIndex, reducerItem, 'failed'], false) === true) {
      this.setState({status: {failed: true}});
    }
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(load(reducerKey, createParamsForFetch(getState(), reducerIndex, fieldNames)));
  }


  fetchDataCallBack(state) {
    this.props.dispatch(load(reducerKey, state));
  }

  confirmDelete(item) {
    this.setState({showModal: true, destroyId: item.id});
  }

  close() {
    this.setState({showModal: false, status: {}});
  }

  confirmed() {
    this.props.dispatch(destroyItem(reducerKey, this.state.destroyId));
  }

  renderModal() {
    return (<Confirm showModal={this.state.showModal} close={this.close} confirmed={this.confirmed} status={this.state.status}/>);
  }

  render() {
    // Render children
    if (_.get(this.props, 'children', null) !== null) {
      return this.props.children;
    }

    const show = (item) => {
      this.props.history.pushState({}, '/admin/' + path + '/' + item.id);
    };

    const edit = (item) => {
      this.props.history.pushState({}, '/admin/' + path + '/' + item.id + '/edit');
    };

    const destroy = (item) => {
      this.confirmDelete(item);
    };

    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Gebruikers'}
    ];

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <DataOverview
              name={reducerIndex}
              fetchData={this.fetchDataCallBack}
              data={_.get(this.props, [reducerIndex, reducerKey])}
              form={{
                key: 'form',
                checkKey: reducerIndex + 'form',
                fields: searchFields
              }}
              cols={[
                {name: 'Avatar', image: ['picture', 0, 'file_name'], width: '80px'},
                {name: 'Naam', show: ['firstname', 'middlename', 'lastname']},
                {name: 'Email', show: 'email'},
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

export default List;
