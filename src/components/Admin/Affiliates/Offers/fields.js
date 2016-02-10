import _ from 'lodash';
import React from 'react';
import * as actions from 'redux/modules/data/actions';

export const reducerIndex = 'data';
export const reducerKey = 'offers';
export const reducerKeySites = 'sites';
export const reducerItem = 'item';
export const path = 'affiliates/offers';
export const title = 'Aanbiedingen';

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
      {desc: <span>Titel <i className="fa fa-angle-up"></i></span>, field: 'nameAsc'},
      {desc: <span>Titel <i className="fa fa-angle-down"></i></span>, field: 'nameDesc'},
      {desc: <span>Start <i className="fa fa-angle-up"></i></span>, field: 'startAsc'},
      {desc: <span>Start <i className="fa fa-angle-down"></i></span>, field: 'startDesc'},
      {desc: <span>Stop <i className="fa fa-angle-up"></i></span>, field: 'endAsc'},
      {desc: <span>Stop <i className="fa fa-angle-down"></i></span>, field: 'endDesc'}
    ]
  }
];

export function initialValues(values) {
  return Object.assign({},
    values,
    {affiliate: _.pluck(_.get(values, 'affiliate'), 'id')}
  );
}

export default function fields(userId, token, affiliates) {
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
      name: 'picture',
      label: 'Foto',
      type: 'plupload',
      placeholder: 'Bestand',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      url: '/api/admin/affiliates/offers/' + userId + '/upload',
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
      type: 'rte',
      placeholder: 'Omschrijving',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'

    },
    {
      name: 'url',
      label: 'Url',
      type: 'text',
      placeholder: 'Titel',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'start',
      label: 'Start datum',
      type: 'dateTime',
      mode: 'date',
      inputFormat: 'YYYY-MM-DD',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'end',
      label: 'Eind datum',
      type: 'dateTime',
      mode: 'date',
      inputFormat: 'YYYY-MM-DD',
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
      options: allOptions(),
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
