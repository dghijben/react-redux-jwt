import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { authActions } from '../../../redux/modules/auth';

class Logout extends Component {

  componentWillMount() {
    this.props.dispatch(authActions.logout());
  }

  render() {
    return (
      <div>
        <h1>Afmelden</h1>
      </div>
    );
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect()(Logout);
