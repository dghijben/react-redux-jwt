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
            {src: '/boss/js/modernizr.js', 'type': 'text/javascript'},
            {src: '/boss/js/jquery.min.js', 'type': 'text/javascript'},
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
                <input type="search" id="s" name="s" className="form-control" placeholder="Search in here..." onChange={this.pushSearch}/>
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
                     title="Boss - Multipurpose Premium Html5 Template">Boss</Link>

                  <button type="button" className="navbar-btn btn-icon btn-circle pull-right last visible-sm visible-xs"
                          data-toggle="collapse" data-target="#header-search-form"><i className="fa fa-search"></i>
                  </button>

                  <div className="dropdown cart-dropdown visible-sm visible-xs pull-right">
                    <button type="button" className="navbar-btn btn-icon btn-circle dropdown-toggle"
                            data-toggle="dropdown"><i className="fa fa-shopping-cart"></i></button>
                    <div className="dropdown-menu cart-dropdown-menu" role="menu">
                      <p className="cart-dropdown-desc"><i className="fa fa-cart-plus"></i>You have 2 product(s) in your
                        cart:</p>
                      <hr />
                      <div className="product clearfix">
                        <a href="#" className="remove-btn" title="Remove"><i className="fa fa-close"></i></a>

                        <div className="product-meta">
                          <h4 className="product-name"><a href="product.html">Seamsun 3d Smart Tv</a></h4>

                          <div className="product-quantity">x 2 piece(s)</div>
                          <div className="product-price-container">
                            <span className="product-price">$80.50</span>
                            <span className="product-old-price">$120.50</span>
                          </div>
                        </div>
                      </div>
                      <div className="product clearfix">
                        <a href="#" className="remove-btn" title="Remove"><i className="fa fa-close"></i></a>

                        <div className="product-meta">
                          <h4 className="product-name"><a href="product.html">Banana Smart Watch</a></h4>

                          <div className="product-quantity">x 1 piece(s)</div>
                          <div className="product-price-container">
                            <span className="product-price">$120.99</span>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="cart-action">
                        <div className="pull-left cart-action-total">
                          <span>Total:</span> $281.99
                        </div>
                        <div className="pull-right">
                          <a href="#" className="btn btn-custom ">Go to Cart</a>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>

                <div className="collapse navbar-collapse" id="main-navbar-container">
                  <ul className="nav navbar-nav">
                    <li className="dropdown active megamenu-container">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                         aria-expanded="false">Home<span className="angle"></span></a>

                      <div className="dropdown-menu megamenu" role="menu">
                        <div className="container">
                          <div className="row">
                            <div className="col-sm-3">
                              <ul>
                                <li><a href="index.html">Home - Version 1</a></li>
                                <li><a href="index2.html">Home - Version 2</a></li>
                                <li><a href="index3.html">Home - Version 3</a></li>
                                <li><a href="index4.html">Home - Version 4</a></li>
                                <li><a href="index5.html">Home - Version 5</a></li>
                                <li><a href="index6.html">Home - Version 6</a></li>
                                <li><a href="index7.html">Home - Version 7</a></li>
                                <li><a href="index8.html">Home - Version 8</a></li>
                                <li><a href="index9.html">Home - Version 9</a></li>
                                <li><a href="index10.html">Home - Version 10</a></li>
                              </ul>
                            </div>
                            <div className="col-sm-3">
                              <ul>
                                <li><a href="index11.html">Home - Version 11</a></li>
                                <li><a href="index12.html">Home - Version 12</a></li>
                                <li><a href="index13.html">Home - Portfolio 1</a></li>
                                <li><a href="index14.html">Home - Portfolio 2</a></li>
                                <li><a href="index15.html">Home - Portfolio 3</a></li>
                                <li><a href="index16.html">Home - Portfolio 4</a></li>
                                <li><a href="index17.html">Home - Portfolio 5</a></li>
                                <li><a href="index18.html">Home - Portfolio 6</a></li>
                                <li><a href="index19.html">Home - Portfolio 7</a></li>
                                <li><a href="index20.html">Home - Blog 1</a></li>
                              </ul>
                            </div>
                            <div className="col-sm-3">
                              <ul>
                                <li><a href="index21.html">Home - Blog 2</a></li>
                                <li><a href="index22.html">Home - Blog 3</a></li>
                                <li><a href="index23.html">Home - Magazine 1</a></li>
                                <li><a href="index24.html">Home - Magazine 2</a></li>
                                <li><a href="index25.html">Home - Shop 1</a></li>
                                <li><a href="index26.html">Home - Shop 2</a></li>
                                <li><a href="index27.html">Home - Shop 3</a></li>
                                <li><a href="index28.html">Home - Shop 4</a></li>
                                <li><a href="index29.html">Home - Landing 1</a></li>
                                <li><a href="index30.html">Home - Landing 2</a></li>
                              </ul>
                            </div>
                            <div className="col-sm-3">
                              <ul>
                                <li><a href="index31.html">Home - Landing 3</a></li>
                                <li><a href="index32.html">Home - Onepage 1</a></li>
                                <li><a href="index33.html">Home - Onepage 2</a></li>
                                <li><a href="index34.html">Home - Onepage 3</a></li>
                                <li><a href="index35.html">Home - Onepage 4</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown megamenu-container">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                         aria-expanded="false">Pages<span className="angle"></span></a>

                      <div className="dropdown-menu megamenu" role="menu">
                        <div className="container">
                          <div className="row">
                            <div className="col-sm-3">
                              <ul>
                                <li><a href="aboutus.html">About - Agency</a></li>
                                <li><a href="aboutus2.html">About - Agency 2</a></li>
                                <li><a href="aboutus3.html">About - Agency 3</a></li>
                                <li><a href="aboutus4.html">About - Agency 4</a></li>
                                <li><a href="aboutus5.html">About - Agency 5</a></li>
                                <li><a href="aboutme.html">About - Personal</a></li>
                                <li><a href="aboutme2.html">About - Personal 2</a></li>
                                <li><a href="aboutme3.html">About - Personal 3</a></li>
                                <li><a href="aboutme4.html">About - Personal 4</a></li>
                                <li><a href="services1.html">Services - Page 1</a></li>
                                <li><a href="services2.html">Services - Page 2</a></li>
                                <li><a href="services3.html">Services - Page 3</a></li>
                              </ul>
                            </div>
                            <div className="col-sm-3">
                              <ul>
                                <li><a href="services4.html">Services - Page 4</a></li>
                                <li><a href="services5.html">Services - Page 5</a></li>
                                <li><a href="services6.html">Services - Page 6</a></li>
                                <li><a href="pricing.html">Pricing Tables 1</a></li>
                                <li><a href="pricing2.html">Pricing Tables 2</a></li>
                                <li><a href="pricing3.html">Pricing Tables 3</a></li>
                                <li><a href="pricing4.html">Pricing Tables 4</a></li>
                                <li><a href="events.html">Events - Grid 1</a></li>
                                <li><a href="events-right-sidebar.html">Events - Grid 2</a></li>
                                <li><a href="events-left-sidebar.html">Events - Grid 3</a></li>
                                <li><a href="events-list.html">Events - List 1</a></li>
                                <li><a href="events-list-right-sidebar.html">Events - List 2</a></li>
                              </ul>
                            </div>
                            <div className="col-sm-3">
                              <ul>
                                <li><a href="events-list-left-sidebar.html">Events - List 3</a></li>
                                <li><a href="knowledge.html">knowledge Base 1</a></li>
                                <li><a href="knowledge2.html">knowledge Base 2</a></li>
                                <li><a href="knowledge3.html">knowledge Base 3</a></li>
                                <li><a href="testimonials.html">Testimonials - Page</a></li>
                                <li><a href="testimonials2.html">Testimonials - Page 2</a></li>
                                <li><a href="testimonials3.html">Testimonials - Page 3</a></li>
                                <li><a href="team.html">Team - Page</a></li>
                                <li><a href="team2.html">Team - Page 2</a></li>
                                <li><a href="team3.html">Team - Page 3</a></li>
                                <li><a href="faqs.html">FaQs - Page 1</a></li>
                                <li><a href="faqs2.html">FaQs - Page 2</a></li>
                              </ul>
                            </div>
                            <div className="col-sm-3">
                              <ul>
                                <li><a href="faqs3.html">FaQs - Page 3</a></li>

                                <li><a href="404.html">404 - Version 1</a></li>
                                <li><a href="404-2.html">404 - Version 2</a></li>
                                <li><a href="404-3.html">404 - Version 3</a></li>
                                <li><a href="404-4.html">404 - Version 4</a></li>
                                <li><a href="404-5.html">404 - Version 5</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                         aria-expanded="false">Shop<span className="angle"></span></a>
                      <ul className="dropdown-menu" role="menu">
                        <li className="dropdown sub-dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                             aria-expanded="false">Category Grid<span className="angle"></span></a>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="category.html">Grid - Right Sidebar</a></li>
                            <li><a href="category-left-sidebar.html">Grid - Left Sidebar</a></li>
                            <li><a href="category-both-sidebar.html">Grid - Both Sidebar</a></li>
                            <li><a href="category-4col.html">Grid - 4 Columns</a></li>
                          </ul>
                        </li>
                        <li className="dropdown sub-dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                             aria-expanded="false">Category List<span className="angle"></span></a>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="category-list.html">List - Right Sidebar</a></li>
                            <li><a href="category-list-left-sidebar.html">List - Left Sidebar</a></li>
                            <li><a href="category-list-both-sidebar.html">List - Both Sidebar</a></li>
                          </ul>
                        </li>
                        <li className="dropdown sub-dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                             aria-expanded="false">Product Page<span className="angle"></span></a>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="product.html">Product - Version 1</a></li>
                            <li><a href="product2.html">Product - Version 2</a></li>
                            <li><a href="product3.html">Product - Version 3</a></li>
                          </ul>
                        </li>
                        <li><a href="cart.html">Shopping Cart</a></li>
                        <li><a href="cart2.html">Shopping Cart 2</a></li>
                        <li><a href="checkout.html">Checkout - Version 1</a></li>
                        <li><a href="checkout2.html">Checkout - Version 2</a></li>
                        <li><a href="compare.html">Compare Products</a></li>
                        <li><a href="wishlist.html">Wishlist Page</a></li>
                        <li className="dropdown sub-dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                             aria-expanded="false">Login<span className="angle"></span></a>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="login.html">Login - Version 1</a></li>
                            <li><a href="login2.html">Login - Version 2</a></li>
                            <li><a href="login3.html">Login - Version 3</a></li>
                            <li><a href="login4.html">Login - Version 4</a></li>
                            <li><a href="login5.html">Login - Version 5</a></li>
                            <li><a href="login6.html">Login - Version 6</a></li>
                            <li><a href="login7.html">Login - Version 7</a></li>
                            <li><a href="login8.html">Login - Version 8</a></li>
                          </ul>
                        </li>

                        <li><a href="register.html">Register - Version 1</a></li>
                        <li><a href="register2.html">Register - Version 2</a></li>
                        <li><a href="recover-password.html">Password Recover</a></li>
                      </ul>
                    </li>
                    <li className="dropdown megamenu-container">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                         aria-expanded="false">Portfolio<span className="angle"></span></a>

                      <div className="dropdown-menu megamenu" role="menu">
                        <div className="container">
                          <div className="row">
                            <div className="col-sm-3">
                              <a href="#" className="megamenu-title">Fullwidth</a>
                              <ul>
                                <li><a href="portfolio-masonry-fullwidth-6col.html">Masonry - 6 Columns</a></li>
                                <li><a href="portfolio-masonry-fullwidth-5col.html">Masonry - 5 Columns</a></li>
                                <li><a href="portfolio-masonry-fullwidth-4col.html">Masonry - 4 Columns</a></li>
                                <li><a href="portfolio-masonry-fullwidth-3col.html">Masonry - 3 Columns</a></li>
                                <li><a href="portfolio-grid-fullwidth-6col.html">Grid - 6 Columns</a></li>
                                <li><a href="portfolio-grid-fullwidth-5col.html">Grid - 5 Columns</a></li>
                                <li><a href="portfolio-grid-fullwidth-4col.html">Grid - 4 Columns</a></li>
                                <li><a href="portfolio-grid-fullwidth-3col.html">Grid - 3 Columns</a></li>
                              </ul>
                            </div>
                            <div className="col-sm-3">
                              <a href="#" className="megamenu-title">Boxed</a>
                              <ul>
                                <li><a href="portfolio-masonry-4col.html">Masonry - 4 Columns</a></li>
                                <li><a href="portfolio-masonry-3col.html">Masonry - 3 Columns</a></li>
                                <li><a href="portfolio-masonry-left-sidebar.html">Masonry - Left Sidebar</a></li>
                                <li><a href="portfolio-masonry-left-sidebar-2col.html">Masonry - 2 Col Sidebar</a></li>
                                <li><a href="portfolio-masonry-right-sidebar.html">Masonry - Right Sidebar</a></li>
                                <li><a href="portfolio-masonry-right-sidebar-2col.html">Masonry - 2 Col Sidebar</a></li>
                              </ul>
                            </div>
                            <div className="col-sm-3">
                              <a href="#" className="megamenu-title">Boxed</a>
                              <ul>
                                <li><a href="portfolio-grid-4col.html">Grid - 4 Columns</a></li>
                                <li><a href="portfolio-grid-3col.html">Grid - 3 Columns</a></li>
                                <li><a href="portfolio-grid-left-sidebar.html">Grid - Left Sidebar</a></li>
                                <li><a href="portfolio-grid-left-sidebar-2col.html">Grid - 2 Col Sidebar</a></li>
                                <li><a href="portfolio-grid-right-sidebar.html">Grid - Right Sidebar</a></li>
                                <li><a href="portfolio-grid-right-sidebar-2col.html">Grid - 2 Col Sidebar</a></li>
                              </ul>
                            </div>
                            <div className="col-sm-3">
                              <a href="#" className="megamenu-title">Single</a>
                              <ul>
                                <li><a href="single-portfolio.html">Single - Image</a></li>
                                <li><a href="single-portfolio-gallery.html">Single - Gallery</a></li>
                                <li><a href="single-portfolio-video.html">Single - Video</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                         aria-expanded="false">Blog<span className="angle"></span></a>
                      <ul className="dropdown-menu" role="menu">

                        <li className="dropdown sub-dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                             aria-expanded="false">blog - Simple<span className="angle"></span></a>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="blog.html">Blog Simple</a></li>
                            <li><a href="blog-left-sidebar.html">Blog -Left Sidebar</a></li>
                            <li><a href="blog-right-sidebar.html">Blog -Right Sidebar</a></li>
                          </ul>
                        </li>
                        <li className="dropdown sub-dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                             aria-expanded="false">blog - Classic<span className="angle"></span></a>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="blog-classic-fullwidth.html">Blog - Fullwidth</a></li>
                            <li><a href="blog-classic-left-sidebar.html">Blog - Left Sidebar</a></li>
                            <li><a href="blog-classic-right-sidebar.html">Blog - Right Sidebar</a></li>
                            <li><a href="blog-classic-both-sidebar.html">Blog - Both Sidebar</a></li>
                          </ul>
                        </li>
                        <li className="dropdown sub-dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                             aria-expanded="false">Blog List<span className="angle"></span></a>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="blog-list-left-sidebar.html">List - Left Sidebar</a></li>
                            <li><a href="blog-list-right-sidebar.html">List - Right Sidebar</a></li>
                            <li><a href="blog-list-fullwidth.html">List - Fullwidth</a></li>
                          </ul>
                        </li>
                        <li className="dropdown sub-dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                             aria-expanded="false">Masonry - Boxed<span className="angle"></span></a>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="blog-masonry-left-sidebar.html">Blog - Left Sidebar</a></li>
                            <li><a href="blog-masonry-right-sidebar.html">Blog - Right Sidebar</a></li>
                            <li><a href="blog-masonry-3col.html">Masonry - 3 Columns</a></li>
                            <li><a href="blog-masonry-4col.html">Masonry - 4 Columns</a></li>
                          </ul>
                        </li>
                        <li className="dropdown sub-dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                             aria-expanded="false">Masonry - Fullwidth<span className="angle"></span></a>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="blog-masonry-fullwidth-3col.html">Masonry - 3 Columns</a></li>
                            <li><a href="blog-masonry-fullwidth-4col.html">Masonry - 4 Columns</a></li>
                            <li><a href="blog-masonry-fullwidth-5col.html">Masonry - 5 Columns</a></li>
                            <li><a href="blog-masonry-fullwidth-6col.html">Masonry - 6 Columns</a></li>
                          </ul>
                        </li>
                        <li className="dropdown sub-dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                             aria-expanded="false">Blog timeline<span className="angle"></span></a>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="blog-timeline.html">Timeline - Version 1</a></li>
                            <li><a href="blog-timeline2.html">Timeline - Version 2</a></li>
                            <li><a href="blog-timeline3.html">Timeline - Version 3</a></li>
                          </ul>
                        </li>
                        <li className="dropdown sub-dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                             aria-expanded="false">Blog Post<span className="angle"></span></a>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="single.html">Blog Post</a></li>
                            <li><a href="single-left-sidebar.html">Post - Left Sidebar</a></li>
                            <li><a href="single-right-sidebar.html">Blog - Right Sidebar</a></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown megamenu-container">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                         aria-expanded="false">Elements<span className="angle"></span></a>

                      <div className="dropdown-menu megamenu" role="menu">
                        <div className="container">
                          <div className="row">
                            <div className="col-sm-3">
                              <a href="#" className="megamenu-title">Boss Elements</a>
                              <ul>
                                <li><a href="elements-tabs.html">Elements - Tabs</a></li>
                                <li><a href="elements-collapses.html">Elements - Collapses</a></li>
                                <li><a href="elements-buttons.html">Elements - Buttons</a></li>
                                <li><a href="elements-typography.html">Elements - Typography</a></li>
                                <li><a href="elements-forms.html">Elements - Forms</a></li>
                                <li><a href="elements-portfolio.html">Elements - Portfolio</a></li>
                                <li><a href="elements-products.html">Elements - Products</a></li>
                                <li><a href="elements-pageheaders.html">Elements - Page Header</a></li>
                                <li><a href="elements-progressbars.html">Elements - Progress Bars</a></li>
                                <li><a href="elements-services.html">Elements - Services</a></li>
                                <li><a href="elements-callouts.html">Elements - Callouts</a></li>
                                <li><a href="elements-titles.html">Elements - Titles</a></li>
                                <li><a href="elements-icons.html">Elements - icons</a></li>
                                <li><a href="elements-lists.html">Elements - lists</a></li>
                              </ul>
                            </div>
                            <div className="col-sm-3">
                              <a href="#" className="megamenu-title">Boss Elements</a>
                              <ul>
                                <li><a href="elements-teammembers.html">Elements - Team Members</a></li>
                                <li><a href="elements-tables.html">Elements - Tables</a></li>
                                <li><a href="elements-carousels.html">Elements - Carousels</a></li>
                                <li><a href="elements-socialicons.html">Elements - Social Icons</a></li>
                                <li><a href="elements-maps.html">Elements - Maps</a></li>
                                <li><a href="elements-counters.html">Elements - Counters</a></li>
                                <li><a href="elements-animations.html">Elements - Animations</a></li>
                                <li><a href="elements-alerts.html">Elements - Alerts</a></li>
                                <li><a href="elements-dividers.html">Elements - Dividers</a></li>
                                <li><a href="elements-media.html">Elements - Media</a></li>
                                <li><a href="elements-modals.html">Elements - Modals</a></li>
                                <li><a href="elements-grid.html">Elements - Grid</a></li>
                                <li><a href="elements-more.html">Elements - More</a></li>
                              </ul>
                            </div>
                            <div className="col-sm-3">
                              <a href="#" className="megamenu-title">Headers</a>
                              <ul>
                                <li><a href="header.html">Header - Version 1</a></li>
                                <li><a href="header2.html">Header - Version 2</a></li>
                                <li><a href="header3.html">Header - Version 3</a></li>
                                <li><a href="header4.html">Header - Version 4</a></li>
                                <li><a href="header5.html">Header - Version 5</a></li>
                                <li><a href="header6.html">Header - Version 6</a></li>
                                <li><a href="header7.html">Header - Version 7</a></li>
                                <li><a href="header8.html">Header - Version 8</a></li>
                                <li><a href="header9.html">Header - Version 9</a></li>
                                <li><a href="header10.html">Header - Version 10</a></li>
                                <li><a href="header11.html">Header - Version 11</a></li>
                                <li><a href="header12.html">Header - Version 12</a></li>
                              </ul>
                            </div>
                            <div className="col-sm-3">
                              <a href="#" className="megamenu-title">Footers</a>
                              <ul>
                                <li><a href="header13.html">Header - Version 13</a></li>
                                <li><a href="header14.html">Header - Version 14</a></li>
                                <li><a href="footer.html">Footer - Version 1</a></li>
                                <li><a href="footer2.html">Footer - Version 2</a></li>
                                <li><a href="footer3.html">Footer - Version 3</a></li>
                                <li><a href="footer4.html">Footer - Version 4</a></li>
                                <li><a href="footer5.html">Footer - Version 5</a></li>
                                <li><a href="footer6.html">Footer - Version 6</a></li>
                                <li><a href="footer7.html">Footer - Version 7</a></li>
                                <li><a href="footer8.html">Footer - Version 8</a></li>
                                <li><a href="footer9.html">Footer - Version 9</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                         aria-expanded="false">Contact Us<span className="angle"></span></a>
                      <ul className="dropdown-menu pull-right" role="menu">
                        <li><a href="contact.html">Contact - Version 1</a></li>
                        <li><a href="contact2.html">Contact - Version 2</a></li>
                        <li><a href="contact3.html">Contact - Version 3</a></li>
                        <li><a href="contact4.html">Contact - Version 4</a></li>
                        <li><a href="contact5.html">Contact - Version 5</a></li>
                        <li><a href="contact6.html">Contact - Version 6</a></li>
                        <li><a href="contact7.html">Contact - Version 7</a></li>
                        <li><a href="contact8.html">Contact - Version 8</a></li>
                        <li><a href="contact9.html">Contact - Version 9</a></li>
                        <li><a href="contact10.html">Contact - Version 10</a></li>
                      </ul>
                    </li>
                    <li className="visible-lg"><a href="//wrapbootstrap.com/user/eony">Buy Now!</a></li>
                  </ul>

                  <button type="button"
                          className="navbar-btn btn-icon btn-circle navbar-right last  hidden-sm hidden-xs"
                          data-toggle="collapse" data-target="#header-search-form"><i className="fa fa-search"></i>
                  </button>

                  <div className="dropdown cart-dropdown navbar-right hidden-sm hidden-xs">
                    <button type="button" className="navbar-btn btn-icon btn-circle dropdown-toggle"
                            data-toggle="dropdown"><i className="fa fa-shopping-cart"></i></button>
                    <div className="dropdown-menu cart-dropdown-menu" role="menu">
                      <p className="cart-dropdown-desc"><i className="fa fa-cart-plus"></i>You have 2 product(s) in your
                        cart:</p>
                      <hr />
                      <div className="product clearfix">
                        <a href="#" className="remove-btn" title="Remove"><i className="fa fa-close"></i></a>

                        <div className="product-meta">
                          <h4 className="product-name"><a href="product.html">Seamsun 3d Smart Tv</a></h4>

                          <div className="product-quantity">x 2 piece(s)</div>
                          <div className="product-price-container">
                            <span className="product-price">$80.50</span>
                            <span className="product-old-price">$120.50</span>
                          </div>
                        </div>
                      </div>
                      <div className="product clearfix">
                        <a href="#" className="remove-btn" title="Remove"><i className="fa fa-close"></i></a>

                        <div className="product-meta">
                          <h4 className="product-name"><a href="product.html">Banana Smart Watch</a></h4>

                          <div className="product-quantity">x 1 piece(s)</div>
                          <div className="product-price-container">
                            <span className="product-price">$120.99</span>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="cart-action">
                        <div className="pull-left cart-action-total">
                          <span>Total:</span> $281.99
                        </div>
                        <div className="pull-right">
                          <a href="#" className="btn btn-custom ">Go to Cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
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
