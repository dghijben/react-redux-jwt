import _ from 'lodash';
import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import PageHeader from '../Includes/PageHeader';
import {mapDispatchToProps, createMarkup} from 'utils/functions';
import { connect } from 'react-redux';
import connectData from 'helpers/connectData';
import {fetchDataDeferred} from './fetchDataDeferred';
import {Nav, NavItem} from 'react-bootstrap';
import * as paramActions from 'redux/modules/params/actions';
import Charts from './Charts';
import Pending from 'components/includes/Pending';

@connectData(null, fetchDataDeferred)
@connect(state=> {
  const obj = {
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer,
    'profile': _.get(state, 'store.profile.item'),
    'loaded': _.get(state, 'store.profile.item.success', false)
  };
  return obj;
}, mapDispatchToProps)
class Profile extends React.Component {

  static propTypes = {
    'children': PropTypes.object.isRequired,
    'profile': PropTypes.object,
    'loaded': PropTypes.bool,
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
    'inputOnStack': PropTypes.func,
    'history': PropTypes.object
  };

  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedKey, href) {
    this.props.dispatch(paramActions.store('scroll', window.pageYOffset));
    this.props.history.pushState(null, href);
  }

  render() {
    const profile = _.get(this.props, ['profile', 'data'], {});
    const picture = () => {
      if (_.has(profile, 'picture.data[0].file_name')) {
        const img = _.get(profile, 'picture.data[0]');
        return <img src={'/image/large/' + img.file_name} alt={profile.name} className="img-responsive"/>;
      }
    };

    const eventKey = () => {
      const last = _.last(this.props.router.routes);
      if (last.path === 'kortingscodes') return 3;
      if (last.path === 'aanbiedingen') return 2;
      return 1;
    };

    const slugName = _.get(profile, 'slug', '');
    return (
      <div id="content" role="main" ref="main">
        <Helmet
          title={_.get(profile, 'name')}
        />
        <Pending state={_.get(this.props, ['profile', 'pending'], true)} failed={_.get(this.props, ['profile', 'failed'], false)}>
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
                  <Charts profile={profile} />
                </div>
              </div>
            </div>

            <Nav bsStyle="tabs" justified activeKey={eventKey()} onSelect={this.handleSelect}>
              <NavItem eventKey={1} href={`/p/${_.get(profile, 'id')}/${slugName}`}>Winkels</NavItem>
              <NavItem eventKey={2} href={`/p/${_.get(profile, 'id')}/${slugName}/aanbiedingen`}>Aanbiedingen</NavItem>
              <NavItem eventKey={3} href={`/p/${_.get(profile, 'id')}/${slugName}/kortingscodes`}>Kortingscodes</NavItem>
            </Nav>

            {this.props.children}
          </div>
        </Pending>
      </div>
    );
  }
}
export default Profile;
