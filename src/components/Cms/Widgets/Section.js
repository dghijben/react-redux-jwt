import React, {Component, PropTypes} from 'react';
import {dataMapper} from './../includes/functions';

export default class Section extends Component {

  static propTypes = {
    children: PropTypes.array
  };

  render() {
    console.log('Section', this.props);
    return (
      <div style={{border: '1px solid black', margin: '2px'}}>
        {dataMapper(this.props)}
      </div>
    );
  }
}
