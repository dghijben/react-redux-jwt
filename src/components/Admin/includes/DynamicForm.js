import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import BaseForm from './BaseForm';
import {filterFields} from 'utils/functions';

class DynamicForm extends Component {

  static propTypes = {
    formName: PropTypes.string.isRequired,
    formKey: PropTypes.string.isRequired,
    fieldsNeeded: PropTypes.array.isRequired,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func,
    getActionState: PropTypes.func,
    clearActionState: PropTypes.func,
    validate: PropTypes.func,
    success: PropTypes.bool
  };

  render() {
    const { formName, fieldsNeeded } = this.props;


    const DynamicInnerForm = reduxForm({
      form: formName,
      fields: filterFields(fieldsNeeded),
      validate: (values)=>{
        if (_.has(this.props, 'validate')) {
          return this.props.validate(values);
        }
        return {};
      }
    })(BaseForm);

    return (<DynamicInnerForm
      formKey={this.props.formKey}
      initialValues={this.props.initialValues}
      fieldsNeeded={this.props.fieldsNeeded}
      submit={(data, dispatch) => {
        if (this.props.hasOwnProperty('onSubmit')) {
          return this.props.onSubmit(data, dispatch);
        }
      }}

      getActionState={()=> {
        if (this.props.hasOwnProperty('getActionState')) {
          return this.props.getActionState();
        }

        return ()=>{
          return {
            success: false,
            failed: false,
            pending: false
          };
        };

      }}
      clearActionState={()=>{
        if (this.props.hasOwnProperty('clearActionState')) {
          return this.props.clearActionState();
        }

        return ()=>{};
      }}
      />);
  }
}

export default DynamicForm;
