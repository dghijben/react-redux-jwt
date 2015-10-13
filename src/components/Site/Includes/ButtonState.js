const _ = require('lodash');
import React, {Component, PropTypes} from 'react';
import { Button } from 'react-bootstrap';

export default class ButtonState extends Component {
  render() {
    if (_.get(this.props, 'pending') === true) {
      const props = _.omit(this.props, ['pending', 'children', 'onClick']);
      return (<Button {...props} disabled>Moment geduld</Button>);
    }

    const props = _.omit(this.props, ['pending', 'children']);
    return (<Button {...props}>{this.props.children}</Button>);
  }
}

ButtonState.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element
  ])
};
