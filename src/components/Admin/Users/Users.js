import React, {Component, PropTypes } from 'react';
import { load } from '../../../redux/modules/admin/users/userActions';
import { connect } from 'react-redux';
import {Well} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import DataOverview from '../includes/DataOverview';
import {mapDispatchToProps, filterFields, createParamsForFetch} from 'utils/functions';

const reducerIndex = 'users';
const name = 'dataoverview';

const fields = [
  {name: 'search', type: 'text', placeholder: 'zoeken...', bsSize: 'large',
    buttonBefore: {
      name: 'searchField', type: 'dropdown', onlySelf: false,
      items: [
        {default: 'Alle'},
        {desc: 'Voornaam', field: 'firstname'},
        {desc: 'Achternaam', field: 'lastname'},
        {desc: 'Volledige naam', field: 'fullname'},
        {desc: 'E-mail', field: 'email'}
      ]
    },
    buttonAfter: {
      type: 'submit',
      value: <i className="fa fa-search"></i>
    }
  }
];

const fieldNames = filterFields(fields);
// const fieldNamesOnly = filterFieldsOnlySelf(fields);

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
    'history': PropTypes.object,
    'dispatch': PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.fetchDataCallBack = this.fetchDataCallBack.bind(this);
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(load(createParamsForFetch(getState(), name, fieldNames)));
  }

  fetchDataCallBack(state) {
    // if (intersect(Object.keys(state), fieldNamesOnly).length > 0) {
    this.props.dispatch(load(state));
    // }
  }

  render() {
    const show = (item) => {
      this.props.history.pushState({}, '/admin/users/' + item.id);
    };

    const edit = () => {
      console.log('CLick 2');
    };

    const remove = () => {
      console.log('CLick 3');
    };

    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Users'}
    ];

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <DataOverview
              name={name}
              fetchData={this.fetchDataCallBack}
              data={this.props.users}
              form={{
                key: 'form',
                checkKey: 'userform',
                fields: fields
              }}
              cols={[
                {name: 'Naam', show: ['firstname', 'middlename', 'lastname']},
                {name: 'Email', show: 'email'},
                {name: 'Aangemaakt', show: 'created_at'},
                {name: 'Gewijzigd', show: 'updated_at'},
                {name: 'Acties', dropdownButton: [
                  {name: 'bekijken', onClick: show},
                  {name: 'wijzigen', onClick: edit},
                  {divider: true},
                  {name: 'verwijder', onClick: remove},
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
