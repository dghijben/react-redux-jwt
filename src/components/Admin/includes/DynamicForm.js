import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import BaseForm from './BaseForm';

class DynamicForm extends Component {

  static propTypes = {
    formName: PropTypes.string.isRequired,
    formKey: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    fieldsNeeded: PropTypes.array.isRequired,
    initialValues: PropTypes.object
  };

  onSubmit(data) {
    this.props.onSubmit(data);
  }

  render() {
    const { formName, fieldsNeeded } = this.props;
    let fields = _.pluck(fieldsNeeded, 'name');
    fields = fields.concat(_.pluck(_.pluck(fieldsNeeded, 'buttonBefore'), 'name'));
    fields = fields.concat(_.pluck(_.pluck(fieldsNeeded, 'buttonAfter'), 'name'));
    const pickNonfalsy = _.partial(_.pick, _, _.identity);

    const DynamicInnerForm = reduxForm({
      form: formName,
      fields: _.values(pickNonfalsy(fields))
    })(BaseForm);

    return (<DynamicInnerForm
      formKey={this.props.formKey}
      initialValues={this.props.initialValues}
      fieldsNeeded={this.props.fieldsNeeded}
      onSubmit={this.onSubmit.bind(this)}/>);
  }
}

export default DynamicForm;
