import _ from 'lodash';
import React from 'react';
import * as actions from 'redux/modules/data/actions';

export const reducerIndex = 'data';
export const reducerKey = 'discountCodes';
export const reducerItem = 'item';
export const path = 'users';

export const searchFields = [
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
  },
  { name: 'order',
    submit: true,
    type: 'dropdown',
    bsStyle: 'default',
    items: [
      {default: 'Sorteren'},
      {desc: <span>Voornaam <i className="fa fa-angle-up"></i></span>, field: 'firstnameAsc'},
      {desc: <span>Voornaam <i className="fa fa-angle-down"></i></span>, field: 'firstnameDesc'},
      {desc: <span>Achternaam <i className="fa fa-angle-up"></i></span>, field: 'lastnameAsc'},
      {desc: <span>Achternaam <i className="fa fa-angle-down"></i></span>, field: 'lastnameDesc'},
      {desc: <span>Email <i className="fa fa-angle-up"></i></span>, field: 'emailAsc'},
      {desc: <span>Email <i className="fa fa-angle-down"></i></span>, field: 'emailDesc'}
    ]
  }
];

export function initialValues(values) {
  return Object.assign({},
    values,
    {roles: _.pluck(_.get(values, 'roles'), 'id')}
  );
}

export default function fields(userId, token) {

/*  const roleOptions = () => {
    const options = [];
    if (typeof roles === 'object') {
      _.sortBy(roles, 'desc').map((role) => {
        options.push({value: role.id, desc: role.desc});
      });
    }
    return options;
  };*/

  return ([
    {
      name: 'picture',
      label: 'Foto',
      type: 'plupload',
      placeholder: 'Bestand',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      url: '/api/admin/affiliates/discount-codes/' + userId + '/upload',
      headers: {
        Authorization: 'Bearer ' + token
      },
      multi_selection: false,
      hideOnStatic: true
    },
    {
      name: 'name',
      label: 'Titel',
      type: 'text',
      placeholder: 'Titel',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'description',
      label: 'Omschrijving',
      type: 'text',
      placeholder: 'Omschrijving',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'discount',
      label: 'Korting',
      type: 'text',
      placeholder: 'Korint',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'start',
      label: 'Start datum',
      type: 'text',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'end',
      label: 'Eind datum',
      type: 'text',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'active',
      label: 'Actief',
      type: 'checkbox',
      wrapperClassName: 'col-md-offset-2 col-md-10'
    },
    {
      name: 'affiliate_id',
      label: 'Affiliate',
      type: 'radio',
      searchable: true,
      chunks: 3,
      options: [
        {desc: 1, value: 2},
        {desc: 'mango', value: 3},
        {desc: 'thee', value: 4},
        {desc: 4, value: 5},
        {desc: 5, value: 6},
        {desc: 6, value: 7},
        {desc: 1, value: 2},
        {desc: 'mango', value: 3},
        {desc: 'thee', value: 4},
        {desc: 4, value: 5},
        {desc: 5, value: 6},
        {desc: 6, value: 7},
        {desc: 1, value: 2},
        {desc: 'mango', value: 3},
        {desc: 'thee', value: 4},
        {desc: 4, value: 5},
        {desc: 5, value: 6},
        {desc: 6, value: 7},
        {desc: 1, value: 2},
        {desc: 'mango', value: 3},
        {desc: 'thee', value: 4},
        {desc: 4, value: 5},
        {desc: 5, value: 6},
        {desc: 6, value: 7},
        {desc: 1, value: 2},
        {desc: 'mango', value: 3},
        {desc: 'thee', value: 4},
        {desc: 4, value: 5},
        {desc: 5, value: 6},
        {desc: 6, value: 7},
        {desc: 1, value: 2},
        {desc: 'mango', value: 3},
        {desc: 'thee', value: 4},
        {desc: 4, value: 5},
        {desc: 5, value: 6},
        {desc: 6, value: 7},
        {desc: 1, value: 2},
        {desc: 'mango', value: 3},
        {desc: 'thee', value: 4},
        {desc: 4, value: 5},
        {desc: 5, value: 6},
        {desc: 6, value: 7},
      ],
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      row: {
        hideOnStatic: true,
        col: [
          {
            md: 10, mdOffset: 2, children: [
            {type: 'success', message: 'Het formulier is opgeslagen'},
            {type: 'error', message: 'Er zijn fouten opgetreden, controleer het formulier.'}
            ]
          },
          {hideOnStatic: true, md: 10, mdOffset: 2, children: [{type: 'submit', name: 'submit', value: 'versturen'}]}
        ]
      }
    }
  ]);
}

export function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const promises = [];

  if (!actions.isAllLoaded('sites', state)) {
    promises.push(dispatch(actions.loadAll('sites')));
  }

  if (_.has(state, 'router.params.id')) {
    if (!actions.isLoadedItem(reducerKey, state, state.router.params.id)) {
      promises.push(dispatch(actions.loadItem(reducerKey, state.router.params.id)));
    }
  }
  return Promise.all(promises);
}
