import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {logout} from '../../../redux/modules/auth/authActions';

@connect(state => ({authorization: state.authorization}))
class RequireAdminLogin extends Component {
  static propTypes = {
    authorization: PropTypes.object,
    history: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static contextTypes = {
    children: React.PropTypes.func
  };

  constructor(context, props) {
    super(context, props);
    this.isAdmin = this.isAdmin.bind(this);
  }

  componentWillMount() {
    const {history} = this.props;
    if (!this.isAdmin()) {
      this.props.dispatch(logout());
      history.pushState(null, '/');
    }
  }

  isAdmin() {
    if (_.get( this.props, 'authorization.loggedIn', false) === true) {
      if (_.get( this.props, 'authorization.user.success', false) === true) {
        if (_.get( this.props, 'authorization.user.admin', false) === '1') {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    if (this.isAdmin() === true) {
      return (
        <div>
          <Helmet
            title="Admin"
            titleTemplate="MySite.com - %s"
            link={[
              {'rel': 'stylesheet', 'href': '/admin/css/bootstrap.min.css', 'type': 'text/css', 'media': 'screen'},
              {'rel': 'stylesheet', 'href': '/admin/css/font-awesome.min.css', 'type': 'text/css', 'media': 'screen'},
              {'rel': 'stylesheet', 'href': '/admin/css/smartadmin-production.min.css', 'type': 'text/css', 'media': 'screen'},
              {'rel': 'stylesheet', 'href': '/admin/css/smartadmin-production-plugins.min.css', 'type': 'text/css', 'media': 'screen'},
              {'rel': 'stylesheet', 'href': '/admin/css/smartadmin-skins.min.css', 'type': 'text/css', 'media': 'screen'},
              {'rel': 'stylesheet', 'href': '/admin/user.css', 'type': 'text/css', 'media': 'screen'},
              {'rel': 'stylesheet', 'href': 'http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700', 'type': 'text/css', 'media': 'screen'}
            ]}
            script={[
              {src: '/plupload-2.1.8/js/plupload.full.min.js'}
            ]}
            />
          {this.props.children}
        </div>
      );
    }

    return (
      <div>
        <Helmet
          title="Denied"
          titleTemplate="Access - %s"
          />
        Access denied
      </div>);
  }
}
export default RequireAdminLogin;
