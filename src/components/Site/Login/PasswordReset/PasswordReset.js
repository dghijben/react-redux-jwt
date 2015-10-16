import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { PropTypes as historyPropTypes } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import LoginForm from './Form';
import { passwordChange } from '../../../../redux/modules/auth/authActions';

@connect(state => ({
  authorization: state.authorization
}))
class PasswordReset extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    authorization: PropTypes.object,
    history: historyPropTypes.history
  };

  static submit(event) {
    event.preventDefault();
  }

  handleSubmit(payload) {
    this.props.dispatch(passwordChange(payload));
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col>
              <h1>Wachtwoord wijzigen</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <LoginForm onSubmit={this.handleSubmit.bind(this)}
                         failed={_.get(this.props, 'authorization.passwordChange.failed', false)}
                         success={_.get(this.props, 'authorization.passwordChange.success', false)}
                />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default PasswordReset;
