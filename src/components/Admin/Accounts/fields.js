import _ from 'lodash';
import React from 'react';
import * as actions from 'redux/modules/data/actions';

export const reducerIndex = 'data';
export const reducerKey = 'accounts';
export const reducerKeyUsers = 'users';
export const reducerKeyCats = 'accountCategories';
export const reducerItem = 'item';
export const path = 'accounts';
export const title = 'Accounts';

export const searchFields = [
  {
    name: 'search', type: 'text', placeholder: 'zoeken...', bsSize: 'large',
    buttonAfter: {
      type: 'submit',
      value: <i className="fa fa-search"></i>
    }
  },
  {
    name: 'order',
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
    {affiliate: _.pluck(_.get(values, 'affiliate'), 'id')},
    {users: _.pluck(_.get(values, 'users'), 'id')},
    {categories: _.pluck(_.get(values, 'categories'), 'id')},
    {'discount_concat': _.get(values, 'discount') + _.get(values, 'type')}
  );
}

export default function fields(id, token, resource, resourceList, categories) {

  console.log(categories);

  const catOptions = () => {
    const options = [];
    if (typeof categories === 'object') {
      _.sortBy(categories, 'name').map((item) => {
        options.push({value: item.id, desc: item.name});
      });
    }
    return options;
  };

  const list = () => {
    const options = [];
    _.map(resourceList, (option) => {
      options.push({
        value: option.id,
        desc: option.firstname + ' ' + option.middlename + ' ' + option.lastname
      });
    });
    return options;
  };

  return ([
    {
      name: 'picture',
      label: 'Logo',
      type: 'plupload',
      placeholder: 'Bestand',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      url: '/api/admin/accounts/' + id + '/upload',
      headers: {
        Authorization: 'Bearer ' + token
      },
      multi_selection: false,
      hideOnStatic: true
    },
    {
      name: 'name',
      label: 'Account / Club',
      type: 'text',
      placeholder: 'Account / Club',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'description',
      label: 'Omschrijving',
      type: 'rte',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'address',
      label: 'Adres + huisnummer',
      type: 'text',
      placeholder: 'Adres + huisnummer',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },

    {
      name: 'postcode',
      label: 'Postcode',
      type: 'text',
      placeholder: 'Postcode',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'city',
      label: 'Plaats',
      type: 'text',
      placeholder: 'Plaats',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'telephone',
      label: 'Telefoon',
      type: 'text',
      placeholder: 'Telefoon',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'Email',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'website',
      label: 'Website',
      type: 'text',
      placeholder: 'Website',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'business_id',
      label: 'Kvk',
      type: 'text',
      placeholder: 'Kvk',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'business_sub_id',
      label: 'Vestiginsnummer',
      type: 'text',
      placeholder: 'Vestiginsnummer',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'business_tax_id',
      label: 'Btw-nummer',
      type: 'text',
      placeholder: 'Btw nummer',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'payment_bank',
      label: 'Bank',
      type: 'text',
      placeholder: 'Bank',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'payment_account_name',
      label: 'Rekening naam',
      type: 'text',
      placeholder: 'Rekeningnaam',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },

    {
      name: 'payment_account_number',
      label: 'Rekeningnummer',
      placeholder: 'NLXX BANK XXXX XXXX XX',
      type: 'text',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'payment_confirmed',
      label: 'Rekening gecontroleerd',
      type: 'checkbox',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-offset-2 col-md-10'
    },
    {
      name: 'members',
      label: 'Aantal leden',
      type: 'text',
      placeholder: 'Aantal leden',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'goal1',
      label: 'Doel',
      type: 'text',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'extern',
      label: 'Extern opgehaald',
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
    { name: 'users',
      label: 'Gebruikers',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      type: 'resource',
      callResource: resource,
      list: list()
    },
    {
      name: 'categories',
      label: 'Categorieën',
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

  if (!actions.isAllLoaded(reducerKeyUsers, state)) {
    promises.push(dispatch(actions.loadAll(reducerKeyUsers)));
  }

  if (_.has(state, 'router.params.id')) {
    if (!actions.isLoadedItem(reducerKey, state, state.router.params.id)) {
      promises.push(dispatch(actions.loadItem(reducerKey, state.router.params.id)));
    }
  }
  return Promise.all(promises);
}
