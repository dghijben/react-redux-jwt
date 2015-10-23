import React, { Component, PropTypes } from 'react';
import { connectReduxForm } from 'redux-form';
import BaseForm from './BaseForm';

class DynamicForm extends Component {

  static propTypes = {
    formName: PropTypes.string.isRequired,
    formKey: PropTypes.string.isRequired,
    fieldsNeeded: PropTypes.array.isRequired,
    initialValues: PropTypes.object
  };

  render() {
    const { formName, fieldsNeeded } = this.props;

    const DynamicInnerForm = connectReduxForm({
      form: formName,
      fields: fieldsNeeded
    })(BaseForm);

    return <DynamicInnerForm formKey={this.props.formKey} initialValues={this.props.initialValues}/>;
  }
}

export default DynamicForm;
