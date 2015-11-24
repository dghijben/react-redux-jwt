import React, {Component} from 'react';
import {dataMapper} from './../includes/functions';
import {Row} from 'react-bootstrap';

export default class CmsRow extends Component {
  render() {
    return (
      <Row style={{border: '1px solid black', margin: '2px'}}>
        {dataMapper(this.props)}
      </Row>
    );
  }
}
