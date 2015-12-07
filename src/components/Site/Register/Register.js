import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {mapDispatchToProps} from 'utils/functions';
import {Grid, Row, Col } from 'react-bootstrap';
import validator from './validate';
import {setToken, getUser} from 'redux/modules/auth/authActions';
import DynamicForm from 'redux-form-generator';
import {fields1, reducerIndex, reducerKey, reducerItem} from './fields';
import connectToState from 'helpers/connectToState';

@connectToState(reducerIndex, reducerKey, reducerItem)
@connect(state=> {
  const obj = {
    'authorization': state.authorization
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)
class Register extends Component {

  static propTypes = {
    'clearItem': PropTypes.func,
    'handleSubmit': PropTypes.func,
    'getActionState': PropTypes.func,
    'dispatch': PropTypes.func,
    'pushState': PropTypes.func
  };

  componentWillReceiveProps(nextProps) {

    if (!_.has(this.props, ['data', 'register', 'item', 'token']) && _.has(nextProps, ['data', 'register', 'item', 'token'])) {
      this.props.dispatch(setToken(_.get(nextProps, ['data', 'register', 'item', 'token'])));
    }

    if (!_.has(this.props, ['data', 'register', 'item', 'token']) && _.has(nextProps, ['data', 'register', 'item', 'token'])) {
      this.props.dispatch(getUser(_.get(nextProps, ['data', 'register', 'item', 'token'])));
    }

    if (_.get(nextProps, 'authorization.loggedIn') === true) {
      if (_.get(nextProps, 'authorization.user.success', false) === true) {
        this.props.pushState(null, '/dashboard/register');
      }
    }
  }

  componentWillUnmount() {
    console.log('jibbi');
    this.props.clearItem();
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
                <h1>Registratie pagina</h1>
                <p className="page-header-desc">Registreer je club.</p>
              </div>
              <div className="col-md-6">
                <ol className="breadcrumb">
                  <li><Link to="/">Home</Link></li>
                  <li className="active">Registreren</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <Grid>
            <Row>
              <Col md={6}>
                <div className="form-wrapper">
                  <h2 className="title-underblock custom mb30">Account registreren</h2>
                  <DynamicForm
                    checkKey={reducerKey + checkKey()}
                    formName={reducerKey}
                    formClass="dummy"
                    fieldsNeeded={fields1()}
                    initialValues={{}}
                    validate={validator}
                    onSubmit={this.props.handleSubmit}
                    getActionState={this.props.getActionState}
                  />
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Register;
