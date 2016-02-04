import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from 'utils/functions';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import validator, {validateBank, validateExtra} from './validate';
import DynamicForm from 'redux-form-generator';
import {fields1, fieldsBank, fieldsExtra, reducerIndex, reducerKey, reducerKeyCats, reducerItem, initialValues} from './fields';
import connectData from 'helpers/connectData';
import connectToStore from 'helpers/connectToStore';
import * as actions from 'redux/modules/store/actions';
import fetchDataDeferred from './fetchDataDeferred';
import PageHeader from 'components/Site/Includes/PageHeader';
import {getUser} from 'redux/modules/auth/authActions';
import {getValues} from 'redux-form';
import Pending from 'components/includes/Pending';

@connectData(null, fetchDataDeferred)
@connectToStore(reducerIndex, reducerKey, reducerItem)
@connect(state=> {
  const obj = {
    'token': state.authorization.token,
    'router': state.router,
    'form': state.form,
    'categories': _.get(state.store, reducerKeyCats, {}),
    'getValues': _.merge(
      getValues(_.get(state.form, [reducerKey, 'tab1'])),
      getValues(_.get(state.form, [reducerKey, 'tab2'])),
      getValues(_.get(state.form, [reducerKey, 'tab3']))
    )
  };
  obj[reducerKey] = state.store[reducerKey];
  return obj;
}, mapDispatchToProps)
class Settings extends Component {

  static propTypes = {
    'handleSubmit': PropTypes.func,
    'getActionState': PropTypes.func,
    'clearActionState': PropTypes.func,
    'dispatch': PropTypes.func,
    'dashboardAccount': PropTypes.object,
    'router': PropTypes.object,
    'form': PropTypes.object,
    'getValues': PropTypes.object,
    'token': PropTypes.string
  }

  constructor() {
    super();
    this.handleSubmitTab1 = this.handleSubmitTab1.bind(this);
    this.handleSubmitTab2 = this.handleSubmitTab2.bind(this);
    this.handleSubmitTab3 = this.handleSubmitTab3.bind(this);
    this.setActiveKey = this.setActiveKey.bind(this);
    this.form = this.form.bind(this);
    this.success = this.success.bind(this);

    this.state = {
      disabled: {
        tab1: false,
        tab2: false,
        tab3: false
      },
      activeKey: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.getActionState().pending === true &&
      _.get(nextProps, [reducerKey, reducerItem, 'actionStatus', 'success'], false) === true) {
      this.props.dispatch(getUser(this.props.token));
    }
  }

  componentWillUnmount() {
    this.props.clearActionState(reducerKey);
  }

  setActiveKey(key) {
    this.setState({activeKey: key});
  }

  handleSubmitTab1() {
    const state = Object.assign(
      {},
      this.state,
      {
        disabled: Object.assign(
          {},
          this.state.disabled,
          {
            tab2: false
          }),
        activeKey: 2
      }
    );
    this.setState(state);
  }

  handleSubmitTab2() {
    // Unlock tab 3
    const state = Object.assign(
      {},
      this.state,
      {
        disabled: Object.assign(
          {},
          this.state.disabled,
          {
            tab3: false
          }),
        activeKey: 3
      }
    );
    this.setState(state);
  }

  handleSubmitTab3(valuesTab, dispatch) {
    const values = _.omit(this.props.getValues, _.isNull);
    return new Promise((resolve, reject) => {
      dispatch(actions.update(reducerKey, '/dashboard/accounts', this.props.router.params.id, values))
        .then((ret)=> {
          if (ret.hasOwnProperty('error')) {
            reject(ret.error);
          } else {
            resolve();
          }
        });
    });
  }

  success() {
    return (
      <div className="alert alert-md alert-success">De gegevens zijn opgeslagen.</div>
    );
  }

  form() {
    if (this.props.getActionState().success === true) {
      return this.success();
    }
    const checkKey = () => {
      return _.get(this.props, [reducerKey, reducerItem, 'id'], null) + _.get(this.props, 'categories.allStatus.success', null);
    };
    const item = _.get(this.props, [reducerKey, reducerItem], {});

    return (
      <Tabs bsStyle="pills" activeKey={this.state.activeKey} onSelect={this.setActiveKey}>

        <Tab eventKey={1} title="1. CLUB GEGEVENS" disabled={this.state.disabled.tab2}>
          <DynamicForm
            checkKey={reducerKey + checkKey() + 'tab1'}
            formName={reducerKey}
            formKey="tab1"
            fieldsNeeded={fields1(this.props.router.params.id, this.props.token, _.get(this.props, 'categories.all', []))}
            initialValues={initialValues(item)}
            validate={validator}
            onSubmit={this.handleSubmitTab1}
            getActionState={this.props.getActionState}
            clearActionState={this.props.clearActionState}
          />
        </Tab>
        <Tab eventKey={2} title="2. BANK GEGEVENS" disabled={this.state.disabled.tab3}>
          <DynamicForm
            checkKey={reducerKey + checkKey() + 'tab2'}
            formName={reducerKey}
            formKey="tab2"
            fieldsNeeded={fieldsBank()}
            initialValues={initialValues(item)}
            validate={validateBank}
            onSubmit={this.handleSubmitTab2}
            getActionState={this.props.getActionState}
            clearActionState={this.props.clearActionState}
          />
        </Tab>
        <Tab eventKey={3} title="3. EXTRA GEGEVENS" disabled={this.state.disabled.tab3}>
          <DynamicForm
            checkKey={reducerKey + checkKey() + 'tab3'}
            formName={reducerKey}
            formKey="tab3"
            fieldsNeeded={fieldsExtra()}
            initialValues={initialValues(item)}
            validate={validateExtra}
            onSubmit={this.handleSubmitTab3}
            getActionState={this.props.getActionState}
            clearActionState={this.props.clearActionState}
          />
        </Tab>
      </Tabs>
    );
  }

  render() {
    return (
      <div>
        <PageHeader
          title="Gegevens wijzigen"
          desc="Hier kunt u de gegevens van uw clubs wijzigen."
          links={[
            {to: '/', name: 'Home'},
            {to: '/dashboard', name: 'Dashboard'},
            {name: 'Gegevens wijzigen'}
          ]}
        />

        <div className="container">
          <Row>
            <Col md={12}>
              <div className="form-wrapper">
                <h2 className="title-underblock custom mb40">Club gegevens</h2>
                <Pending state={_.get(this.props, [reducerIndex, reducerKey, reducerItem, 'pending'], false) ||
                _.get(this.props, [reducerIndex, reducerKey, reducerItem, 'actionStatus', 'pending'], false)
                }>
                  {this.form()}
                </Pending>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Settings;
