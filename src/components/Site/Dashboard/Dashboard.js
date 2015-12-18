import _ from 'lodash';
import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {mapDispatchToProps} from 'utils/functions';
import Accounts from './Accounts';

@connect(state=> {
  const obj = {
    'authorization': state.authorization
  };
  return obj;
}, mapDispatchToProps)
class Dashboard extends React.Component {

  static propTypes = {
    'authorization': PropTypes.object
  }

  constructor() {
    super();
    this.noAccounts = this.noAccounts.bind(this);
    this.dashboard = this.dashboard.bind(this);
  }

  noAccounts() {
    return (
      <div className="callout callout-vertical">
        <h2 className="callout-title">Welkom binnen uw dashboard! </h2>
        <p className="callout-desc">U moet uw aanmelding nog verder afronden. Wij hebben nog de gegevens van uw club nodig.</p>
        <div className="callout-action">
          <Link to="/dashboard/register" className="btn btn-custom no-radius min-width">Gegevens invoeren</Link>
        </div>
      </div>
    );
  }

  counters() {
    return (
      <div className="row">
        <div className="col-md-3 col-xs-6 count-container">
          <span className="count-icon-bg"><i className="icon-paper-plane"></i></span>
          <span className="count" data-from="0" data-to="724" data-speed="3000" data-refresh-interval="50">724</span>
          <h3 className="title-underblock dark">Complated <span className="first-color">Projects</span></h3>
        </div>

        <div className="col-md-3 col-xs-6 count-container">
          <span className="count-icon-bg"><i className="icon-users"></i></span>
          <span className="count" data-from="0" data-to="476" data-speed="3000" data-refresh-interval="50">476</span>
          <h3 className="title-underblock dark">Satisfied <span className="first-color">Customers</span></h3>
        </div>

        <div className="mb50 visible-sm visible-xs hidden-xss clearfix"></div>

        <div className="col-md-3 col-xs-6 count-container">
          <span className="count-icon-bg"><i className="icon-trophy"></i></span>
          <span className="count" data-from="0" data-to="89" data-speed="3000" data-refresh-interval="50">89</span>
          <h3 className="title-underblock dark">Winning <span className="first-color">Awards</span></h3>
        </div>

        <div className="col-md-3 col-xs-6 count-container">
          <span className="count-icon-bg"><i className="icon-magic-wand"></i></span>
          <span className="count" data-from="0" data-to="1174" data-speed="3000" data-refresh-interval="50">1174</span>
          <h3 className="title-underblock dark">Enjoyable <span className="first-color">Days</span></h3>
        </div>
      </div>
    );
  }

  dashboard() {
    if (!_.has(this.props, ['authorization', 'user', 'accounts', 0])) {
      return this.noAccounts();
    }

    const accounts = (_.map(_.get(this.props, ['authorization', 'user', 'accounts']), (account, key) => {
      return (<Accounts account={account} key={key}/>);
    }));

    return (
      <div className="container">
        {this.counters()}
        {accounts}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet
          title="Dashboard"
        />
        <div className="page-header dark larger larger-desc">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>Dashboard</h1>
                <p className="page-header-desc">Beheer uw gegevens</p>
              </div>
              <div className="col-md-6">
                <ol className="breadcrumb">
                  <li><Link to="/">Home</Link></li>
                  <li className="active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {this.dashboard()}
        </div>
      </div>

    );
  }
}

export default Dashboard;
