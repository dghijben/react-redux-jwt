import _ from 'lodash';
import React, {Component} from 'react';
import {createMarkup} from './../includes/functions';

export default class Rte extends Component {

  render() {
    return (
      <div dangerouslySetInnerHTML={createMarkup(_.get(this.props, 'content'))} />
    );
  }
}
