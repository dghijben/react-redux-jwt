import React, { Component } from 'react';
import MenuWrap from './MenuWrap';

const tree = [
  {'desc': 'Admin', 'to': '/admin', icon: 'fa-home'},
  {'desc': 'Users', 'to': '/admin/users', icon: 'fa-users', children: [
    {desc: 'Nieuwe gebruiker', to: '/admin/users/new'},
    {desc: 'Rollen', to: '/admin/roles'}
  ]},
  {'desc': 'ACL', 'to': '/admin/acl', icon: 'fa-lock', children: [
    {desc: 'Nieuwe rol', to: '/admin/acl/new'},
    {desc: 'Routes', to: '/admin/acl/routes'},
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
