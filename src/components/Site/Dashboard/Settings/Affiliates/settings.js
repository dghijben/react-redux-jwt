// import _ from 'lodash';
import React from 'react';
// import * as actions from 'redux/modules/store/actions';

export const reducerIndex = 'store';
export const reducerKey = 'dashboardAffiliates';
export const reducerKeyCats = 'categories';
export const reducerItem = 'item';

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

