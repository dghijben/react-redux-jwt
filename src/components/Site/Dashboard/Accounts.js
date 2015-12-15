// import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {createMarkup} from 'utils/functions';

class Accounts extends React.Component {

  static propTypes = {
    'account': PropTypes.object
  };

  render() {
    const {account} = this.props;
    return (
      <div className="callout callout-vertical">
        <h2 className="callout-title">{account.name}</h2>
        <p className="callout-desc" dangerouslySetInnerHTML={createMarkup(account.goal1)}></p>
        <div className="callout-action">
          <Link to="/dashboard/register" className="btn btn-custom no-radius min-width">Webshops aanmelden</Link>
          <Link to={`/dashboard/settings/${account.id}/affiliates`} className="btn btn-custom no-radius min-width">Affiliates</Link>
        </div>
      </div>
    );
  }
}

export default Accounts;
