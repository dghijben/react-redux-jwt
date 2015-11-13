import _ from 'lodash';
import React from 'react';

export const reducerIndex = 'aclroutes';
export const reducerItem = 'item';
export const path = 'acl/routes';

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
      {desc: <span>Rol <i className="fa fa-angle-up"></i></span>, field: 'routeAsc'},
      {desc: <span>Rol <i className="fa fa-angle-down"></i></span>, field: 'routeDesc'},
    ]
  }
];

export function initialValues(values) {
  return Object.assign({},
    values
  );
}

export default function fields(roles) {

  const roleOptions = () => {
    const options = [];
    if (typeof roles === 'object') {
      _.sortBy(roles, 'route').map((role) => {
        options.push({value: role.id, desc: role.desc});
      });
    }
    return options;
  };

  return ([
    {
      name: 'route',
      label: 'Route',
      type: 'text',
      placeholder: 'Route',
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
