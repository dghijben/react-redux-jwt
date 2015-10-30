import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class Ribbon extends Component {
  static propTypes = {
    breadCrumbs: PropTypes.array
  };

  constructor(props, context) {
    super(props, context);
    this._renderBreadCrumbs = this._renderBreadCrumbs.bind(this);
    this._renderBreadCrumbItems = this._renderBreadCrumbItems.bind(this);
  }

  _renderBreadCrumbs() {
    if (!_.isEmpty(_.get(this.props, 'breadCrumbs', []))) {
      return (
        <ol className="breadcrumb">
          {this._renderBreadCrumbItems(_.get(this.props, 'breadCrumbs', []))}
        </ol>
      );
    }
  }

  _renderBreadCrumbItems(items) {
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
        {this._renderBreadCrumbs()}
      </div>
    );
  }
}
