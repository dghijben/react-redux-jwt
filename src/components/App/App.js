import React, { Component, PropTypes } from 'react';
import { PropTypes as historyPropTypes } from 'react-router';
import {connect} from 'react-redux';
import {isLoaded, getUser} from '../../redux/modules/auth/authActions';

@connect(state => ({authorization: state.authorization}))
class App extends Component {

  constructor(context, props) {
    super(context, props);
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
    return (
        this.props.children && React.cloneElement(this.props.children)
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  history: historyPropTypes.history,
};

export default App;
