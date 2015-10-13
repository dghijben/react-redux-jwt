import React, { Component, PropTypes } from 'react';
import { PropTypes as historyPropTypes } from 'react-router';

class App extends Component {

  constructor(context, props) {
    super(context, props);
  }

  render() {
    return (
      <div>


          {this.props.children && React.cloneElement(this.props.children)}

      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  history: historyPropTypes.history,
};

export default App;
