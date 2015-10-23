import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import { load } from '../../../redux/modules/admin/users/userActions';
import { connect } from 'react-redux';
import Ribbon from '../includes/Ribbon';
import mapDispatchToProps from 'utils/mapDispatchToProps';
import DataOverview from '../includes/DataOverview';
import {stateMapper} from 'utils/functions';
const reducerIndex = 'users';
const form = {
  name: 'searchForm',
  fields: [
    'search',
    'searchField',
    'page'
  ],
};

@connect(state=>{
  const obj = {
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)

class Users extends Component {

  static propTypes = {
    'users': PropTypes.object,
    'router': PropTypes.object,
    'reduxRouterReducer': PropTypes.object,
    'fields': PropTypes.object,
    'history': PropTypes.object,
    'pushState': PropTypes.func,
    'dispatch': PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      searchForm: {}
    };
  }

  componentWillMount() {
    const pathname = this.props.router.location.pathname;
    const obj = Object.assign({}, this.state);
    obj[form.name] = stateMapper(this.props, pathname, form.name, form.fields);
    this.setState(obj);
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const pathname = state.router.location.pathname;
    const params = stateMapper(state, pathname, form.name, form.fields);
    return dispatch(load(_.omit(params, (value)=>{ return !value; })));
  }

  render() {

    const breadcrumps = [
      {name: 'Admin', to: '/admin'},
      {name: 'Users'}
    ];

    const data = this.props[reducerIndex];
    const cols = [
      {name: 'Naam', show: ['firstname', 'middlename', 'lastname']},
      {name: 'Email', show: 'email'},
      {name: 'Aangemaakt', show: 'created_at'},
      {name: 'Gewijzigd', show: 'updated_at'},
      {name: 'Acties', dropdownButton: [
        {name: 'wijzigen', onClick: (item)=>{ this.props.history.pushState({}, '/admin/users/' + item.id); }},
        {divider: true},
        {name: 'verwijder', onClick: ()=>{ alert('click 2'); }},
      ]}
    ];

    return (
      <div>
        <Ribbon breadcrumps={breadcrumps}/>
        <div id="content">
          <DataOverview
            cols={cols}
            form={form}
            data={data}
            />
        </div>
      </div>
    );
  }
}

export default Users;
