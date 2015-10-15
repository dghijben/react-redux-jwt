import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {load, isLoaded } from '../../../redux/modules/admin/acl/aclActions';
import {connect} from 'react-redux';

@connect(state=>({
  'acl': state.acl
}))
class Acl extends Component {
  static propTypes = {
    'acl': PropTypes.object
  };

  constructor(context, props) {
    super(context, props);
    this.routes = this.routes.bind(this);
  }

  static fetchDataDeferred(getState, dispatch) {
    if (!isLoaded(getState())) {
      return dispatch(load());
    }
  }

  routes() {
    if (_.get(this.props, 'acl.success', false) === true) {
      return _.map(_.get(this.props, 'acl.data.acl_routes', []), (item, key) => {
        return (
          <tr key={key}>
            <td>{item.route}</td>
            <td>{item.created_at}</td>
            <td></td>
            <td></td>
          </tr>
        );
      });
    }
  }


  render() {
    return (
      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">
              <i className="fa fa-table fa-fw "></i>
              Table
							<span>&gt;
                Normal Tables
							</span>
            </h1>
          </div>
        </div>
        <h2>Admin / Acl Routes</h2>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
            <tr>
              <th>Column name</th>
              <th>Column name</th>
              <th>Column name</th>
              <th>Column name</th>
            </tr>
            </thead>
            <tbody>
            {this.routes()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Acl;
