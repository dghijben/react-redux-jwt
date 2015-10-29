import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadUser, isLoadedUser } from '../../../redux/modules/admin/users/userActions';
import {Well} from 'react-bootstrap';
import deepEqual from 'deep-equal';
import Ribbon from '../includes/Ribbon';
import {Confirm, Pending} from 'components/includes';
import {mapDispatchToProps} from 'utils/functions';
import DynamicForm from 'components/Admin/includes/DynamicForm';

const fields = [
  {name: 'initials', label: 'Voorletters', type: 'text', placeholder: 'Voorletters', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
  {name: 'firstname', label: 'Voornamen', type: 'text', placeholder: 'Voornamen', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
  {name: 'middelname', label: 'Tussenvoegsel', type: 'text', placeholder: 'Tussenvoegsel', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
  {name: 'lastname', label: 'Achternaam', type: 'text', placeholder: 'Achternaam', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
  {name: 'email', label: 'E-mail', type: 'text', placeholder: 'E-mail', labelClassName: 'col-md-3', wrapperClassName: 'col-md-9'},
  {
    row: {
      col: [
        {
          md: 9,
          mdOffset: 3,
          children: [{type: 'submit', name: 'submit', value: 'versturen'}]
        }
      ]
    }
  }
];

// const fieldNames = filterFields(fields);

@connect(state=>({
  'users': state.users,
  'router': state.router
}), mapDispatchToProps)
class UserEdit extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'users': PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.close = this.close.bind(this);
    this.confirmed = this.confirmed.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.state = {
      showModal: false
    };
  }

  shouldComponentUpdate(nextProps: Object) {
    // Important when using dynamic redux forms
    if (deepEqual(_.get(nextProps, 'users.user'), _.get(this.props, 'users.user')) === true ) {
      return false;
    }
    return true;
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    if (!isLoadedUser(state, state.router.params.userId)) {
      return dispatch(loadUser(state.router.params.userId));
    }
  }

  confirmDelete() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  confirmed() {
    this.setState({showModal: false});
  }

  handleSubmit(data) {
    console.log(data);
  }

  renderModal() {
    return (<Confirm showModal={this.state.showModal} close={this.close} confirmed={this.confirmed} />);
  }

  render() {
    const breadcrumps = [
      {name: 'Admin', to: '/admin'},
      {name: 'Users', to: '/admin/users'},
      {name: _.get(this.props, 'users.user.firstname', 'unknown')},
    ];

    return (
      <div>
        <Ribbon breadcrumps={breadcrumps}/>
        <div id="content">
          <Well>
            <h1>Gebruiker <span>{_.get(this.props, 'users.user.firstname', '')}</span></h1>
            <Pending state={_.get(this.props, 'users.user.pending')}>
              <DynamicForm
                formName="userEdit"
                formKey="userEdit"
                formClass="form-horizontal"
                fieldsNeeded={fields}
                initialValues={_.get(this.props, 'users.user')}
                onSubmit={this.handleSubmit}
                />

            </Pending>
          </Well>
        </div>
        {this.renderModal()}
      </div>
    );
  }
} export default UserEdit;
