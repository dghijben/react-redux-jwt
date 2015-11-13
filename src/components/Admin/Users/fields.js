import _ from 'lodash';
import React from 'react';

export const reducerIndex = 'users';
export const reducerItem = 'user';
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

export default function fields(userId, token, roles) {

  const roleOptions = () => {
    const options = [];
    if (typeof roles === 'object') {
      _.sortBy(roles, 'desc').map((role) => {
        options.push({value: role.id, desc: role.desc});
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
      url: '/api/admin/users/' + userId + '/upload',
      headers: {
        Authorization: 'Bearer ' + token
      },
      multi_selection: false,
      hideOnStatic: true
    },
    {
      name: 'initials',
      label: 'Voorletters',
      type: 'text',
      placeholder: 'Voorletters',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'firstname',
      label: 'Voornamen',
      type: 'text',
      placeholder: 'Voornamen',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'middlename',
      label: 'Tussenvoegsel',
      type: 'text',
      placeholder: 'Tussenvoegsel',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'lastname',
      label: 'Achternaam',
      type: 'text',
      placeholder: 'Achternaam',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'text',
      placeholder: 'E-mail',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'roles',
      label: 'Rollen',
      type: 'checkboxListiOs',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      options: roleOptions()
    },
    {
      name: 'admin',
      label: 'Admin',
      type: 'checkbox',
      wrapperClassName: 'col-md-offset-2 col-md-10'
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
