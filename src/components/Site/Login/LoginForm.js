import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { Input, Row, Col } from 'react-bootstrap';
import {connectReduxForm} from 'redux-form';
import validateLogin from './ValidateLogin';
import ButtonState from '../Includes/ButtonState';

class LoginForm extends Component {
  render() {
    return (
      <form className="form-horizontal">
        <Input type="text" label="Email" labelClassName="col-md-3"
               wrapperClassName="col-md-9" {...this.props.fields.email}
               bsStyle={(this.props.fields.email.error && this.props.fields.email.touched) ? 'error' : null}
               help={(this.props.fields.email.error && this.props.fields.email.touched) ? this.props.fields.email.error : ''}
               />

        <Input type="password" label="Wachtwoord" labelClassName="col-md-3"
               wrapperClassName="col-md-9" {...this.props.fields.password}
               bsStyle={(this.props.fields.password.error && this.props.fields.password.touched) ? 'error' : null}
               help={(this.props.fields.password.error && this.props.fields.password.touched) ? this.props.fields.password.error : ''}
               />

        <Row>
          <Col md={9} mdOffset={3}>
            <ButtonState pending={_.get(this.props, 'authorization.pending', false)} bsStyle="primary" onClick={this.props.handleSubmit}>inloggen</ButtonState>

            <div className="pull-right">
              <ButtonState bsStyle="link" href="#" pullRight>wachtwoord vergeten?</ButtonState>
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

LoginForm = connectReduxForm({
  form: 'login',                      // the name of your form and the key to
  fields: ['email', 'password'],
  validate: validateLogin
})(LoginForm);

export default LoginForm;
