import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from 'utils/functions';
import {Link} from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import {fetchDataDeferred, reducerIndex, reducerKeyVerify, reducerItem} from './fields';
import connectToState from 'helpers/connectToState';
import connectData from 'helpers/connectData';

@connectData(null, fetchDataDeferred)
@connectToState(reducerIndex, reducerKeyVerify, reducerItem)
@connect(state=> {
  const obj = {
    'authorization': state.authorization
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)
class RegisterVerify extends Component {

  static propTypes = {
    'handleSubmit': PropTypes.func
  };


  render() {

    const status = () => {
      if (_.has(this.props, [reducerIndex, reducerKeyVerify, reducerItem, 'success'])) {
        return (
          <p className="text-success">Uw account is nu geactiveerd.</p>
        );
      }

      return (
        <p className="text-danger">Oops, het activeren is mislukt. Wellicht is uw account al geactiveerd.</p>
      );
    };

    return (
      <div>
        <div className="page-header dark larger larger-desc">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>Registratie verifiëren</h1>

              </div>
              <div className="col-md-6">
                <ol className="breadcrumb">
                  <li><Link to="/">Home</Link></li>
                  <li className="active">Registratie verifieren</li>
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
                  <h2 className="title-underblock custom mb30">Verificatie</h2>
                  {status()}
                </div>
              </Col>
              <Col md={6} sm={12}>

                <h2 className="title-underblock custom mb30">Account aanmaken</h2>
                <p>
                  In eros erat, efficitur ultricies lacus quis, convallis facilisis justo. Fusce viverra consectetur euismod. Integer id magna a metus malesuada commodo in in nisi. Maecenas quis urna sapien. Phasellus sollicitudin diam vel felis ultrices convallis. Aliquam hendrerit quam sed erat dapibus, ut vulputate leo consequat. Ut ornare porta varius. Mauris hendrerit lectus arcu, id rhoncus augue malesuada eget.

                </p>

              </Col>
            </Row>
          </Grid>
        </div>
      </div>

    );
  }
}

export default RegisterVerify;
