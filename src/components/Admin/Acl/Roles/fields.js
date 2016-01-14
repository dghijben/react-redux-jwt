import _ from 'lodash';
import React from 'react';

export const reducerIndex = 'data';
export const reducerKey = 'aclRoles';
export const reducerItem = 'item';
export const path = 'acl/roles';

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
      {desc: <span>Rol <i className="fa fa-angle-up"></i></span>, field: 'descAsc'},
      {desc: <span>Rol <i className="fa fa-angle-down"></i></span>, field: 'descDesc'},
    ]
  }
];

export function initialValues(values) {
  return Object.assign({},
    values
  );
}

export default function fields(routes) {
  const routeOptions = () => {
    const options = [];
    if (typeof routes === 'object') {
      _.sortBy(routes, 'route').map((route) => {
        options.push({value: route.id, desc: route.route});
      });
    }
    return options;
  };

  return ([
    {
      name: 'role',
      label: 'ROLE',
      type: 'text',
      placeholder: 'ROLE',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'desc',
      label: 'Omschrijving',
      type: 'text',
      placeholder: 'Omschrijving',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10'
    },
    {
      name: 'routes',
      label: 'Routes',
      type: 'checkboxListiOs',
      labelClassName: 'col-md-2',
      wrapperClassName: 'col-md-10',
      options: routeOptions()
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
