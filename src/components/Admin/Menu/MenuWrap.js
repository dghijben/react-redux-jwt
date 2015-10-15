import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import MenuItem from './MenuItem';

export default class MenuWrap extends Component {
  static propTypes = {
    menu: PropTypes.array.isRequired
  };

  render() {
    const {menu} = this.props;
    return (
      <ul>
        {_.map(menu, (item, i)=> {
          return ( <MenuItem key={i} item={item} />
          );
        })}
      </ul>
    );
  }
}
