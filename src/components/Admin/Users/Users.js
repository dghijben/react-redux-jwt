// import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import { load } from '../../../redux/modules/admin/users/userActions';
import { connect } from 'react-redux';
// import { pushState } from 'redux-router';
import {Well} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import DataOverview from '../includes/DataOverview';
import {mapDispatchToProps, filterFields, createParamsForFetch} from 'utils/functions';

const reducerIndex = 'users';
// const queryFields = ['page', 'search', 'searchField'];

const formName = 'form';
const fields = [
  {name: 'search', type: 'text', placeHolder: 'zoeken...',
    buttonBefore: {
      name: 'searchField', type: 'dropdown',
      items: [
        {default: 'Alle'},
        {desc: 'Voornaam', field: 'firstname'},
        {desc: 'Achternaam', field: 'lastname'},
        {desc: 'Volledige naam', field: 'fullname'},
        {desc: 'E-mail', field: 'email'}
      ]
    }
  }
];

const fieldNames = filterFields(fields);

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
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(load(createParamsForFetch(getState(), formName, fieldNames)));
  }

  render() {
    const click1 = (item) => {
      this.props.history.pushState({}, '/admin/users/' + item.id);
    };

    const click2 = () => {
      console.log('CLick 2');
    };

    const breadcrumps = [
      {name: 'Admin', to: '/admin'},
      {name: 'Users'}
    ];

    const form = {
      name: formName,
      key: 'key1',
      onSubmit: this.handleSearch,
      fields: fields
    };

    return (
      <div>
        <Ribbon breadcrumps={breadcrumps}/>
        <div id="content">
          <Well>
            <DataOverview
              form={form}
              data={this.props.users}
              cols={[
                {name: 'Naam', show: ['firstname', 'middlename', 'lastname']},
                {name: 'Email', show: 'email'},
                {name: 'Aangemaakt', show: 'created_at'},
                {name: 'Gewijzigd', show: 'updated_at'},
                {name: 'Acties', dropdownButton: [
                  {name: 'wijzigen', onClick: click1},
                  {divider: true},
                  {name: 'verwijder', onClick: click2},
                ]}
              ]}
              />
          </Well>
        </div>
      </div>
    );
  }
}

export default Users;
