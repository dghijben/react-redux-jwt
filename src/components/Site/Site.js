import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { PropTypes as historyPropTypes } from 'react-router';
import { Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { getUser, isLoaded } from '../../redux/modules/auth/authActions';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

class App extends Component {

  constructor(context, props) {
    super(context, props);
    this.bootstrapLink = this.bootstrapLink.bind(this);
    this.authorized = this.authorized.bind(this);
    this.loginLink = this.loginLink.bind(this);
    this.logoutLink = this.logoutLink.bind(this);
  }

  static fetchDatax(getState, dispatch) {
    const state = getState();
    if (_.get(state, 'authorization.token', null) !== null) {
      if (!isLoaded(getState())) {
        return dispatch(getUser(getState().authorization.token));
      }
    }
  }

  bootstrapLink(state, path, query = null) {
    const history = this.props.history;
    return {
      'href': history.createPath(path, query),
      'onClick': (event) => {
        event.preventDefault();
        history.pushState(state, path);
      },
      active: history.isActive(path, query)
    };
  }

  authorized() {
    if (_.get(this.props, 'authorization.loggedIn', false) === true) {
      return this.logoutLink();
    }

    return this.loginLink();
  }

  loginLink() {
    return (
      <NavItem eventKey={1} {...this.bootstrapLink(null, '/login')}>
        <i className="fa fa-user"></i> <i className="fa fa-unlock"></i>
      </NavItem>
    );
  }

  logoutLink() {
    return (
      <NavItem eventKey={1} {...this.bootstrapLink(null, '/logout')}>
        <i className="fa fa-user"></i> <span>{_.get(this.props, 'authorization.user.name')}</span> <i
        className="fa fa-lock"></i>
      </NavItem>
    );
  }

  render() {
    return (
      <div>
        <Helmet
          title="Site"
          titleTemplate="MySite.com - %s"
          link={[{'rel': 'stylesheet', 'href': '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css', 'type': 'text/css', 'media': 'screen'}]}
          />
        <Navbar>
          <NavBrand>React-Bootstrap</NavBrand>
          <Nav bsStyle="tabs">
            <NavItem eventKey={2} {...this.bootstrapLink(null, '/')} title="Item">Home</NavItem>
            <NavItem eventKey={1} {...this.bootstrapLink(null, '/about')}>About</NavItem>
            <NavDropdown eventKey={4} title="Dropdown" id="nav-dropdown">
              <MenuItem eventKey="4.1">Action</MenuItem>
              <MenuItem eventKey="4.2">Another action</MenuItem>
              <MenuItem eventKey="4.3">Something else here</MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey="4.4">Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav navbar right>
            {this.authorized()}
          </Nav>
        </Navbar>

        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  history: historyPropTypes.history,
  authorization: PropTypes.object.isRequired
};

export default connect(state => ({
  authorization: state.authorization
}))(App);
