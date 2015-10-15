import React, {Component} from 'react';
import {load, isLoaded } from '../../../redux/modules/admin/acl/aclActions';
export default class Acl extends Component {

  static fetchDataDeferred(getState, dispatch) {
    if (!isLoaded(getState())) {
      return dispatch(load());
    }
  }

  render() {
    return (
      <div id="content">
        <h2>Acl</h2>
      </div>
    );
  }
}
