import React, { Component } from 'react';

class BaseForm extends Component {
  render() {
    const { fields } = this.props;

    return (
      <div formKey={this.props.formKey} >
        {Object.keys(fields).map(fieldName => <div key={fieldName}>
          <label>{fieldName}</label>
          <input type="text" {...fields[fieldName]}/>
          {fields[fieldName].touched && 'T' }
          {fields[fieldName].active && 'A' }
          {fields[fieldName].visited && 'V' }
        </div>)}
      </div>
    );
  }
}

export default BaseForm;
