import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {mapDispatchToProps} from 'utils/functions';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import validator, {validateBank, validateExtra, validatePI} from './validate';
import DynamicForm from 'redux-form-generator';
import {fields1, fieldsBank, fieldsExtra, fieldsPI, reducerIndex, reducerKey, reducerItem} from './fields';
import connectToState from 'helpers/connectToState';
import * as actions from 'redux/modules/data/actions';
import {getUser} from 'redux/modules/auth/authActions';

@connectToState(reducerIndex, reducerKey, reducerItem)
@connect(state=> {
  const obj = {
    'token': state.authorization.token
  };
  obj[reducerKey] = state.form[reducerKey];
  return obj;
}, mapDispatchToProps)
class Register extends Component {

  static propTypes = {
    'handleSubmit': PropTypes.func,
    'getActionState': PropTypes.func,
    'dispatch': PropTypes.func,
    'dashboardAccount': PropTypes.object,
    'token': PropTypes.string
  }

  constructor() {
    super();
    this.handleSubmitTab1 = this.handleSubmitTab1.bind(this);
    this.handleSubmitTab2 = this.handleSubmitTab2.bind(this);
    this.handleSubmitTab3 = this.handleSubmitTab3.bind(this);
    this.handleSubmitTab4 = this.handleSubmitTab4.bind(this);
    this.setActiveKey = this.setActiveKey.bind(this);
    this.form = this.form.bind(this);
    this.success = this.success.bind(this);

    this.state = {
      disabled: {
        tab1: false,
        tab2: true,
        tab3: true,
        tab4: true
      },
      activeKey: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    if (_.get(nextProps, [reducerIndex, reducerKey, reducerItem, 'actionStatus', 'success'], false) === true) {
      this.props.dispatch(getUser(this.props.token));
    }
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

  handleSubmitTab3() {
    // Unlock tab 4
    const state = Object.assign(
      {},
      this.state,
      {
        disabled: Object.assign(
          {},
          this.state.disabled,
          {
            tab4: false
          }),
        activeKey: 4
      }
    );
    this.setState(state);
  }

  handleSubmitTab4(valuesTab, dispatch) {

    const values = _.omit(_.mapValues(this.props[reducerKey], (n) => {
      if (typeof n === 'object') {
        return n.value;
      }
      return null;
    }), _.isNull);

    return new Promise((resolve, reject) => {
      dispatch(actions.create(reducerKey, values))
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
      return reducerIndex;
    };

    return (
      <Tabs bsStyle="pills" activeKey={this.state.activeKey} onSelect={this.setActiveKey}>
        <Tab eventKey={1} title="1. PERSOONLIJKE GEGEVENS">
          <DynamicForm
            checkKey={reducerKey + checkKey() + 'tab1'}
            formName={reducerKey}
            formClass="dummy"
            fieldsNeeded={fieldsPI()}
            initialValues={{}}
            validate={validatePI}
            onSubmit={this.handleSubmitTab1}
            getActionState={this.props.getActionState}
          />
        </Tab>
        <Tab eventKey={2} title="2. CLUB GEGEVENS" disabled={this.state.disabled.tab2}>
          <DynamicForm
            checkKey={reducerKey + checkKey() + 'tab1'}
            formName={reducerKey}
            formClass="dummy"
            fieldsNeeded={fields1()}
            initialValues={{}}
            validate={validator}
            onSubmit={this.handleSubmitTab2}
            getActionState={this.props.getActionState}
          />
        </Tab>
        <Tab eventKey={3} title="3. BANK GEGEVENS" disabled={this.state.disabled.tab3}>
          <DynamicForm
            checkKey={reducerKey + checkKey() + 'tab2'}
            formName={reducerKey}
            fieldsNeeded={fieldsBank()}
            initialValues={{}}
            validate={validateBank}
            onSubmit={this.handleSubmitTab3}
            getActionState={this.props.getActionState}
          />
        </Tab>
        <Tab eventKey={4} title="4. CLUB GEGEVENS" disabled={this.state.disabled.tab4}>
          <DynamicForm
            checkKey={reducerKey + checkKey() + 'tab2'}
            formName={reducerKey}
            fieldsNeeded={fieldsExtra()}
            initialValues={{}}
            validate={validateExtra}
            onSubmit={this.handleSubmitTab4}
            getActionState={this.props.getActionState}
          />
        </Tab>
      </Tabs>
    );
  }


  render() {
    console.log(this.props);

    return (
      <div>
        <div className="page-header dark larger larger-desc">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>Registeren</h1>
                <p className="page-header-desc">Club aanmelden in 3 stappen.</p>
              </div>
              <div className="col-md-6">
                <ol className="breadcrumb">
                  <li><Link to="/">Home</Link></li>
                  <li className="active">Login</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <Row>
            <Col md={12}>
              <div className="form-wrapper">
                <h2 className="title-underblock custom mb40">Registreer uw club</h2>
                {this.form()}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Register;
