import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from 'utils/functions';
import {clearList} from 'redux/modules/data/actions';
import {reducerKey} from './fields';


@connect(() => { return {}; }, mapDispatchToProps)
class Wrap extends Component {
  static propTypes = {
    'children': PropTypes.object,
    'dispatch': PropTypes.func
  };

  componentWillUnmount() {
    this.props.dispatch(clearList(reducerKey));
    // console.log('UNMOUNT');
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Wrap;
