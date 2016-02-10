import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => ({authorization: state.authorization}))
class RequireLogin extends Component {
  static propTypes = {
    authorization: PropTypes.object,
    history: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
  };

  componentWillMount() {
    const {history, authorization} = this.props;
    if (_.get(authorization, 'loggedIn', false) !== true) {
      setTimeout(() => {
        history.replaceState(null, '/');
      });
    }
  }

  render() {
    if (_.get( this.props.authorization, 'loggedIn', false) === true) {
      return this.props.children;
    }

    return (<div>Access denied</div>);
  }
}
export default RequireLogin;
