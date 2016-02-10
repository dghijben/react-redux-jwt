import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class PageHeader extends Component {

  static propTypes = {
    'title': PropTypes.string,
    'desc': PropTypes.string,
    'links': PropTypes.array
  };

  constructor() {
    super();
    this.links = this.links.bind(this);
  }

  links() {
    if (_.has(this.props, 'links')) {
      return (
        <ol className="breadcrumb">
          {_.map(this.props.links, this.item)}
        </ol>
      );
    }
  }

  item(item, key) {
    if (_.has(item, 'to')) {
      return (
        <li key={key}><Link to={item.to}>{item.name}</Link></li>
      );
    }

    return (
      <li key={key} className="active">{item.name}</li>
    );
  }

  render() {
    return (
      <div className="page-header dark larger larger-desc">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>{this.props.title}</h1>
              <p className="page-header-desc">{this.props.desc}</p>
            </div>
            <div className="col-md-6">
              {this.links()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
