import React, {Component, PropTypes} from 'react';
import {dataMapper} from './../includes/functions';

export default class Section extends Component {

  static propTypes = {
    children: PropTypes.array,
    keyPath: PropTypes.array,
    updateJson: PropTypes.func.isRequired
  };

  render() {
    return (
      <div style={{border: '1px solid black', margin: '2px'}}>
        {dataMapper(this.props, this.props.keyPath, this.props.updateJson)}
      </div>
    );
  }
}
