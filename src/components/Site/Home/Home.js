import React from 'react';
import { FormattedNumber, FormattedMessage, FormattedDate } from 'react-intl';

export default class Home extends React.Component {
  render() {
    const now = Date.now();
    return (
      <div>
        <h1>Test dd</h1>

        <div>
          greeting => <FormattedMessage id="greeting" />
          <div>
            <a href="?locale=nl">Dutch</a><br />
            <a href="?locale=en">English</a><br />
          </div>
        </div>

        <div>
          #10000 => <FormattedNumber value={10000} />
        </div>


      </div>
    );
  }
}
