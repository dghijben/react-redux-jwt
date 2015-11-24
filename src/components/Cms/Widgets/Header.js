import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import Controls from './../Controls/Controls';
const headers = ['h1', 'h2', 'h3', 'h4', 'h5'];

export default class Header extends Component {

  static propTypes = {
    settings: PropTypes.object
  };

  render() {
    let header = 'h1';
    if (_.has(this.props, 'settings')) {
      const indexOf = _.indexOf(headers, _.get(this.props, 'settings.type'));
      if (indexOf > -1) {
        header = headers[indexOf];
      }
    }

    return (
      <Controls>
        {React.createElement(header, null, _.get(this.props, 'content'))}
      </Controls>
    );

  }
}
