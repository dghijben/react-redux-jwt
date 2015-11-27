import React, {Component, PropTypes} from 'react';
import {dataMapper} from './../includes/functions';
import {Row} from 'react-bootstrap';

export default class CmsRow extends Component {
  static propTypes = {
    children: PropTypes.array,
    keyPath: PropTypes.array,
    updateJson: PropTypes.func.isRequired
  };

  render() {
    return (
      <Row style={{border: '1px solid black', margin: '2px'}}>
        {dataMapper(this.props)}
      </Row>
    );
  }
}
