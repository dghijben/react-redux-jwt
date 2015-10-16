import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { PropTypes as historyPropTypes } from 'react-router';
import { Input, Row, Col, Alert } from 'react-bootstrap';
import {connectReduxForm} from 'redux-form';
import validateForm from './ValidateForm';
import ButtonState from '../../Includes/ButtonState';
import bootstrapLink from '../../../../utils/bootstrapLink';

class Form extends Component {
  constructor() {
    super();
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.state = {
      'displayError': true,
      'displaySuccess': true
    };
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
              We hebben een e-mail naar u verzonden volg hierin de instructies verder op.
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
        {this.errorMessage()}
        {this.successMessage()}
        <Row>
          <Col md={9} mdOffset={3}>
            <ButtonState pending={_.get(this.props, 'authorization.pending', false)} bsStyle="primary" onClick={this.props.handleSubmit} fa="fa-key">wachtwoord herstellen</ButtonState>

            <div className="pull-right">
              <ButtonState bsStyle="link" pullRight {...bootstrapLink(this.context.history, null, '/login')} fa="fa-long-arrow-left">terug naar inloggen</ButtonState>
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

Form.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  failed: PropTypes.bool.isRequired,
};

Form.contextTypes = {
  history: historyPropTypes.history
};

Form = connectReduxForm({
  form: 'login',                      // the name of your form and the key to
  fields: ['email'],
  validate: validateForm
})(Form);

export default Form;
