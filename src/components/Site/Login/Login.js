import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import LoginForm from './LoginForm';
import { authenticate } from '../../../redux/modules/auth/authActions';

class Login extends Component {

  componentWillReceiveProps(nextProps) {
    if (_.get(nextProps, 'authorization.loggedIn') === true) {
      if (_.get(nextProps, 'authorization.user.success', false) === true) {
        if (_.get(nextProps, 'authorization.user.admin', false) === true) {
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
    this.props.dispatch(authenticate(payload));
  }

  render() {
    if (_.has(this.props, 'children')) {
      if (this.props.history.isActive('/password-forgotten') === true ||
          this.props.history.isActive('/password-reset/' + _.get(this.props, 'router.params.token')) === true
      ) {
        return this.props.children;
      }
    }

    return (
      <div>
        <div className="page-header dark larger larger-desc">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>Inlog pagina</h1>
                <p className="page-header-desc">Inloggen op je account, of een acount aanmaken..</p>
              </div>
              <div className="col-md-6">
                <ol className="breadcrumb">
                  <li><Link to="/">Home</Link></li>
                  <li className="active">Login</li>
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
                  <h2 className="title-underblock custom mb30">Al een account</h2>
                  <LoginForm onSubmit={this.handleSubmit.bind(this)}
                             failed={_.get(this.props, 'authorization.failed', false)}
                             success={_.get(this.props, 'authorization.success', false)}/>
                  </div>
              </Col>
              <Col md={6} sm={12}>

                  <h2 className="title-underblock custom mb30">Account aanmaken</h2>
                  <p>Heeft u nog geen account? Maak deze dan gratis en snel aan. U kunt direct
                    inloggen en aan de slag gaan.</p>
                  <div className="clearfix">
                    <Link to="/register" className="btn btn-primary pull-right">nu aanmelden</Link>
                  </div>

              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authorization: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.object,
  router: PropTypes.object
};

export default connect(state => ({
  authorization: state.authorization,
  router: state.router
}))(Login);
