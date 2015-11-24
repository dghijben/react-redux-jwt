import _ from 'lodash';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { PropTypes as historyPropTypes } from 'react-router';
import {connect} from 'react-redux';
import {isLoaded, getUser} from '../../redux/modules/auth/authActions';
import json from './page.js';
import {dataMapper} from './includes/functions';
import {Grid} from 'react-bootstrap';

@connect(state => ({authorization: state.authorization}))
class App extends Component {
  constructor(context, props) {
    super(context, props);
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    const state = getState();
    if (!isLoaded(getState())) {
      const token = _.get(state, 'authorization.token', null);
      if (token !== null) {
        promises.push(dispatch(getUser(token)));
      }
    }
    return Promise.all(promises);
  }

  render() {
    return (
      <div>
        <Helmet
          title="CMS"
          link={[
            {'rel': 'stylesheet', 'href': 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.css', 'type': 'text/css', 'media': 'screen'},
            {'rel': 'stylesheet', 'href': '/font-awesome-4.4.0/css/font-awesome.min.css', 'type': 'text/css', 'media': 'screen'}
          ]}
          />
        <Grid>
          {dataMapper(json.content)}
        </Grid>

      </div>
    );
  }
}

App.propTypes = {
  history: historyPropTypes.history
};

export default App;
