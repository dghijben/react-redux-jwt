import React, { Component } from 'react';
import MenuWrap from './MenuWrap';

const tree = [
  {'desc': 'Admin', 'to': '/admin', icon: 'fa-home'},
  {'desc': 'Users', 'to': '/admin/users', icon: 'fa-users', children: [
    {desc: 'Nieuwe gebruiker', to: '/admin/users/new'},
    {desc: 'Rollen', to: '/admin/roles'}
  ]},
  {'desc': 'ACL', 'to': '/admin/acl', icon: 'fa-lock', children: [
    {desc: 'Rollen', to: '/admin/acl/roles', children: [
      {desc: 'Nieuwe rol', to: '/admin/acl/roles/new', icon: 'fa-plus-square'}
    ]},
    {desc: 'Routes', to: '/admin/acl/routes'}
  ]},
  {'desc': 'Affiliates', 'to': '/admin/affiliates', icon: 'fa-lock', children: [
    {desc: 'Sites', to: '/admin/affiliates/sites', children: [
      {desc: 'Nieuwe site', to: '/admin/affiliates/sites/new', icon: 'fa-plus-square'}
    ]},
    {desc: 'Categorieen', to: '/admin/affiliates/categories', children: [
      {desc: 'Nieuwe categorie', to: '/admin/affiliates/categories/new'}
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
