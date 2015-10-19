import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { PropTypes as historyPropTypes } from 'react-router';
import { Input, Row, Col } from 'react-bootstrap';
import {connectReduxForm} from 'redux-form';
import validateForm from './ValidateForm';
import ButtonState from '../../../Includes/ButtonState';
import bootstrapLink from '../../../../utils/bootstrapLink';
import formWrap from '../../../Includes/FormWrap';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      'displayError': true,
      'displaySuccess': true
    };
  }

  render() {
    const active = _.get(this.props, 'active', false);
    return (
      <form className="form-horizontal">
        <Input type="text" label="Email" labelClassName="col-md-3"
               wrapperClassName="col-md-9" {...this.props.fields.email}
               bsStyle={(this.props.fields.email.error && this.props.fields.email.touched) ? 'error' : null}
               help={(this.props.fields.email.error && this.props.fields.email.touched) ? this.props.fields.email.error : ''}
          />
        {this.props.errorMessage(active, 'Er is helaas een fout opgetreden.')}
        {this.props.successMessage(active, 'We hebben een e-mail naar u verzonden. Volg de instructies op.')}
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
  errorMessage: PropTypes.func.isRequired,
  successMessage: PropTypes.func.isRequired
};

Form.contextTypes = {
  history: historyPropTypes.history
};

const BeforeConnect = formWrap(Form);
export default connectReduxForm({
  form: 'login',                      // the name of your form and the key to
  fields: ['email'],
  validate: validateForm
})(BeforeConnect);
