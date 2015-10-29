import React, {Component, PropTypes} from 'react';
import {Alert} from 'react-bootstrap';

export default class Pending extends Component {

  static propTypes = {
    state: PropTypes.bool.isRequired
  }

  render() {
    if (this.props.state === true) {
      return <Alert ><i className="fa fa-spinner fa-pulse"></i> Een moment geduld, de gegevens worden geladen</Alert>;
    }

    return <span />;
  }


}
