import React from 'react';
export const reducerIndex = 'affiliates';
export const reducerItem = 'record';
export const path = 'affiliates';
export const name = 'dataoverview';

export const searchFields = [
  {row:
  {bsSize: 'large', col:
    [
      {md: 6, children: [
        {name: 'search', type: 'text', placeholder: 'zoeken...',
          buttonBefore: {
            name: 'searchField', type: 'dropdown',
            items: [
              {default: 'Alle'},
              {desc: 'Affiliate', field: 'naam'}
            ]
          },
          buttonAfter: {
            type: 'submit',
            value: <i className="fa fa-search"></i>
          }
        }
      ]},
      {md: 6, children: [
        {name: 'order', type: 'dropdown', bsStyle: 'default',
          items: [
            {default: 'Sorteren'},
            {desc: <span>Affiliate <i className="fa fa-arrow-circle-up"></i></span>, field: 'nameAsc'},
            {desc: <span>Affiliate <i className="fa fa-arrow-circle-down"></i></span>, field: 'nameDesc'}
          ]
        }
      ]},
    ]
  }
  }
];
