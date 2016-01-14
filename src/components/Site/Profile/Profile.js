import _ from 'lodash';
import React, {PropTypes} from 'react';
import Paginator from 'react-laravel-paginator';
import Helmet from 'react-helmet';
import PageHeader from '../Includes/PageHeader';
import {mapDispatchToProps, createMarkup} from 'utils/functions';
import { connect } from 'react-redux';
import connectData from 'helpers/connectData';
import connectToFilter from 'helpers/connectToFilter';
import fetchDataDeferred from './fetchDataDeferred';
import {Input} from 'react-bootstrap';
let myTimeout = null;

@connectData(null, fetchDataDeferred)
@connectToFilter()
@connect(state=> {
  const obj = {
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer,
    'profile': state.store.profile.item.data,
    'affiliates': state.store.affiliates,
    'categories': state.store.categories
  };
  return obj;
}, mapDispatchToProps)
class Profile extends React.Component {

  static propTypes = {
    'profile': PropTypes.object,
    'affiliates': PropTypes.object,
    'router': PropTypes.object,
    'store': PropTypes.object,
    'dispatch': PropTypes.func,
    'switchPage': PropTypes.func,
    'getParams': PropTypes.func,
    'toggleOnStack': PropTypes.func,
    'onStack': PropTypes.func,
    'sortOnStack': PropTypes.func,
    'pushOnState': PropTypes.func,
    'inputOnStack': PropTypes.func
  };

  constructor() {
    super();
    this.sites = this.sites.bind(this);
    this.site = this.site.bind(this);
    this.searchBar = this.searchBar.bind(this);
    this.pushSearch = this.pushSearch.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.filter = this.filter.bind(this);
    this.categories = this.categories.bind(this);
    this.categoryList = this.categoryList.bind(this);
    this.state = {
      affiliateIds: []
    };
  }

  pushSearch(e) {
    const value = e.target.value;
    this.setState({
      q: value
    });

    myTimeout = setTimeout(() => {
      this.props.pushOnState('q', value);
    }, 150);
  }

  clearTimer() {
    if (myTimeout) {
      clearTimeout(myTimeout);
    }
  }

  searchBar() {
    return (
      <div className="panel panel-border-tb">
        <div className="panel-heading">
          <h4 className="pnael-title">Zoeken</h4>
        </div>
        <div className="panel-body">
          <Input type="text" placeholder="zoeken" onKeyUp={this.pushSearch} onKeyDown={this.clearTimer}
                 defaultValue={this.props.inputOnStack('q')}/>
        </div>
      </div>);
  }

  categoryList() {
    const list = _.get(this.props, ['categories', 'list'], []);
    if (list.length > 0) {
      return (
        <ul>
          {_.map(list, (category, key) => {
            return this.filter('c', key, category);
          })}
        </ul>
      );
    }
  }

  categories() {
    return (
      <div className="panel panel-border-tb">
        <div className="panel-heading">
          <h4 className="pnael-title">Categorieen</h4>
        </div>
        <div className="panel-body">
          <ul>
            {this.categoryList()}
          </ul>
        </div>
      </div>);
  }

  filter(name, key, item) {
    const checkBox = () => {
      if (this.props.onStack(name, item.id)) {
        return (<i className="fa fa-check-square-o pull-right"></i>);
      }
      return (<i className="fa fa-square-o pull-right"></i>);
    };

    return (
      <li key={key} onClick={() => { this.props.toggleOnStack(name, item.id); }}>
        {checkBox()}
        <i className="fa fa-angle-right"></i>
        {' '}
        {item.name}
      </li>
    );
  }

  sites() {

    const paged = () => {
      const list = _.get(this.props, ['affiliates', 'list', 'meta', 'pagination']);
      if (list) {
        const currentPage = list.current_page;
        const lastPage = list.total_pages;
        return <Paginator currPage={currentPage} lastPage={lastPage} onChange={this.props.switchPage}/>;
      }
    };

    const chunks = _.chunk(_.get(this.props, ['affiliates', 'list', 'data'], []), 4);
    return (
      <div>
        {paged()}
        {_.map(chunks, (chunk, key) => {
          return (
            <div className="row" key={key}>
              {_.map(chunk, (site, siteKey) => {
                return this.site(site, siteKey);
              })}
            </div>
          );
        })}

        {_.map(_.get(this.props, ['affiliates', 'list', 'data'], []), (item, key) => {
          const picture = () => {
            if (_.has(item, 'picture.data[0].file_name')) {
              const img = _.get(item, 'picture.data[0]');
              return <img src={'/image/small/' + img.file_name} alt={item.name} className="img-responsive"/>;
            }
          };

          const link = () => {
            if (_.get(item, 'url_affiliate') === '') {
              alert('Helaas kunt u tijdelijk niet bij deze site bestellen. ');
            } else {

              const affiliateUrl = _.get(item, 'url_affiliate');
              const res = affiliateUrl.replace('#ACCOUNT_ID#', _.get(this.props, ['profile', 'id']));
              window.open(res);
            }
          };

          return (
            <div className="row extLink" key={key} onClick={link}>
              <div className="col-md-3">{picture()}</div>
              <div className="col-md-7">{item.name}</div>
              <div className="col-md-2">
                <button className="btn btn-primary pull-right">kies winkel</button>
              </div>
            </div>
          );
        })}
        {paged()}
      </div>
    );
  }

