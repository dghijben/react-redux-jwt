import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {dataMapper} from './../includes/functions';
import {Col} from 'react-bootstrap';

export default class CmsCol extends Component {
  static propTypes = {
    children: PropTypes.array,
    settings: PropTypes.object
  };

  render() {
    console.log('PROPS', this.props);
    const {settings} = this.props;

    return (
      <Col md={_.get(settings, 'md', 12)} style={{border: '1px solid black', margin: '2px'}}>
        {dataMapper(this.props)}
      </Col>
    );
  }
}
