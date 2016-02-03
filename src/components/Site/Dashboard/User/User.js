import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from 'utils/functions';
import { Row, Col } from 'react-bootstrap';
import validator from './validate';
import DynamicForm from 'redux-form-generator';
import {fieldsPI, reducerIndex, reducerKey, reducerItem, initialValues} from './fields';
import connectToStore from 'helpers/connectToStore';
import * as actions from 'redux/modules/store/actions';
import PageHeader from 'components/Site/Includes/PageHeader';
import {getUser} from 'redux/modules/auth/authActions';
import Pending from 'components/includes/Pending';
let myTimeout = null;

@connectToStore(reducerIndex, reducerKey, reducerItem)
@connect(state=> {
  const obj = {
    'token': state.authorization.token,
    'router': state.router,
    'form': state.form,
    'user': state.authorization.user
  };
  obj[reducerKey] = state.store[reducerKey];
  return obj;
}, mapDispatchToProps)
class Settings extends Component {

  static propTypes = {
    'handleSubmit': PropTypes.func,
    'getActionState': PropTypes.func,
    'clearActionState': PropTypes.func,
    'dispatch': PropTypes.func,
    'dashboardAccount': PropTypes.object,
    'router': PropTypes.object,
    'form': PropTypes.object,
    'user': PropTypes.object,
    'token': PropTypes.string
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setActiveKey = this.setActiveKey.bind(this);
    this.form = this.form.bind(this);
    this.success = this.success.bind(this);
    this.setStatic = this.setStatic.bind(this);
    this.state = {
      static: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.getActionState().pending === true &&
      _.get(nextProps, [reducerKey, reducerItem, 'actionStatus', 'success'], false) === true) {
      this.props.dispatch(getUser(this.props.token));
      myTimeout = setTimeout(() => {
        this.props.clearActionState(reducerKey);
        this.setState({static: true});
      }, 3000);
    }
  }

  componentWillUnmount() {
    if (myTimeout) {
      clearTimeout(myTimeout);
    }
    this.props.clearActionState(reducerKey);
  }

  setActiveKey(key) {
    this.setState({activeKey: key});
  }

  setStatic() {
    this.setState({static: false});
  }

  handleSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(actions.update(reducerKey, '/dashboard/user', this.props.user.id, values))
        .then((ret)=> {
          if (ret.hasOwnProperty('error')) {
            reject(ret.error);
          } else {
            resolve();
          }
        });
    });
  }

  success() {
    return (
      <div className="alert alert-md alert-success">De gegevens zijn opgeslagen.</div>
    );
  }

  form() {
    if (this.props.getActionState().success === true) {
      return this.success();
    }
    const checkKey = () => {
      let key = _.get(this.props, [reducerKey, reducerItem, 'id'], null);
      key = key + this.state.static;
      return key;
    };

    const editButton = () => {
      if (this.state.static === true ) {
        return (
          <div><button className="btn btn-primary" onClick={this.setStatic}>mijn gegevens aanpassen</button></div>
        );
      }
    };

    return (
      <div>
        <DynamicForm
          checkKey={reducerKey + checkKey()}
          formName={reducerKey}
          formKey="tab1"
          static={this.state.static}
          formClass="dummy"
          fieldsNeeded={fieldsPI()}
          initialValues={initialValues(this.props.user)}
          validate={validator}
          onSubmit={this.handleSubmit}
          getActionState={this.props.getActionState}
          clearActionState={this.props.clearActionState}
        />
        {editButton()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <PageHeader
          title="Gegevens wijzigen"
          desc="Hier kunt u de gegevens van uw clubs wijzigen."
          links={[
            {to: '/', name: 'Home'},
            {to: '/dashboard', name: 'Dashboard'},
            {name: 'Account'}
          ]}
        />

        <div className="container">
          <Row>
            <Col md={12}>
              <div className="form-wrapper">
                <h2 className="title-underblock custom mb40">Geberuiker gegevens</h2>
                <Pending state={_.get(this.props, [reducerIndex, reducerKey, reducerItem, 'pending'], false) ||
                _.get(this.props, [reducerIndex, reducerKey, reducerItem, 'actionStatus', 'pending'], false)
                }>
                  {this.form()}
                </Pending>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Settings;
