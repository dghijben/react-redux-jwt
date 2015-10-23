import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from 'utils/mapDispatchToProps';
import DataTable from './DataTable';
import { storeState } from 'redux/modules/reduxRouter/actions';
import SearchForm from './SearchForm';
const queryString = require('query-string');

@connect(state=>({
  'router': state.router,
  'reduxRouterReducer': state.reduxRouterReducer
}), mapDispatchToProps)
class DataOverview extends Component {
  static propTypes = {
    data: PropTypes.object,
    cols: PropTypes.array,
    'router': PropTypes.object,
    'reduxRouterReducer': PropTypes.object,
    'fields': PropTypes.object,
    'history': PropTypes.object,
    'pushState': PropTypes.func,
    'dispatch': PropTypes.func,
    'searchForm': PropTypes.object
  };

  constructor() {
    super();
    this.switchPage = this.switchPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      page: 1
    };
  }

  pushState() {
    const q = queryString.stringify({
      page: this.state.page,
      search: _.get(this.state, 'searchForm.search'),
      searchField: _.get(this.state, 'searchForm.searchField')
    });
    this.props.dispatch(storeState(this.props.router.location.pathname, this.state));
    this.props.pushState(null, _.get(this.props.router, 'location.pathname') + '?' + q);
  }

  switchPage(page) {
    this.setState({page: page}, this.pushState);
  }

  handleSearch(data) {
    this.setState({searchForm: {...data}, page: 1}, this.pushState);
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
        <SearchForm
          placeHolder="...zoeken"
          dropDownTitle="alles"
          dropDown={_.get(this.props, 'searchForm.dropDownFields', {})}
          onSubmit={this.handleSearch}
          initialValues={_.get(this.props, 'searchForm.state', {})}
          />
        {dataTable}
      </div>
    );
  }
}

export default DataOverview;
