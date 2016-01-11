import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { storeState } from 'redux/modules/reduxRouter/actions';
import {stringifyFullState, createAllParamsForFetch} from 'utils/functions';
let scrollTop = null;

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
        this.pushOnState = this.pushOnState.bind(this);
        this.pushStateAttempt = this.pushStateAttempt.bind(this);
        this.getParams = this.getParams.bind(this);
        this.toggleOnStack = this.toggleOnStack.bind(this);
        this.inputOnStack = this.inputOnStack.bind(this);
        this.onStack = this.onStack.bind(this);
        this.sortOnStack = this.sortOnStack.bind(this);
        this.state = {
        };
      }

      componentWillMount() {
        this.setState(createAllParamsForFetch(this.props));
      }

      componentWillUpdate() {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop || scrollTop;
      }

      componentDidUpdate() {
        window.scroll(0, scrollTop);
      }

      onStack(key: string, value) {
        return (!!this.state[key] && this.state[key].indexOf(String(value)) > -1);
      }

      getParams() {
        return createAllParamsForFetch(this.props);
      }

      inputOnStack(key: string) {
        return (!!this.state[key] ? this.state[key] : null );
      }

      sortOnStack(field) {
        const state = Object.assign({}, this.state);

        if (_.has(state, 'sort')) {
          if (_.get(state, 'sort.field') === field && _.get(state, 'sort.order') === 'asc') {
            state.sort = {
              'field': field,
              'order': 'desc'
            };
          } else {
            state.sort = {
              'field': field,
              'order': 'asc'
            };
          }
        } else {
          state.sort = {
            'field': field,
            'order': 'asc'
          };
        }
        this.setState(state, this.pushStateAttempt);
      }

      toggleOnStack(key: string, value) {
        const state = Object.assign({}, this.state);

        if (!state[key]) {
          state[key] = [value];
        } else {
          const index = state[key].indexOf(String(value));
          if (index < 0) {
            state[key].push(value);
          } else {
            delete state[key][index];
          }
        }
        if (!!state.page) {
          state.page = null;
        }
        this.setState(state, this.pushStateAttempt);
      }

      pushOnState(key: string, value) {
        const state = Object.assign({}, this.state);
        state[key] = value;
        if (!!state.page) {
          state.page = null;
        }
        this.setState(state, this.pushStateAttempt);
      }

      pushStateAttempt() {
        this.props.dispatch(storeState(this.props.router.location.pathname, this.state));
        const q = stringifyFullState(this.state);
        this.props.history.pushState(null, _.get(this.props.router, 'location.pathname') + '?' + q);
      }

      switchPage(page: number) {
        this.setState({page: page}, this.pushStateAttempt);
      }

      render() {
        return (<WrappedComponent
          {...this.props}
          switchPage={this.switchPage}
          pushOnState={this.pushOnState}
          getParams={this.getParams}
          toggleOnStack={this.toggleOnStack}
          inputOnStack={this.inputOnStack}
          onStack={this.onStack}
          sortOnStack={this.sortOnStack}
          />);
      }
    }

    return StateConnection;
  };
}
