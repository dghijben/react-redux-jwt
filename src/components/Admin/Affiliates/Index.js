import React, {Component, PropTypes } from 'react';
import { load } from '../../../redux/modules/admin/affiliates/actions';
import { connect } from 'react-redux';
import {Well} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import DataOverview from '../includes/DataOverview';
import {mapDispatchToProps, filterFields, createParamsForFetch} from 'utils/functions';

const reducerIndex = 'affiliates';
const name = 'dataoverview';

const fields = [

  {row:
  {bsSize: 'large', col:
    [
      {md: 6, children: [
        {name: 'search', type: 'text', placeholder: 'zoeken...',
          buttonBefore: {
            name: 'searchField', type: 'dropdown',
            items: [
              {default: 'Alle'},
              {desc: 'Affiliate', field: 'naam'}
            ]
          },
          buttonAfter: {
            type: 'submit',
            value: <i className="fa fa-search"></i>
          }
        }
      ]},
      {md: 6, children: [
        {name: 'order', type: 'dropdown', bsStyle: 'default',
          items: [
            {default: 'Sorteren'},
            {desc: <span>Affiliate <i className="fa fa-arrow-circle-up"></i></span>, field: 'nameAsc'},
            {desc: <span>Affiliate <i className="fa fa-arrow-circle-down"></i></span>, field: 'nameDesc'}
          ]
        }
      ]},
    ]
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
    'affiliates': PropTypes.object,
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
    this.props.dispatch(load(state));
  }

  render() {
    const show = (item) => {
      this.props.history.pushState({}, '/admin/affiliates/' + item.id);
    };

    const edit = () => {
      console.log('CLick 2');
    };

    const remove = () => {
      console.log('CLick 3');
    };

    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Affiliates'}
    ];

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <DataOverview
              name={name}
              fetchData={this.fetchDataCallBack}
              data={this.props.affiliates}
              form={{
                key: 'form',
                fields: fields
              }}
              cols={[
                {name: 'Naam', show: 'name'},
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
