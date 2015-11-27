import React, {Component, PropTypes} from 'react';

export default class Controls extends Component {
  static propTypes = {
    children: PropTypes.array
  };

  render() {
    return (
      <div style={{position: 'relative'}}>
        <div></div>
        {this.props.children}
      </div>
    );
  }
}
