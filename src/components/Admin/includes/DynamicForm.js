import React, { Component, PropTypes } from 'react';
import { connectReduxForm } from 'redux-form';
import BaseForm from './BaseForm';

class DynamicForm extends Component {
  render() {
    const { formName, fieldsNeeded } = this.props;

    let DynamicInnerForm = connectReduxForm({
      form: formName,
      fields: fieldsNeeded,
      validate: (data) => { return {}; }
    })(BaseForm);

    return <DynamicInnerForm formKey={this.props.formKey} initialValues={this.props.initialValues}/>;
  }
}

export default DynamicForm;
