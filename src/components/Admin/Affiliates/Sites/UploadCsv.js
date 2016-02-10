import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import connectData from 'helpers/connectData';
import {mapDispatchToProps, getActionStatus} from 'utils/functions';
import {Well, Row, Col} from 'react-bootstrap';
import Ribbon from 'components/Admin/includes/Ribbon';
import DynamicForm from 'redux-form-generator';
import * as actions from 'redux/modules/data/actions';
import {fieldsUpload, reducerIndex, reducerKeyCsv, reducerItem, fetchDataDeferred} from './fields';

@connectData(null, fetchDataDeferred)
@connect(state=>{
  const obj = {
    'token': state.authorization.token,
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)
class Create extends Component {

  static propTypes = {
    'token': PropTypes.string,
    'router': PropTypes.object.isRequired,
    'dispatch': PropTypes.func,
    'history': PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.getActionState = this.getActionState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (_.get(nextProps, [reducerIndex, reducerKeyCsv, reducerItem, 'actionStatus', 'success']) === true ) {
      // this.props.history.pushState({}, '/admin/' + path + '/' + _.get(nextProps, [reducerIndex, reducerKeyCsv, reducerItem, 'id']) + '/edit');
    }
  }

  getActionState() {
    return getActionStatus(this.props, [reducerIndex, reducerKeyCsv, reducerItem]);
  }

  handleSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(actions.create(reducerKeyCsv, values))
        .then((ret)=> {
          if (_.has(ret, 'error')) {
            reject(ret.error);
          } else {
            resolve();
          }
        });
    });
  }

  render() {
    const breadCrumbs = [
      {name: 'Admin', to: '/admin'},
      {name: 'Affiliates', to: '/admin/affiliates'},
      {name: 'Sites'},
      {name: 'Csv'},
    ];
    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>
        <div id="content">
          <Well>
            <h1>Csv uploaden
            </h1>
            <Row>
              <Col md={2}>
                <p>Het eerste record uit het csv bestand bevat de namen van de kolommen.
                De onderstaande kolommen woreden verwacht.</p>

                <table className="table table-striped">
                  <tr><td>Actief</td><td>0 of 1</td></tr>
                  <tr><td>Adverteerders</td><td>string</td></tr>
                  <tr><td>CPM</td><td>0.00</td></tr>
                  <tr><td>CPL</td><td>0.00</td></tr>
                  <tr><td>CPS</td><td>0.00</td></tr>
                  <tr><td>CPC</td><td>0.00</td></tr>
                  <tr><td>CSR</td><td>0.00</td></tr>
                  <tr><td>eCPC</td><td>0.00</td></tr>
                </table>
              </Col>
              <Col md={10}>
                <DynamicForm
                  checkKey={reducerIndex}
                  formName={reducerIndex}
                  formClass="form-horizontal"
                  fieldsNeeded={fieldsUpload(this.props.token)}
                  initialValues={{field_delimiter: ',', field_enclosure: '"'}}
                  onSubmit={this.handleSubmit}
                  getActionState={this.getActionState}
                  />
              </Col>
            </Row>
          </Well>
        </div>
      </div>
    );
  }
} export default Create;
