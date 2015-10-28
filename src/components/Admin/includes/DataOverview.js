import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import DataTable from './DataTable';
import DynamicForm from './DynamicForm';
import { storeState } from '../../../redux/modules/reduxRouter/actions';
import deepEqual from 'deep-equal';
import {mapDispatchToProps, stringifyState, filterFields, createParamsForFetch} from 'utils/functions';

@connect(state=>({
  'router': state.router,
  'reduxRouterReducer': state.reduxRouterReducer
}), mapDispatchToProps)
class DataOverview extends Component {
  static propTypes = {
    data: PropTypes.object,
    cols: PropTypes.array.isRequired,
    'router': PropTypes.object,
    'reduxRouterReducer': PropTypes.object,
    'form': PropTypes.object,
    'history': PropTypes.object,
    'dispatch': PropTypes.func,
    'pushState': PropTypes.func,
    'searchForm': PropTypes.object
  };

  constructor() {
    super();
    this.switchPage = this.switchPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.pushState = this.pushState.bind(this);
    this.loadState = this.loadState.bind(this);
    this.pushStateAttempt = this.pushStateAttempt.bind(this);
    this.state = {fieldNames: []};
  }

  componentWillMount() {
    if (_.get(this.state, 'fieldNames').length === 0) {
      const fieldNames = filterFields(this.props.form.fields);
      this.setState({fieldNames: fieldNames}, this.loadState(fieldNames));
    } else {
      this.loadState(this.state.fieldNames);
    }
  }

  shouldComponentUpdate(nextProps) {
    // Important when using dynamic redux forms
    if (deepEqual(nextProps.data, this.props.data) === true ) {
      return false;
    }
    return true;
  }

  loadState(fieldNames) {
    const obj = Object.assign({}, this.state);
    obj[this.props.form.name] = createParamsForFetch(this.props, this.props.form.name, fieldNames);
    this.setState(obj);
  }

  pushState() {
    if (_.get(this.state, 'fieldNames', null) === null) {
      this.setState({fieldNames: filterFields(this.props.form.fields)}, this.pushStateAttempt());
    } else {
      this.pushStateAttempt();
    }
  }

  pushStateAttempt() {
    const fieldNames = filterFields(this.props.form.fields);
    const q = stringifyState(this.state, this.props.form.name, fieldNames);
    this.props.dispatch(storeState(this.props.router.location.pathname, this.state));
    this.props.pushState(null, _.get(this.props.router, 'location.pathname') + '?' + q);
  }

  switchPage(page) {
    this.setState({page: page}, this.pushState);
  }

  handleSearch(data) {
    const obj = {};
    obj[this.props.form.name] = {
      ...data,
    };

    this.setState(obj, this.pushState);
  }

  render() {
    const lastPage = _.get(this.props, 'data.list.last_page', 0);
    const currentPage = _.get(this.props, 'data.list.current_page', 0);
    const dataTable = (<DataTable
      cols={this.props.cols}
      records={_.get(this.props, 'data.list.data', [])}
      paginator={{
        currPage: currentPage,
        lastPage: lastPage,
        onChange: this.switchPage
      }}
      />);

    return (
      <div>
        <DynamicForm
          formName={this.props.form.name}
          formKey={this.props.form.key}
          fieldsNeeded={this.props.form.fields}
          initialValues={this.state[this.props.form.name]}
          onSubmit={this.handleSearch}
          />
        {dataTable}
      </div>
    );
  }
}

export default DataOverview;
