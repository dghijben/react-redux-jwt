import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { PropTypes as historyPropTypes } from 'react-router';
import {connect} from 'react-redux';
import { Button, Grid, Well, Row, Col } from 'react-bootstrap';
import LoginForm from './Form';
import { passwordReset } from '../../../../redux/modules/auth/authActions';

@connect(state => ({
  authorization: state.authorization
}))
class PasswordForgotten extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    authorization: PropTypes.object,
    history: historyPropTypes.history
  };

  static submit(event) {
    event.preventDefault();
  }

  handleSubmit(payload) {
    this.props.dispatch(passwordReset(payload));
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col>
              <h1>Wachtwoord vergeten?</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <p>Voer hieronder uw e-mailadres in. U zult op dit adres een e-mail bericht ontvangen met verdere intructies.</p>
              <LoginForm onSubmit={this.handleSubmit.bind(this)}
                         failed={_.get(this.props, 'authorization.password.failed', false)}
                         success={_.get(this.props, 'authorization.password.success', false)}
                />
            </Col>
            <Col md={6} sm={12}>
              <Well>
                <h4>Wist u dat...</h4>
                <p>dat er tools bestaan die al uw wachtwoorden kunnen beheren? Zo heeft u nog maar 1 wachtwoord nodig!</p>
                <div className="clearfix">
                  <Button className="pull-right" bsStyle="primary" href="http://lastpass.com" pullRight>lastpass.com</Button>
                </div>
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default PasswordForgotten;
