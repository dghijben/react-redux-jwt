import _ from 'lodash';
import React from 'react';


import * as actions from 'redux/modules/data/actions';

export const reducerIndex = 'data';
export const reducerKey = 'sites';
export const reducerItem = 'item';
export const path = 'affiliates/sites';

export const reducerKeyCats = 'categories';

export const searchFields = [
  {name: 'search', type: 'text', placeholder: 'zoeken...', bsSize: 'large',
    buttonBefore: {
      name: 'searchField', type: 'dropdown', onlySelf: false,
      items: [
        {default: 'Alle'},
        {desc: 'Naame', field: 'name'},
        {desc: 'Omschrijving', field: 'description'},
        {desc: 'Site url', field: 'url_site'},
        {desc: 'Affiliate url', field: 'url_Affiliate'}
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
      {desc: <span>Naam <i className="fa fa-angle-up"></i></span>, field: 'nameAsc'},
      {desc: <span>Naam <i className="fa fa-angle-down"></i></span>, field: 'nameDesc'},
      {desc: <span>Omschrijving <i className="fa fa-angle-up"></i></span>, field: 'descriptionAsc'},
      {desc: <span>Omschrijving <i className="fa fa-angle-down"></i></span>, field: 'descriptionDesc'},
      {desc: <span>cpl <i className="fa fa-angle-up"></i></span>, field: 'cplAsc'},
      {desc: <span>cpl <i className="fa fa-angle-down"></i></span>, field: 'cplDesc'},
      {desc: <span>cps <i className="fa fa-angle-up"></i></span>, field: 'cpsAsc'},
      {desc: <span>cps <i className="fa fa-angle-down"></i></span>, field: 'cpsDesc'},
      {desc: <span>Site url <i className="fa fa-angle-up"></i></span>, field: 'url_siteAsc'},
      {desc: <span>Site url <i className="fa fa-angle-down"></i></span>, field: 'url_siteDesc'},
      {desc: <span>Affiliate url<i className="fa fa-angle-up"></i></span>, field: 'url_affiliateAsc'},
      {desc: <span>Affiliate url<i className="fa fa-angle-down"></i></span>, field: 'url_AffiliateDesc'},
    ]
  }
];

export function initialValues(values) {
  return Object.assign({},
    values,
    {categories: _.pluck(_.get(values, 'categories'), 'id')}
  );
}

export default function fields(id, token, categories) {

  const catOptions = () => {
    const options = [];
    if (typeof categories === 'object') {
      _.sortBy(categories, 'name').map((item) => {
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
      url: '/api/admin/users/' + id + '/upload',
      headers: {
        Authorization: 'Bearer ' + token
      },
      multi_selection: false,
      hideOnStatic: true
    },
    {
      name: 'name',
      label: 'Naam',
      type: 'text',
      placeholder: 'Naam affiliate webshop / website',
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
      name: 'cpl',
      label: 'CPL',
      placeholder: 'Cost per lead',
      type: 'text',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
    },
    {
      name: 'cps',
      label: 'CPS',
      placeholder: 'Cost per sale',
      type: 'text',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
    },
    {
      name: 'url_site',
      label: 'Url site',
      type: 'text',
      placeholder: 'Reachtstreekse url van de website',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
    },
    {
      name: 'url_affiliate',
      label: 'Url site via affiliate',
      type: 'text',
      placeholder: 'De url via de affiliate.',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
    },
    {
      name: 'categories',
      label: 'Categorieen',
      type: 'checkboxList',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      chunks: 3,
      searchable: true,
      options: catOptions()
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

  if (!actions.isAllLoaded(reducerKeyCats, state)) {
    promises.push(dispatch(actions.loadAll(reducerKeyCats)));
  }

  if (_.has(state, 'router.params.id')) {
    if (!actions.isLoadedItem(reducerKey, state, state.router.params.id)) {
      promises.push(dispatch(actions.loadItem(reducerKey, state.router.params.id)));
    }
  }

  return Promise.all(promises);
}
