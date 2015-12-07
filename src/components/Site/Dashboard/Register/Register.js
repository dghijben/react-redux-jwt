import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {mapDispatchToProps} from 'utils/functions';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import validator, {validateBank, validateExtra} from './validate';
import DynamicForm from 'redux-form-generator';
import {fields1, fieldsBank, fieldsExtra, reducerIndex, reducerKey, reducerItem} from './fields';
import connectToState from 'helpers/connectToState';

@connectToState(reducerIndex, reducerKey, reducerItem)
@connect(state=> {
  const obj = {
    'token': state.authorization.token
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)
class Register extends Component {

  static propTypes = {
    'handleSubmit': PropTypes.func,
    'getActionState': PropTypes.func
  }

  constructor() {
    super();
    this.handleSubmitTab1 = this.handleSubmitTab1.bind(this);
    this.handleSubmitTab2 = this.handleSubmitTab2.bind(this);
    this.setActiveKey = this.setActiveKey.bind(this);

    this.state = {
      disabled: {
        tab1: false,
        tab2: true,
        tab3: true
      },
      activeKey: 1
    };
  }

  setActiveKey(key) {
    this.setState({activeKey: key});
  }

  handleSubmitTab1() {
    console.log('x');
    // Unlock tab 2
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


  render() {
    const checkKey = () => {
      return reducerIndex;
    };

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
                <Tabs bsStyle="pills" activeKey={this.state.activeKey} onSelect={this.setActiveKey}>
                  <Tab eventKey={1} title="1. CLUB GEGEVENS">
                    <DynamicForm
                      checkKey={reducerKey + checkKey() + 'tab1'}
                      formName={reducerKey}
                      formClass="dummy"
                      fieldsNeeded={fields1()}
                      initialValues={{}}
                      validate={validator}
                      onSubmit={this.handleSubmitTab1}
                      getActionState={this.props.getActionState}
                    />
                  </Tab>
                  <Tab eventKey={2} title="2. BANK GEGEVENS" disabled={this.state.disabled.tab2}>
                    <DynamicForm
                      checkKey={reducerKey + checkKey() + 'tab2'}
                      formName={reducerKey}
                      fieldsNeeded={fieldsBank()}
                      initialValues={{}}
                      validate={validateBank}
                      onSubmit={this.handleSubmitTab2}
                      getActionState={this.props.getActionState}
                    />
                  </Tab>
                  <Tab eventKey={3} title="3. CLUB GEGEVENS" disabled={this.state.disabled.tab3}>
                    <DynamicForm
                      checkKey={reducerKey + checkKey() + 'tab2'}
                      formName={reducerKey}
                      fieldsNeeded={fieldsExtra()}
                      initialValues={{}}
                      validate={validateExtra}
                      onSubmit={this.handleSubmit}
                      getActionState={this.props.getActionState}
                    />
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Register;
