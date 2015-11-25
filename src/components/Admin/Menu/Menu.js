import React, { Component } from 'react';
import MenuWrap from './MenuWrap';

const tree = [
  {'desc': 'Admin', 'to': '/admin', icon: 'fa-home'},
  {'desc': 'Users', 'to': '/admin/users', icon: 'fa-users', children: [
    {desc: 'Nieuwe gebruiker', to: '/admin/users/new'}
  ]},
  {'desc': 'Affiliates', 'to': '/admin/affiliates', icon: 'fa-lock', children: [
    {desc: 'Sites', to: '/admin/affiliates/sites', children: [
      {desc: 'Nieuwe site', to: '/admin/affiliates/sites/new'},
      {desc: 'Upload CSV', to: '/admin/affiliates/sites/upload-csv'}
    ]},
    {desc: 'Categorieen', to: '/admin/affiliates/categories', children: [
      {desc: 'Nieuwe categorie', to: '/admin/affiliates/categories/new'}
    ]},
    {desc: 'Kortingscodes', to: '/admin/affiliates/discount-codes', children: [
      {desc: 'Nieuwe kortingscode', to: '/admin/affiliates/discount-codes/new'}
    ]},
    {desc: 'Aanbiedingen', to: '/admin/affiliates/offers', children: [
      {desc: 'Nieuwe aanbieding', to: '/admin/affiliates/offers/new'}
    ]},
  ]}
];

class Menu extends Component {

  render() {
    return (
      <aside id="left-panel">
        <nav>
          <MenuWrap menu={tree} active/>
        </nav>
      </aside>
    );
  }
}

export default Menu;
