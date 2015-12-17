import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { storeState } from 'redux/modules/reduxRouter/actions';
import {stringifyFullState, createAllParamsForFetch} from 'utils/functions';

export default function connectToFilter() {
  return (WrappedComponent) => {
    @connect(state => ({
      'router': state.router,
      'reduxRouterReducer': state.reduxRouterReducer
    }))
    class StateConnection extends Component {

      static propTypes = {
        'name': PropTypes.string,
        'router': PropTypes.object,
        'reduxRouterReducer': PropTypes.object,
        'history': PropTypes.object,
        'dispatch': PropTypes.func,
        'pushState': PropTypes.func,
      }

      constructor() {
        super();
        this.switchPage = this.switchPage.bind(this);
        // this.handleSearch = this.handleSearch.bind(this);
        this.pushState = this.pushState.bind(this);
        // this.loadState = this.loadState.bind(this);
        this.pushStateAttempt = this.pushStateAttempt.bind(this);
        this.getParams = this.getParams.bind(this);
        this.toggleOnStack = this.toggleOnStack.bind(this);
        this.onStack = this.onStack.bind(this);
        // this.form = this.form.bind(this);
        this.state = {};
      }

/*
      loadState(fieldNames: Array) {
        const obj = Object.assign({}, this.state);
        obj[this.props.name] = createAllParamsForFetch(this.props, this.props.name, fieldNames);
        this.setState(obj);
      }
*/

      onStack(key: string, value) {
        return (!!this.state[key] && this.state[key].indexOf(value) > -1);
      }

      getParams() {
        return createAllParamsForFetch(this.props);
      }

      toggleOnStack(key: string, value) {
        const state = Object.assign({}, this.state);

        if (!state[key]) {
          state[key] = [value];
        } else {
          const index = state[key].indexOf(value);
          if (index < 0) {
            state[key].push(value);
          } else {
            delete state[key][index];
          }
        }

        console.log(state);

        this.setState(state, this.pushStateAttempt);
      }

      pushState(key: string, value) {
        const state = Object.assign({}, this.state);
        state[key] = value;
        this.setState(state, this.pushStateAttempt);
      }

      pushStateAttempt() {

        console.log(this.state);
        this.props.dispatch(storeState(this.props.router.location.pathname, this.state));

        const q = stringifyFullState(this.state);
        console.log('Q', q);
        this.props.history.pushState(null, _.get(this.props.router, 'location.pathname') + '?' + q);
      }

      switchPage(page: number) {
        this.setState({page: page}, this.pushStateAttempt);
      }

      render() {
        return (<WrappedComponent
          {...this.props}
          switchPage={this.switchPage}
          pushState={this.pushState}
          getParams={this.getParams}
          toggleOnStack={this.toggleOnStack}
          onStack={this.onStack}
          />);
      }
    }

    return StateConnection;
  };
}
