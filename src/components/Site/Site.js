import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { PropTypes as historyPropTypes } from 'react-router';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import bootstrapLink, {bootstrapSelectLink} from 'utils/bootstrapLink';
import {stringifyFullState} from 'utils/functions';
let myTimeout = null;

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.authorized = this.authorized.bind(this);
    this.loginLink = this.loginLink.bind(this);
    this.logoutLink = this.logoutLink.bind(this);
    this.userDropDown = this.userDropDown.bind(this);
    this.pushSearch = this.pushSearch.bind(this);
    this.submit = this.submit.bind(this);
    this.state = { form: {}};
  }

  authorized() {
    if (_.get(this.props, 'authorization.loggedIn', false) === true) {
      return this.userDropDown();
    }

    return this.loginLink();
  }

  userDropDown() {
    const title = <span><i className="fa fa-user"></i> Mijn account</span>;
    return (
      <NavDropdown eventKey={4} title={title} id="dropdown-usermenu">
        <MenuItem header>{_.get(this.props.authorization, ['user', 'firstname'], 'Account')}</MenuItem>
        <MenuItem divider/>
        <MenuItem eventKey="4.1" {...bootstrapSelectLink(this.context.history, null, '/dashboard')}>
          <i className="fa fa-dashboard "></i> Dashboard
        </MenuItem>
        <MenuItem eventKey="4.2" {...bootstrapSelectLink(this.context.history, null, '/admin')}><i className="fa fa-database"></i> Admin</MenuItem>
        <MenuItem eventKey="4.3" {...bootstrapSelectLink(this.context.history, null, '/dashboard/user')}><i className="fa fa-wrench"></i> Account</MenuItem>
        <MenuItem divider/>
        <MenuItem eventKey="4.4" {...bootstrapSelectLink(this.context.history, null, '/logout')}><i className="fa fa-lock"></i> Uitloggen</MenuItem>
      </NavDropdown>
    );
  }

  loginLink() {
    return ([
      <NavItem key={1} eventKey={1} {...bootstrapLink(this.context.history, null, '/login')}>
        <i className="fa fa-external-link"></i>Inloggen
      </NavItem>,
      <NavItem key={2} eventKey={1} {...bootstrapLink(this.context.history, null, '/register')}>
        <i className="fa fa-terminal"></i>Registreren
      </NavItem>
    ]);
  }

  logoutLink() {
    return (
      <NavItem eventKey={1} {...bootstrapLink(this.context.history, null, '/logout')}>
        <i className="fa fa-user"></i> <span>{_.get(this.props, 'authorization.user.name')}</span>
        {' '}
        <i className="fa fa-lock"></i>
      </NavItem>
    );
  }

  pushSearch(e) {
    const value = e.target.value;
    this.setState({
      form: {
        q: value
      },
      skip: 2
    }, () => {
      if (myTimeout) {
        clearTimeout(myTimeout);
      }
      myTimeout = setTimeout(() => {
        const q = stringifyFullState(this.state.form);
        this.props.history.pushState(null, '/zoeken' + '?' + q);
      }, 500);
    });
  }

  submit(e) {
    e.preventDefault();
    const q = stringifyFullState(this.state.form);
    this.props.history.pushState(null, '/zoeken' + '?' + q);
  }

  render() {
    return (
      <div id="wrapper">
        <Helmet
          title="Site"
          titleTemplate="MySite.com - %s"
          link={[
            {'rel': 'stylesheet', 'href': 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.css', 'type': 'text/css', 'media': 'screen'},
            {'rel': 'stylesheet', 'href': '/font-awesome-4.4.0/css/font-awesome.min.css', 'type': 'text/css', 'media': 'screen'},
            {'rel': 'stylesheet', 'href': '/boss/css/style.css', 'type': 'text/css', 'media': 'screen'},
            {'rel': 'stylesheet', 'href': '/boss/css/revslider/revslider-index.css', 'type': 'text/css', 'media': 'screen'},
            {'rel': 'stylesheet', 'href': '/boss/css/colors/green.css', 'type': 'text/css', 'media': 'screen'},
            {'rel': 'stylesheet', 'href': '/css/animate.css', 'type': 'text/css', 'media': 'screen'},
            {'rel': 'stylesheet', 'href': '/css/custom.css', 'type': 'text/css', 'media': 'screen'},
            {'rel': 'stylesheet', 'href': '/boss/css/jquery.selectbox.css', 'type': 'text/css', 'media': 'screen'}
          ]}
          script={[
            {src: '/boss/js/jquery.min.js', 'type': 'text/javascript'},
            {src: '/boss/js/modernizr.js', 'type': 'text/javascript'},
            {src: '//cdn.tinymce.com/4/tinymce.min.js', 'type': 'text/javascript'},
            {src: '/boss/js/jquery.hoverIntent.min.js', 'type': 'text/javascript'},
            {src: '/boss/js/bootstrap.min.js', 'type': 'text/javascript'},
            {src: '/boss/js/waypoints.min.js', 'type': 'text/javascript'},
            {src: '/boss/js/waypoints-sticky.min.js', 'type': 'text/javascript'},
            {src: '/boss/js/jquery.selectbox.min.js', 'type': 'text/javascript'},
            {src: '/boss/js/main.js', 'type': 'text/javascript'},
            {src: '/plupload-2.1.8/js/plupload.full.min.js', 'type': 'text/javascript'},

          ]}
          />
        <header id="header" role="banner">
          <div className="collapse navbar-white" id="header-search-form">
            <div className="container">
              <form className="navbar-form animated fadeInDown" role="search">
                <input type="search" id="s" name="s" className="form-control" placeholder="Goede doelen zoeken..." onChange={this.pushSearch}/>
                <button type="submit" className="btn-circle" title="Search" onClick={this.submit}><i className="fa fa-search"></i></button>
              </form>
            </div>
          </div>
          <nav className="navbar navbar-white animated-dropdown ttb-dropdown" role="navigation">

            <div className="navbar-top clearfix">
              <div className="container">
                <div className="pull-left">
                  <div className="dropdown account-dropdown ">
                    <Nav bsStyle="pills">
                      {this.authorized()}
                    </Nav>
                  </div>
                </div>

                <div className="pull-right">
                  <div className="social-icons pull-right hidden-xs">
                    <a href="#" className="social-icon icon-facebook" title="Facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#" className="social-icon icon-twitter" title="Twitter">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#" className="social-icon icon-google-plus" title="Google Plus">
                      <i className="fa fa-google-plus"></i>
                    </a>
                    <a href="#" className="social-icon icon-dribbble" title="Dribbble">
                      <i className="fa fa-dribbble"></i>
                    </a>
                    <a href="#" className="social-icon icon-reddit" title="Reddit">
                      <i className="fa fa-reddit"></i>
                    </a>
                    <a href="#" className="social-icon icon-skype" title="Skype">
                      <i className="fa fa-skype"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="navbar-inner sticky-menu">
              <div className="container">
                <div className="navbar-header">

                  <button type="button" className="navbar-toggle btn-circle pull-right collapsed" data-toggle="collapse"
                          data-target="#main-navbar-container">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link to="/" className="navbar-brand text-uppercase"
                     title="Boss - Multipurpose Premium Html5 Template">
                    <img src="/logo.png" className="img-responsive"/>

                  </Link>

                  <button type="button" className="navbar-btn btn-icon btn-circle pull-right last visible-sm visible-xs"
                          data-toggle="collapse" data-target="#header-search-form"><i className="fa fa-search"></i>
                  </button>
                </div>

                <div className="collapse navbar-collapse" id="main-navbar-container">
                  <ul className="nav navbar-nav">
                    <li className="visible-lg"><Link to="/zoeken">Doel steunen</Link></li>
                  </ul>

                  <button type="button"
                          className="navbar-btn btn-icon btn-circle navbar-right last  hidden-sm hidden-xs"
                          data-toggle="collapse" data-target="#header-search-form"><i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </header>

          <div id="content" role="main" className="no-padding">
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

App.contextTypes = {
  history: historyPropTypes.history
};

export default connect(state => ({
  authorization: state.authorization
}))(App);
