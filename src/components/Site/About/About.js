import React from 'react';
import DynamicForm from './DynamicForm';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>

        <DynamicForm
          formKey={'DynamicForm'}
          formName="contact"
          fieldsNeeded={['name', 'mango', 'lala']} initialValues={{name: 'kaas met mango'}}/>

      </div>
    );
  }
}