  site(site, key) {
    const picture = () => {
      if (_.has(site, 'picture.data[0].file_name')) {
        const img = _.get(site, 'picture.data[0]');
        return <img src={'/image/268x332/' + img.file_name} alt={site.name} className="product-image"/>;
      }

      return <img src={'https://placehold.it/262x262&text=' + encodeURIComponent(site.name)} className="product-image" />;

    };

    const link = () => {
      if (_.get(site, 'url_affiliate') === '') {
        alert('Helaas kunt u tijdelijk niet bij deze site bestellen. ');
      } else {

        const affiliateUrl = _.get(site, 'url_affiliate');
        const res = affiliateUrl.replace('#ACCOUNT_ID#', _.get(this.props, ['profile', 'id']));
        window.open(res);
      }
    };

    return (
      <div className="col-sm-3">

        <div className="product text-center" key={key}>
          <div className="product-top">
            <figure>
              <a href="product.html" title={site.name}>
                {picture()}
              </a>
            </figure>
          </div>
          <h2 className="title mb30">{site.name}</h2>
          <a href="#" onClick={link} className="btn btn-custom add-to-cart">Winkelen</a>
        </div>
      </div>
    );
  }

  render() {
    const {profile} = this.props;
    const picture = () => {
      if (_.has(profile, 'picture.data[0].file_name')) {
        const img = _.get(profile, 'picture.data[0]');
        return <img src={'/image/large/' + img.file_name} alt={profile.name} className="img-responsive"/>;
      }
    };

    return (
      <div id="content" role="main">
        <Helmet
          title={_.get(profile, 'name')}
        />
        <PageHeader
          title={_.get(profile, 'name')}
          desc="Bedreigde dieren hebben baat bij de bescherming van hun leefgebied."
          links={[
            {to: '/', name: 'Home'},
            {to: '/dashboard', name: 'Dashboard'},
            {name: 'Account'}
          ]}
        />

        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="portfolio-media">
                {picture()}
              </div>
            </div>

            <div className="col-md-5">
              <div className="portfolio-details">
                <h2 className="title-underblock custom">Steun gratis {_.get(profile, 'name')}</h2>
                <div dangerouslySetInnerHTML={createMarkup(_.get(profile, 'description'))}></div>
                <ul className="portfolio-details-list">
                  <li><span>Adres:</span> {_.get(profile, 'address')}</li>
                  <li><span>Postcode:</span> {_.get(profile, 'postcode')}</li>
                  <li><span>Plaats:</span> {_.get(profile, 'city')}</li>
                  <li><span>Websites:</span> <a href={_.get(profile, 'website')}>{_.get(profile, 'website')}</a></li>
                  <li><span>Email: </span> <a href={_.get(profile, 'email')}>{_.get(profile, 'email')}</a></li>

                  <li className="share-li">
                    <span>Nu delen:</span>
                    <div className="social-icons">
                      <a href="#" className="social-icon icon-facebook add-tooltip" data-placement="top"
                         title="Facebook">
                        <i className="fa fa-facebook">{' '}</i>
                      </a>
                      <a href="#" className="social-icon icon-twitter add-tooltip" data-placement="top" title="Twitter">
                        <i className="fa fa-twitter">{' '}</i>
                      </a>
                      <a href="#" className="social-icon icon-dribbble add-tooltip" data-placement="top"
                         title="Dribbble">
                        <i className="fa fa-dribbble">{' '}</i>
                      </a>
                      <a href="#" className="social-icon icon-google-plus add-tooltip" data-placement="top"
                         title="Google Plus">
                        <i className="fa fa-google-plus">{' '}</i>
                      </a>
                      <a href="#" className="social-icon icon-linkedin add-tooltip" data-placement="top"
                         title="Linkedin">
                        <i className="fa fa-linkedin">{' '}</i>
                      </a>
                      <a href="#" className="social-icon icon-rss add-tooltip" data-placement="top" title="Rss Feed">
                        <i className="fa fa-rss">{' '}</i>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-9 col-md-push-3">
              {this.sites()}
            </div>
            <aside className="col-md-3 col-md-pull-9 sidebar">
              <div className="widget">
                <div className="filter-group-widget">
                  <div className="panel-group">
                    {this.searchBar()}
                    {this.categories()}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
