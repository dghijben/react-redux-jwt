import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class Ribbon extends Component {
  static propTypes = {
    breadcrumps: PropTypes.array
  };

  constructor(props, context) {
    super(props, context);
    this._renderBreadCrumps = this._renderBreadCrumps.bind(this);
    this._renderBreadCrumpItems = this._renderBreadCrumpItems.bind(this);
  }

  _renderBreadCrumps() {
    if (!_.isEmpty(_.get(this.props, 'breadcrumps', []))) {
      return (
        <ol className="breadcrumb">
          {this._renderBreadCrumpItems(_.get(this.props, 'breadcrumps', []))}
        </ol>
      );
    }
  }

  _renderBreadCrumpItems(items) {
    return _.map(items, (item, key) => {
      const itemVisible = _.has(item, 'to') ? <Link to={item.to}>{item.name}</Link> : item.name;
      return (
        <li key={key}>{itemVisible}</li>
      );

    });
  }

  render() {
    return (
      <div id="ribbon">
        {this._renderBreadCrumps()}
      </div>
    );
  }
}
