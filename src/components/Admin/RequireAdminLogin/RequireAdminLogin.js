import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {isLoaded, getUser} from '../../../redux/modules/auth/authActions';

@connect(state => ({authorization: state.authorization}))
class RequireAdminLogin extends Component {
  static propTypes = {
    authorization: PropTypes.object,
    history: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    children: React.PropTypes.func
  };

  constructor(context, props) {
    super(context, props);
  }

  componentWillMount() {
    const {history, authorization} = this.props;
    if (_.get(authorization, 'loggedIn', false) !== true) {
      history.pushState(null, '/');
    }
  }

  static fetchData(getState, dispatch) {
    const promises = [];

    if (!isLoaded(getState())) {
      const token = getState().authorization.token;
      promises.push(dispatch(getUser(token)));
    }
    return Promise.all(promises);
  }

  render() {
    // console.log('Waar', this.props);

    if (_.get(this.props.authorization, 'loggedIn', false) === true) {
      return (
        <div>
          <Helmet
            title="Admin"
            titleTemplate="MySite.com - %s"
            link={[
              {'rel': 'stylesheet', 'href': '/css/admin/font-awesome.min.css', 'type': 'text/css', 'media': 'screen'},
              {'rel': 'stylesheet', 'href': '/css/admin/smartadmin-production.min.css', 'type': 'text/css', 'media': 'screen'},
              {'rel': 'stylesheet', 'href': '/css/admin/smartadmin-skins.min.css', 'type': 'text/css', 'media': 'screen'}
            ]}
            />

          {this.props.children && React.cloneElement(this.props.children)}
        </div>
      );
    }

    return (<div>
      <Helmet
        title="Admin"
        titleTemplate="MySite.com - %s"
        link={[
          {'rel': 'stylesheet', 'href': '/css/admin/font-awesome.min.css', 'type': 'text/css', 'media': 'screen'},
          {'rel': 'stylesheet', 'href': '/css/admin/smartadmin-production.min.css', 'type': 'text/css', 'media': 'screen'},
          {'rel': 'stylesheet', 'href': '/css/admin/smartadmin-skins.min.css', 'type': 'text/css', 'media': 'screen'}
        ]}
        />
      Access denied</div>);
  }
}
export default RequireAdminLogin;
