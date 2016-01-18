import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {createMarkup} from 'utils/functions';
import Picture from '../Includes/Picture';

class Accounts extends React.Component {

  static propTypes = {
    'account': PropTypes.object
  };

  render() {
    const {account} = this.props;
    return (
      <div className="callout callout-vertical">
        <Picture responsive thumbnail pictures={_.get(account, ['picture'], [])} />
        <h2 className="callout-title"><Link to={`/p/${account.id}/${account.name}`}>{account.name}</Link></h2>
        <p className="callout-desc" dangerouslySetInnerHTML={createMarkup(account.description)}></p>
        <div className="callout-action">
          <Link to={`/dashboard/settings/${account.id}`} className="btn btn-custom no-radius min-width">Gegevens wijzigen</Link>
          <Link to={`/dashboard/settings/${account.id}/affiliates`} className="btn btn-custom no-radius min-width">Affiliates koppelen</Link>
        </div>
      </div>
    );
  }
}

export default Accounts;
