import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { PropTypes as historyPropTypes } from 'react-router';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import Form from './Form';
import { passwordChange } from '../../../../redux/modules/auth/authActions';
import Pending from 'components/includes/Pending';

@connect(state => ({
  authorization: state.authorization,
  router: state.router
}))
class PasswordReset extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    authorization: PropTypes.object,
    router: PropTypes.object,
    history: historyPropTypes.history
  };

  componentWillReceiveProps(nextProps) {
    if (_.get(nextProps, 'authorization.passwordChange.success', false)) {
      this.props.history.pushState(null, '/login');
    }
  }

  static submit(event) {
    event.preventDefault();
  }

  handleSubmit(payload) {
    payload.token = this.props.router.params.token;
    this.props.dispatch(passwordChange(payload));
  }

  render() {
    return (
      <div>
        <div className="page-header dark larger larger-desc">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>Account</h1>
                <p className="page-header-desc">Wachtwoord instellen.</p>
              </div>
              <div className="col-md-6">
                <ol className="breadcrumb">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  <li className="active">Wachtwoord instellen</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Grid>
            <Row>
              <Col md={6} sm={12}>
                <div className="form-wrapper">
                  <h2 className="title-underblock custom mb30">Wachtwoord wijzigen</h2>
                  <Pending state={_.get(this.props, 'authorization.passwordChange.pending', false)}>
                    <Form onSubmit={this.handleSubmit.bind(this)}
                          failed={_.get(this.props, 'authorization.passwordChange.failed', false)}
                          success={_.get(this.props, 'authorization.passwordChange.success', false)}
                          pending={_.get(this.props, 'authorization.passwordChange.pending', false)}
                          error={_.get(this.props, 'authorization.passwordChange.msg', false)}
                    />
                  </Pending>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default PasswordReset;
