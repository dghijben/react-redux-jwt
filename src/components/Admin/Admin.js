import React, { PropTypes } from 'react';
import { PropTypes as historyPropTypes } from 'react-router';
import Menu from './Menu/Menu';
class Admin extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    history: historyPropTypes.history,
  };

  static contextTypes = {
    children: React.PropTypes.func
  };

  constructor(context, props) {
    super(context, props);
  }

  render() {
    return (
      <div >
        <header id="header">
          <div id="logo-group"></div>
        </header>

        <Menu />

        <div id="main" role="main">
          {this.props.children && React.cloneElement(this.props.children)}
        </div>
      </div>
    );
  }
}

export default Admin;
