import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import BaseForm from './BaseForm';

class DynamicForm extends Component {

  static propTypes = {
    formName: PropTypes.string.isRequired,
    formKey: PropTypes.string.isRequired,
    fieldsNeeded: PropTypes.array.isRequired,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    getActionState: PropTypes.func,
    validate: PropTypes.func,
    success: PropTypes.bool
  };

  render() {
    const { formName, fieldsNeeded } = this.props;
    let fields = _.pluck(fieldsNeeded, 'name');
    fields = fields.concat(_.pluck(_.pluck(fieldsNeeded, 'buttonBefore'), 'name'));
    fields = fields.concat(_.pluck(_.pluck(fieldsNeeded, 'buttonAfter'), 'name'));
    const pickNonfalsy = _.partial(_.pick, _, _.identity);

    const DynamicInnerForm = reduxForm({
      form: formName,
      fields: _.values(pickNonfalsy(fields)),
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
      submit={this.props.onSubmit}
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
      />);
  }
}

export default DynamicForm;
