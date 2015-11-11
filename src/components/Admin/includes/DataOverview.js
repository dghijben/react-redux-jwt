import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import DataTable from './DataTable';
import DynamicForm from 'redux-form-generator';
import { storeState } from '../../../redux/modules/reduxRouter/actions';
import {mapDispatchToProps, filterState, filterFields, stringifyState, createParamsForFetch} from 'utils/functions';

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
    'form': PropTypes.shape({
      'key': PropTypes.string.isRequired,
      'fields': PropTypes.array.isRequired
    }),
    'name': PropTypes.string.isRequired,
    'history': PropTypes.object,
    'dispatch': PropTypes.func,
    'pushState': PropTypes.func,
    'searchForm': PropTypes.object,
    'fetchData': PropTypes.func
  };

  constructor() {
    super();
    this.switchPage = this.switchPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.pushState = this.pushState.bind(this);
    this.loadState = this.loadState.bind(this);
    this.pushStateAttempt = this.pushStateAttempt.bind(this);
    this.form = this.form.bind(this);
    this.state = {fieldNames: []};
  }

  componentWillMount() {
    if (_.get(this.props, 'form', null)) {
      if (_.get(this.state, 'fieldNames').length === 0) {
        const fieldNames = filterFields(this.props.form.fields);
        this.setState({fieldNames: fieldNames}, this.loadState(fieldNames));
      } else {
        this.loadState(this.state.fieldNames);
      }
    } else {
      this.setState({fieldNames: ['page']}, this.loadState(['page']));
    }
  }

  loadState(fieldNames: Array) {
    const obj = Object.assign({}, this.state);
    obj[this.props.name] = createParamsForFetch(this.props, this.props.name, fieldNames);
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
    const obj = {};
    obj[this.props.name] = this.state[this.props.name];
    this.props.dispatch(storeState(this.props.router.location.pathname, obj));

    if (typeof this.props.fetchData === 'function') {
      this.props.fetchData(filterState(this.state, this.props.name, this.state.fieldNames));
    } else {
      const q = stringifyState(this.state, this.props.name, this.state.fieldNames);
      this.props.pushState(null, _.get(this.props.router, 'location.pathname') + '?' + q);
    }
  }

  switchPage(page: number) {
    const obj = Object.assign({}, this.state);
    obj[this.props.name].page = page;
    this.setState(obj, this.pushState);
  }

  handleSearch(data: Object) {
    const obj = {};
    obj[this.props.name] = {
      ...data,
    };

    this.setState(obj, this.pushState);
  }


  form() {
    if (_.get(this.props, 'form', null)) {
      return (
        <DynamicForm
          formName={this.props.name}
          formKey={this.props.form.key}
          checkKey={_.get(this.props, 'form.checkKey', this.props.name)}
          fieldsNeeded={this.props.form.fields}
          initialValues={this.state[this.props.name]}
          onSubmit={this.handleSearch}
          />
      );
    }
  }

  render() {
    const lastPage = _.get(this.props, 'data.list.last_page', 0);
    const currentPage = _.get(this.props, 'data.list.current_page', 0);
    const dataTable = (<DataTable
      cols={this.props.cols}
      state={{
        pending: _.get(this.props, 'data.pending'),
        failed: _.get(this.props, 'data.failed'),
        success: _.get(this.props, 'data.success')
      }}
      records={_.get(this.props, 'data.list.data', [])}
      paginator={{
        currPage: currentPage,
        lastPage: lastPage,
        onChange: this.switchPage
      }}
      />);

    return (
      <div>
        {this.form()}
        {dataTable}
      </div>
    );
  }
}

export default DataOverview;
