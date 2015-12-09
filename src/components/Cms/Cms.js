import _ from 'lodash';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { PropTypes as historyPropTypes } from 'react-router';
import {connect} from 'react-redux';
import {isLoaded, getUser} from '../../redux/modules/auth/authActions';
import json from './page.js';
import {dataMapper} from './includes/functions';
import {Grid} from 'react-bootstrap';
let counter = 0;

@connect(state => ({authorization: state.authorization}))
class App extends Component {
  constructor(context, props) {
    super(context, props);
    this.updateJson = this.updateJson.bind(this);
    this.addField = this.addField.bind(this);
    this.state = {json: {}, update: true};
  }

  componentWillMount() {
    this.setState({json: json});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.update === true ) {
      return true;
    }
    return false;
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

  updateJson(path, data) {
    this.setState({json: _.set(json, path, data), update: false});
  }

  addField(where) {
    const key = ['content', 0, 'section', 'children', 0];
    const index = _.last(key);
    const path = _.dropRight(key);
    const offset = where === 'after' ? 1 : 0;

    const children = _.get(json, path);
    children.splice(index + offset, 0, {
      'header': {
        'settings': {
          type: 'h3'
        },
        'content': 'Added header' + counter++
      }
    });

    this.setState({json: _.set(json, path, children), update: true});
  }

  render() {

    const before = () => { this.addField('before'); };
    const after = () => { this.addField('after'); };

    return (
      <div>
        <Helmet
          title="CMS"
          link={[
            {'rel': 'stylesheet', 'href': 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.css', 'type': 'text/css', 'media': 'screen'},
            {'rel': 'stylesheet', 'href': '/font-awesome-4.4.0/css/font-awesome.min.css', 'type': 'text/css', 'media': 'screen'}
          ]}
          script={[
            {src: '/plupload-2.1.8/js/plupload.full.min.js'},
            {src: '//tinymce.cachefly.net/4.2/tinymce.min.js'}
          ]}
          />
				<button onClick={before}>Veld toevoegen ervoor</button>
        <button onClick={after}>Veld toevoegen erna</button>
        <Grid>
          {dataMapper(this.state.json.content, ['content'], this.updateJson)}
        </Grid>

      </div>
    );
  }
}

App.propTypes = {
  history: historyPropTypes.history
};

export default App;
