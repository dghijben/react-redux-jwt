import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, Well, Row, Col } from 'react-bootstrap';
import LoginForm from './LoginForm';
import {initialize} from 'redux-form';
import { authActions } from '../../../redux/modules/auth';

class Login extends Component {

  componentWillReceiveProps(nextProps) {
    if (_.get(nextProps, 'authorization.loggedIn') === true) {
      if (_.get(nextProps, 'authorization.user.success') === true) {
        if (_.get(nextProps, 'authorization.user.admin') === '1') {
          this.props.history.pushState(null, '/admin');
        } else {
          this.props.history.pushState(null, '/dashboard');
        }
      }
    }
  }

  static submit(event) {
    event.preventDefault();
  }

  handleSubmit(payload) {
    this.props.dispatch(authActions.authenticate(payload));
    this.props.dispatch(initialize('login', {})); // clear form
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col>
              <h1>Inloggen</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <h4>Al een account</h4>
              <LoginForm onSubmit={this.handleSubmit.bind(this)}/>
            </Col>
            <Col md={6} sm={12}>
              <Well>
                <h4>Registreren</h4>
                <p>Heeft nog niet een account? Maakt dat nu eenvoudig gratis en snel een aacount aan. U kunt direct
                  inloggen en aan de slag gaan.</p>
                <div className="clearfix">
                  <Button className="pull-right" bsStyle="primary" href="#" pullRight>nu aanmelden</Button>
                </div>
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authorization: PropTypes.object,
  history: PropTypes.object
};

export default connect(state => ({
  authorization: state.authorization
}))(Login);
