import React, { Component } from 'react';
import MenuWrap from './MenuWrap';

const tree = [
  {'desc': 'Admin', 'to': '/admin', icon: 'fa-home'},
  {'desc': 'Users', 'to': '/admin/users', icon: 'fa-users'},
  {'desc': 'ACL', 'to': '/admin/acl', icon: 'fa-lock'},
  {'desc': 'Wrap', 'to': '/admin/wrap', icon: 'fa-plus', children: [
    {desc: 'child 1', to: '/admin/wrap/child1'},
    {desc: 'child 2', to: '/admin/wrap/child1'},
    {desc: 'child 3', to: '/admin/wrap/child1'}
  ]}
];

class Menu extends Component {

  render() {
    return (
      <aside id="left-panel">
        <nav>
          <MenuWrap menu={tree} />
        </nav>
      </aside>
    );
  }
}

export default Menu;
