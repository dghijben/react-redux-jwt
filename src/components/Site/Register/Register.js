import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {mapDispatchToProps, getActionStatus} from 'utils/functions';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import validator from './validate';
import DynamicForm from 'redux-form-generator';
import {create} from 'redux/modules/data/actions';
import {fields1, reducerIndex, reducerKey, reducerItem} from './fields';

@connect(state=>{
  const obj = {
    'token': state.authorization.token
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)
class Register extends Component {

  getActionState() {
    return getActionStatus(this.props, [reducerIndex, reducerKey, reducerItem]);
  }

  handleSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(create(reducerKey, values))
        .then((ret)=> {
          if (_.has(ret, 'error')) {
            reject(ret.error);
          } else {
            resolve();
          }
        });
    });
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
                <Tabs bsStyle="pills">
                  <Tab eventKey={1} title="1. ADRES GEGEVENS">
                    <DynamicForm
                      checkKey={reducerKey + checkKey()}
                      formName={reducerKey}
                      formClass="dummy"
                      fieldsNeeded={fields1()}
                      initialValues={{}}
                      validate={validator}
                      onSubmit={this.handleSubmit}
                      getActionState={this.getActionState}
                      />
                  </Tab>
                  <Tab eventKey={2} title="2. BANK GEGEVENS" disabled>Tab 2 content</Tab>
                  <Tab eventKey={3} title="3. CLUB GEGEVENS" disabled>Tab 3 content</Tab>
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
