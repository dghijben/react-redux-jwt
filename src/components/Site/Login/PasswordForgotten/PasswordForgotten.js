import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { PropTypes as historyPropTypes } from 'react-router';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { Button, Grid, Well, Row, Col } from 'react-bootstrap';
import LoginForm from './Form';
import { passwordReset } from '../../../../redux/modules/auth/authActions';
import Pending from 'components/includes/Pending';

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
        <div className="page-header dark larger larger-desc">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>Account</h1>
                <p className="page-header-desc">Wachtwoord vergeten.</p>
              </div>
              <div className="col-md-6">
                <ol className="breadcrumb">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  <li className="active">Wachtwoord vergeten</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <Grid>
            <Row>
              <Col md={6} sm={12}>
                <Well>
                  <h2 className="title-underblock custom mb30">Wachtwoord vergeten?</h2>
                  <p>Voer hieronder uw e-mailadres in. U zult op dit adres een e-mail bericht ontvangen met verdere
                    intructies.</p>
                  <Pending state={_.get(this.props, 'authorization.password.pending', false)}>
                    <LoginForm onSubmit={this.handleSubmit.bind(this)}
                               failed={_.get(this.props, 'authorization.password.failed', false)}
                               success={_.get(this.props, 'authorization.password.success', false)}
                    />
                  </Pending>
                </Well>
              </Col>
              <Col md={6} sm={12}>

                <h3 className="title-underblock custom mb30">Wist u dat...</h3>
                <p>dat er tools bestaan die al uw wachtwoorden kunnen beheren? Zo heeft u nog maar 1 wachtwoord
                  nodig!</p>
                <div className="clearfix">
                  <Button className="pull-right" bsStyle="primary" href="http://lastpass.com"
                          pullRight>lastpass.com</Button>
                </div>

              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default PasswordForgotten;
