import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import { Link } from 'react-router';

class MenuItem extends Component {

  constructor(context, props) {
    super(context, props);
    this.content = this.content.bind(this);
    this.children = this.children.bind(this);
    this.icon = this.icon.bind(this);
    this.openClose = this.openClose.bind(this);
    this.showChildren = this.showChildren.bind(this);
    this.state = { active: false };
  }

  content() {
    const {item} = this.props;
    if (_.has(item, 'to')) {
      return (<Link to={item.to} activeClassName="active" onClick={this.showChildren}>{this.icon()} {item.desc} {this.openClose()}</Link>);
    }
    return (<span>{this.icon()} {item.desc}</span>);
  }

  icon() {
    const {item} = this.props;
    if (_.has(item, 'icon')) {
      return (<i className={classNames('fa', 'fa-lg', 'fa-fw', item.icon)}></i>);
    }
  }

  showChildren() {
    if (this.state.active === false) {
      this.setState({active: true});
    } else {
      this.setState({active: false});
    }
  }

  openClose() {
    const {item} = this.props;
    if (_.has(item, 'children')) {
      if (this.state.active === true) {
        return (
          <b className="collapse-sign"><em className="fa fa-minus-square-o"></em></b>
        );
      }

      return (
        <b className="collapse-sign"><em className="fa fa-plus-square-o"></em></b>
      );
    }
  }

  children() {

    if (_.has(this.props.item, 'children') && this.state.active === true) {
      return _.map(_.get(this.props.item, 'children'), (item, key) => {
        return (<MenuItem key={key} item={item} />);
      });
    }
  }

  componentWillEnter(e) { console.log(e); }

  render() {
    const {item} = this.props;
    return (
      <li className={classNames({'active': this.context.location.pathname === item.to, 'open': this.state.active})}>
        {this.content()}
        <ReactCSSTransitionGroup component="ul" transitionName={{enter: 'animated', enterActive: 'slideInLeft', leave: 'animatedOut', leaveActive: 'slideOutLeft'}} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {this.children()}
        </ReactCSSTransitionGroup>
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
