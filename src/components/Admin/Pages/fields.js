import _ from 'lodash';
import React from 'react';
import * as actions from 'redux/modules/data/actions';
export const reducerIndex = 'data';
export const reducerKey = 'pages';
export const reducerItem = 'item';
export const path = 'pages';

export const searchFields = [
  {name: 'search', type: 'text', placeholder: 'zoeken...', bsSize: 'large',
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
      {desc: <span>Naam <i className="fa fa-angle-up"></i></span>, field: 'nameAsc'},
      {desc: <span>Naam <i className="fa fa-angle-down"></i></span>, field: 'nameDesc'},
      {desc: <span>Actief url<i className="fa fa-angle-up"></i></span>, field: 'activeAsc'},
      {desc: <span>Actief url<i className="fa fa-angle-down"></i></span>, field: 'activeDesc'},
    ]
  }
];

export function initialValues(values) {
  return Object.assign({},
    values
  );
}

export default function fields() {

  return ([
    {
      name: 'type',
      label: 'Pagina type',
      type: 'select',
      placeholder: 'Menu titel',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      options: [
        {value: 0, desc: 'Content'},
        {value: 1, desc: 'Goede doelen'},
        {value: 2, desc: 'Contact'},
        {value: 3, desc: 'Dashboard/Overzicht'},
        {value: 4, desc: 'Dashboard/Registreer'},
        {value: 5, desc: 'Dashboard/Affiliates Koppelen'},
        {value: 6, desc: 'Dashboard/Wijzigen'},
        {value: 7, desc: 'Dashboard/Account'},
      ]
    },
    {
      name: 'menu_title',
      label: 'Menu titel',
      type: 'text',
      placeholder: 'Menu titel',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'page_title',
      label: 'Pagina titel',
      type: 'text',
      placeholder: 'Pagina titel',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'active',
      label: 'Actief',
      type: 'checkbox',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-offset-2 col-md-10'
    },
    {
      name: 'hidden',
      label: 'Verborgen',
      type: 'checkbox',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-offset-2 col-md-10'
    },
    {
      name: 'keywords',
      label: 'Keywords',
      type: 'textarea',
      placeholder: 'Inhoud',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Inhoud',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'html',
      label: 'Inhoud',
      type: 'rte',
      placeholder: 'Inhoud',
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

  if (_.has(state, 'router.params.id')) {
    if (!actions.isLoadedItem(reducerKey, state, state.router.params.id)) {
      promises.push(dispatch(actions.loadItem(reducerKey, state.router.params.id)));
    }
  }

  return Promise.all(promises);
}
