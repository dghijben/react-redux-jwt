import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { PropTypes as historyPropTypes } from 'react-router';
import { Input, Row, Col, Alert } from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import validateLogin from './ValidateLogin';
import ButtonState from '../Includes/ButtonState';
import bootstrapLink from '../../../utils/bootstrapLink';

class LoginForm extends Component {
  constructor() {
    super();
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.state = {
      'displayError': true,
      'displaySuccess': true

    };
  }

  componentWillReceiveProps(nextProps) {
    if (_.get(this.props, 'active', false) !== false) {
      this.setState({'displayError': false});
      this.setState({'displaySuccess': false});
    }

    if (_.get(this.props, 'failed') !== _.get(nextProps, 'failed')) {
      this.setState({'displayError': true});
    }

    if (_.get(this.props, 'success') !== _.get(nextProps, 'success')) {
      this.setState({'displaySuccess': true});
    }

  }

  errorMessage() {
    if (_.get(this.props, 'failed', false) === true &&
        _.get(this.props, 'pending', false) === false &&
        _.get(this.props, 'active', false) === false
        && this.state.displayError === true
    ) {
      return (
        <Row>
          <Col md={12}>
            <Alert bsStyle="danger">
              Inloggen is mislukt, controleer uw inloggegevens en probeer het opnieuw.
            </Alert>
          </Col>
        </Row>
      );
    }
  }

  successMessage() {
    if (_.get(this.props, 'success', false) === true &&
      _.get(this.props, 'pending', false) === false &&
      _.get(this.props, 'active', false) === false
      && this.state.displaySuccess === true
    ) {
      return (
        <Row>
          <Col md={12}>
            <Alert bsStyle="success">
              Inloggen is gelukt
            </Alert>
          </Col>
        </Row>
      );
    }
  }

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
        {this.errorMessage()}
        {this.successMessage()}
        <Row>
          <Col md={9} mdOffset={3}>
            <ButtonState pending={_.get(this.props, 'authorization.pending', false)} bsStyle="primary" onClick={this.props.handleSubmit} fa="fa-hand-pointer-o">{' '}inloggen</ButtonState>

            <div className="pull-right">
              <ButtonState bsStyle="link" pullRight {...bootstrapLink(this.context.history, null, '/password-forgotten')} fa="fa-long-arrow-right">{' '}wachtwoord vergeten?</ButtonState>
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
  failed: PropTypes.bool.isRequired
};

LoginForm.contextTypes = {
  history: historyPropTypes.history
};

LoginForm = reduxForm({
  form: 'login',                      // the name of your form and the key to
  fields: ['email', 'password'],
  validate: validateLogin
})(LoginForm);

export default LoginForm;
