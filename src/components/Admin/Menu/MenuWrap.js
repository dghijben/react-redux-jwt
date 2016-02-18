import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import MenuItem from './MenuItem';

export default class MenuWrap extends Component {
  static propTypes = {
    menu: PropTypes.array.isRequired,
    active: PropTypes.bool
  };

  static contextTypes = {
    history: PropTypes.object,
    location: PropTypes.object
  };

  render() {
    const {menu} = this.props;
    // const style = {display: this.props.active === true ? 'block' : 'none'};
    return (
      <ul>
        {_.map(menu, (item, i)=> {
          return ( <MenuItem key={i} item={item} history={this.context.history} location={this.context.location}/>
          );
        })}
      </ul>
    );
  }
}
