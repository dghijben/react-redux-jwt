import _ from 'lodash';
import React, { Component } from 'react';
import { Link, PropTypes as historyPropTypes } from 'react-router';
const tree = [
  {'to': '/admin', 'desc': 'Admin'},
  {'to': '/admin/users', 'desc': 'Users'}
];

class Menu extends Component {

  render() {
    return (
      <aside id="left-panel">
        <nav>
          <ul>
            {_.map(tree, (item, i)=> {
              return (
              <li key={i}>
                <Link to={item.to} activeClassName="active">
                  <i className="fa fa-lg fa-fw fa-home"></i>{' '}
                  <span className="menu-item-parent">{item.desc}</span>
                </Link>
              </li>);
            })}
          </ul>
        </nav>
      </aside>
    );
  }
}


Menu.propTypes = {
  history: historyPropTypes.history
};

export default Menu;
