import _ from 'lodash';
import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import PageHeader from '../Includes/PageHeader';
import {mapDispatchToProps, createMarkup} from 'utils/functions';
import { connect } from 'react-redux';
import connectData from 'helpers/connectData';
import connectToFilter from 'helpers/connectToFilter';
import fetchDataDeferred from './fetchDataDeferred';
import {Input} from 'react-bootstrap';
import ImageList from './ImageList';
import Pending from 'components/includes/Pending';
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
    // TODO Reset value on POP state
    console.log('Value' + this.props.inputOnStack('q'));
    return (
      <div className="panel panel-border-tb">
        <div className="panel-heading">
          <h4 className="pnael-title">Zoeken</h4>
        </div>
        <div className="panel-body">
          <Input type="text" placeholder="zoeken" onKeyUp={this.pushSearch} onKeyDown={this.clearTimer}
                 value={this.props.inputOnStack('q')}/>
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
          link={[
            {'rel': 'stylesheet', 'href': '/boss/css/jquery.selectbox.css', 'type': 'text/css', 'media': 'screen'}
          ]}
          script={[
            {'src': '/boss/js/jquery.selectbox.min.js'}
          ]}
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

          <div className="row pos-relative">
            <div className="col-md-9 col-md-push-3 ">
              <Pending state={_.get(this.props, ['affiliates', 'pending'])}>
                <ImageList
                  list={_.get(this.props, ['affiliates', 'list'])}
                  switchPage={this.props.switchPage}
                  profile={_.get(this.props, ['profile'])}
                />
              </Pending>
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
