import _ from 'lodash';
import React from 'react';
import * as actions from 'redux/modules/data/actions';

export const reducerIndex = 'data';
export const reducerKey = 'discountCodes';
export const reducerKeySites = 'sites';
export const reducerItem = 'item';
export const path = 'affiliates/discount-codes';

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
    {affiliate: _.map(_.get(values, 'affiliate'), 'id')},
    {'discount_concat': _.get(values, 'discount') + _.get(values, 'type')}
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
      name: 'discount_code',
      label: 'Kortingscode',
      type: 'text',
      placeholder: 'Kortingscode',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'discount_concat',
      showOnStatic: true,
      label: 'Korting',
      type: 'text',
      placeholder: 'Korting',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'

    },
    {
      name: 'discount',
      hideOnStatic: true,
      label: 'Korting',
      type: 'text',
      placeholder: 'Korting',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      buttonBefore: {
        name: 'discount_type', type: 'dropdown', onlySelf: false,
        items: [
          {desc: '€', field: '1'},
          {desc: '%', field: '2'},
        ]
      },
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
