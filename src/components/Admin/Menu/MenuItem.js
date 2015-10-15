import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import MenuWrap from './MenuWrap';

class MenuItem extends Component {

  constructor(context, props) {
    super(context, props);
    this.content = this.content.bind(this);
    this.children = this.children.bind(this);
    this.icon = this.icon.bind(this);
  }

  content() {
    const {item} = this.props;
    if (_.has(item, 'to')) {
      return (<Link to={item.to} activeClassName="active">{this.icon()} {item.desc}</Link>);
    }
    return (<span>{this.icon()} {item.desc}</span>);
  }

  icon() {
    const {item} = this.props;
    if (_.has(item, 'icon')) {
      return (<i className={classNames('fa', 'fa-lg', 'fa-fw', item.icon)}></i>);
    }
  }

  children() {
    const {item} = this.props;
    if (_.has(item, 'children')) {
      return (<MenuWrap menu={item.children}/>);
    }
  }

  render() {
    const {item} = this.props;
    return (
      <li className={classNames({'active': this.context.location.pathname === item.to})}>
        {this.content()}
        {this.children()}
      </li>
    );
  }
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
};

MenuItem.contextTypes = {
  history: React.PropTypes.object,
  location: React.PropTypes.object
};
export default MenuItem;
