import React, {Component, PropTypes} from 'react';

export default class Controls extends Component {
  static propTypes = {
    children: PropTypes.array
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
