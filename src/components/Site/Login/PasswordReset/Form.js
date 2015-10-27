import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { PropTypes as historyPropTypes } from 'react-router';
import { Input, Row, Col } from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import validateForm from './ValidateForm';
import ButtonState from '../../../Includes/ButtonState';
import bootstrapLink from '../../../../utils/bootstrapLink';
import formWrap from '../../../Includes/FormWrap';

class Form extends Component {
  constructor() {
    super();
  }

  render() {
    const active = _.get(this.props, 'active', false);
    let error = null;
    switch (_.get(this.props, 'error', null)) {
      case 'password.token':
        error = 'Het wachtwoord token is ongeldig.';
        break;
      case 'passwords.user':
      case 'password.email':
        error = 'Het wachtwoord kon niet worden gewijzigd.';
        break;
      default:
        error = 'Er is een fout opgetreden.';
        break;
    }

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
        <Input type="password" label="Wachtwoord nogmaals" labelClassName="col-md-3"
               wrapperClassName="col-md-9" {...this.props.fields.passwordCheck}
               bsStyle={(this.props.fields.passwordCheck.error && this.props.fields.passwordCheck.touched) ? 'error' : null}
               help={(this.props.fields.passwordCheck.error && this.props.fields.passwordCheck.touched) ? this.props.fields.passwordCheck.error : ''}
          />
        {this.props.errorMessage(active, error)}
        {this.props.successMessage(active, 'Uw wachtwoord is gewijzigd.')}
        <Row>
          <Col md={9} mdOffset={3}>
            <ButtonState pending={_.get(this.props, 'pending', false)} bsStyle="primary" onClick={this.props.handleSubmit} fa="fa-key">wachtwoord herstellen</ButtonState>

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
  success: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  errorMessage: PropTypes.func.isRequired,
  successMessage: PropTypes.func.isRequired,
  error: PropTypes.string

};

Form.contextTypes = {
  history: historyPropTypes.history
};

const BeforeConnect = formWrap(Form);
const AfterWrap = reduxForm({
  form: 'form',                      // the name of your form and the key to
  fields: ['email', 'password', 'passwordCheck'],
  validate: validateForm
})(BeforeConnect);

export default AfterWrap;
