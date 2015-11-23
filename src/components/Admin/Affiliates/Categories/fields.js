import _ from 'lodash';
import React from 'react';
import * as actions from 'redux/modules/data/actions';
export const reducerIndex = 'data';
export const reducerKey = 'categories';
export const reducerItem = 'item';
export const path = 'affiliates/categories';

export const reducerKeySites = 'sites';

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
    values,
    {affiliates: _.pluck(_.get(values, 'affiliates'), 'id')}
  );
}

export default function fields(affiliates) {

  const allOptions = () => {
    const options = [];
    if (typeof affiliates === 'object') {
      _.sortBy(affiliates, 'name').map((item) => {
        options.push({value: item.id, desc: item.name});
      });
    }
    return options;
  };

  return ([
    {
      name: 'name',
      label: 'Categorie',
      type: 'text',
      placeholder: 'Categorie',
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
      name: 'affiliates',
      label: 'Affiliates',
      type: 'checkboxList',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      chunks: 3,
      searchable: true,
      options: allOptions()
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

  if (!actions.isAllLoaded(reducerKeySites, state)) {
    promises.push(dispatch(actions.loadAll(reducerKeySites)));
  }

  if (_.has(state, 'router.params.id')) {
    if (!actions.isLoadedItem(reducerKey, state, state.router.params.id)) {
      promises.push(dispatch(actions.loadItem(reducerKey, state.router.params.id)));
    }
  }

  return Promise.all(promises);
}
