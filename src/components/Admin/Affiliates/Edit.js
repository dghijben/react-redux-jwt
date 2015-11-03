import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadRecord, isLoadedRecord, update} from '../../../redux/modules/admin/affiliates/actions';
import {Well} from 'react-bootstrap';
import Ribbon from '../includes/Ribbon';
import DynamicForm from 'components/Admin/includes/DynamicForm';
import {Pending} from 'components/includes';
import validator from './ValidateEdit';

const REDUCER = 'affiliates';

@connect(state=>({
  'affiliates': state.affiliates,
  'router': state.router
})) class Edit extends Component {

  static propTypes = {
    'router': PropTypes.object.isRequired,
    'affiliates': PropTypes.object.isRequired,
    'history': PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps:Object) {
    // Important when using dynamic redux forms

    let updateComponent = true;
    if (_.get(nextProps, [REDUCER, 'record', 'id']) === _.get(this.props, [REDUCER, 'record', 'id'])) {
      updateComponent = false;
    }
    return updateComponent;
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    if (!isLoadedRecord(state, state.router.params.id)) {
      return dispatch(loadRecord(state.router.params.id));
    }
  }

  handleSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(update(this.props.router.params.id, values))
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
      {
        name: _.get(this.props, 'affiliates.record.name', 'unknown'),
        to: '/admin/affiliates/' + _.get(this.props, [REDUCER, 'record', 'id'])
      },
      {name: 'Wijzigen'}
    ];

    const fields = [
      {
        name: 'logo',
        label: 'Logo',
        type: 'file',
        placeholder: 'Voorletters',
        labelClassName: 'col-md-3',
        wrapperClassName: 'col-md-9'
      },
      {
        name: 'name',
        label: 'Naam',
        type: 'text',
        placeholder: 'Voorletters',
        labelClassName: 'col-md-3',
        wrapperClassName: 'col-md-9'
      },
      {
        name: 'description',
        label: 'Omschrijving',
        type: 'text',
        placeholder: 'Voornamen',
        labelClassName: 'col-md-3',
        wrapperClassName: 'col-md-9'
      },
      {
        name: 'url_site',
        label: 'Url Site',
        type: 'text',
        placeholder: 'Tussenvoegsel',
        labelClassName: 'col-md-3',
        wrapperClassName: 'col-md-9'
      },
      {
        name: 'url_affiliate',
        label: 'Url affiliate',
        type: 'text',
        placeholder: 'Achternaam',
        labelClassName: 'col-md-3',
        wrapperClassName: 'col-md-9'
      },
      {
        name: 'active',
        label: 'Actief',
        type: 'checkbox',
        placeholder: 'E-mail',
        labelClassName: 'col-md-3',
        wrapperClassName: 'col-md-offset-3 col-md-9'
      },
      {
        row: {
          col: [
            {md: 9, mdOffset: 3, children: [{type: 'submit', name: 'edit', value: 'opslaan'}]}
          ]
        }
      }
    ];

    return (
      <div>
        <Ribbon breadCrumbs={breadCrumbs}/>

        <div id="content">
          <Well>
            <h1>Affiliate
              <span>
                {' '} {_.get(this.props, [REDUCER, 'record', 'name'])}
              </span>
            </h1>
            <Pending state={_.get(this.props, [REDUCER, 'record', 'pending'])}>
              <DynamicForm
                formName="recordEdit"
                formKey="form"
                formClass="form-horizontal"
                fieldsNeeded={fields}
                initialValues={_.get(this.props, [REDUCER, 'record'])}
                onSubmit={this.handleSubmit}
                validate={validator}
                />
            </Pending>
          </Well>
        </div>
      </div>
    );
  }
}

export default Edit;
