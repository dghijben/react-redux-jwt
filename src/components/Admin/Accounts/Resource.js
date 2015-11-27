import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {load} from 'redux/modules/data/actions';
import {mapDispatchToProps, filterFields, createParamsForFetch} from 'utils/functions';
import DataOverview from 'components/Admin/includes/DataOverview';
import {searchFields, reducerIndex, reducerItem} from './fields';
const fieldNames = filterFields(searchFields);
const reducerKey = 'users';
@connect(state=> {
  const obj = {
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps) class Resource extends Component {

  static propTypes = {
    show: PropTypes.bool,
    close: PropTypes.func,
    callBack: PropTypes.func,
    values: PropTypes.array,
    list: PropTypes.array,
    'dispatch': PropTypes.func
  }

  constructor() {
    super();
    this.fetchDataCallBack = this.fetchDataCallBack.bind(this);
    this.body = this.body.bind(this);
    this.footer = this.footer.bind(this);
    this.state = {
      values: [],
      list: []
    };
  }

  componentWillMount() {
    this.setState({
      values: this.props.values,
      list: this.props.list || []
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.show, nextProps.show)) {
      this.setState({
        values: nextProps.values,
        list: nextProps.list || []
      });
    }

    if (!_.has(nextProps, [reducerIndex, reducerKey, 'list']) && _.get(nextProps, [reducerIndex, reducerKey, 'pending'], false) === false) {
      this.props.dispatch(load(reducerKey, createParamsForFetch(nextProps, reducerIndex, fieldNames)));
    }

    if (_.get(this.props, [reducerIndex, reducerKey, reducerItem, 'deleted'], false) === false && _.get(nextProps, [reducerIndex, reducerKey, reducerItem, 'deleted'], false) === true) {
      this.setState({status: {success: true}});
      this.props.dispatch(load(reducerKey, createParamsForFetch(this.props, reducerIndex, fieldNames)));
    }

    if (_.get(this.props, [reducerIndex, reducerKey, reducerItem, 'failed'], false) === false && _.get(nextProps, [reducerIndex, reducerKey, reducerItem, 'failed'], false) === true) {
      this.setState({status: {failed: true}});
    }
  }

  onChange(e, item) {
    const values = this.state.values;
    const list = this.state.list;
    const index = _.findIndex(list, {value: item.id});
    item.value = item.id;
    item.desc = item.firstname + ' ' + item.middlename + ' ' + item.lastname;
    if (e.target.checked === true) {
      if (index === -1) {
        list.push(item);
      }
      values.push(item.id);
    } else {
      if (index > -1) {
        list.splice(index, 1);
      }
      values.splice(_.indexOf(values, item.id), 1);
    }
    this.setState({
      values: _.uniq(values),
      list: list
    });
  }

  fetchDataCallBack(state) {
    this.props.dispatch(load(reducerKey, state));
  }

  body() {
    return (
      <Modal.Body>
        <div>
          <DataOverview
            name={reducerIndex}
            fetchData={this.fetchDataCallBack}
            data={_.get(this.props, [reducerIndex, reducerKey])}
            form={{
              key: 'form',
              checkKey: reducerIndex + 'form',
              fields: searchFields
            }}
            cols={[
              {name: '', checkbox: (e, record) => { this.onChange(e, record); }},
              {name: 'Avatar', image: ['picture', 0, 'file_name'], width: '80px'},
              {name: 'Naam', show: ['firstname', 'middlename', 'lastname']},
            ]}
            checked={this.state.values}
          />
        </div>
      </Modal.Body>
    );

  }

  footer() {
    const callBack = () => {
      this.props.callBack(this.state.values, this.state.list);
    };

    return (
      <Modal.Footer>
        <Button onClick={this.props.close}>close</Button>
        <Button onClick={callBack} bsStyle="primary">choose</Button>
      </Modal.Footer>
    );
  }

  render() {

    return (
      <Modal show={this.props.show} onHide={this.props.close} bsSize="large">
        <Modal.Header>
          <Modal.Title>Data resource</Modal.Title>
        </Modal.Header>

        {this.body()}
        {this.footer()}
      </Modal>
    );
  }
}

export default Resource;
