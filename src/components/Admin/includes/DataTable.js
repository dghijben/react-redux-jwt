import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import {Alert, DropdownButton, MenuItem} from 'react-bootstrap';
import Failed from 'components/includes/Failed';
import Pending from 'components/includes/Pending';
const Paginator = require('react-laravel-paginator');

export default class DataTable extends Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    cols: PropTypes.array.isRequired,
    paginator: PropTypes.object,
    onChange: PropTypes.func
  }

  constructor() {
    super();
    this._renderCols = this._renderCols.bind(this);
    this._renderRecords = this._renderRecords.bind(this);
    this._renderRecordCols = this._renderRecordCols.bind(this);
    this._renderDropDownItems = this._renderDropDownItems.bind(this);
    this._renderPaginator = this._renderPaginator.bind(this);
    this._getValue = this._getValue.bind(this);
  }

  _renderCols() {
    return _.map(this.props.cols, (col, key) => {
      return (
        <th key={key}>
          {_.get(col, 'name', '')}
        </th>
      );
    });
  }

  _renderRecords() {
    return _.map(this.props.records, (record, key) => {
      return (
        <tr key={key}>
          {this._renderRecordCols(record)}
        </tr>
      );
    });
  }

  _renderRecordCols(record) {
    return _.map(this.props.cols, (col, key) => {
      const value = this._getValue(record, col, key);
      return (<td key={key}>{value}</td>);
    });
  }

  _getValue(record, col, key) {
    if (_.has(col, 'show')) {
      if (_.isString(col.show)) {
        return _.get(record, col.show, 'kip');
      }
      if (_.isArray(col.show)) {
        const value = [];
        _.map(col.show, (field)=> {
          value.push(_.get(record, field, ''));
        });
        return _.compact(value).join(' ');
      }
    }

    if (_.has(col, 'dropdownButton')) {
      const dropDownItems = this._renderDropDownItems(_.get(col, 'dropdownButton'), record);
      return (
        <DropdownButton bsStyle="default" title={col.name} id={'dropDown' + key}>
          {dropDownItems}
        </DropdownButton>
      );
    }
  }

  _renderDropDownItems(buttons, record) {
    return _.map(buttons, (button, key) => {

      const click = () => {
        if (_.has(button, 'onClick')) {
          button.onClick(record);
        }
      };

      if (_.has(button, 'divider')) {
        return <MenuItem key={key} divider />;
      }

      return <MenuItem key={key} eventKey={key} onSelect={click}>{button.name}</MenuItem>;
    });
  }

  _renderPaginator() {
    const {paginator: {currPage, lastPage, onChange}} = this.props;
    return <Paginator currPage={currPage} lastPage={lastPage} onChange={onChange}/>;
  }

  render() {

    if (this.props.records.length === 0) {
      return (<Alert bsStyle="warning">No records found.</Alert>);
    }

    const paged = (!_.isEmpty(this.props.paginator) ? this._renderPaginator() : '');
    const cols = this._renderCols();
    const records = this._renderRecords();
    return (
      <div>
        <Pending state={_.get(this.props, 'state.pending', false)}>
          <Failed state={_.get(this.props, 'state.failed', false)}/>
          {paged}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  {cols}
                </tr>
              </thead>
              <tbody>
                {records}
              </tbody>
            </table>
          </div>
          {paged}
        </Pending>
      </div>
    );
  }
}
