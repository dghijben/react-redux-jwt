import React from 'react';
import { FormattedNumber, FormattedMessage, FormattedDate } from 'react-intl';
import DynamicForm from './DynamicForm';
import Helmet from 'react-helmet';

export default class Home extends React.Component {
  render() {
    const now = Date.now();
    return (
      <div>
        <Helmet
          title="Site"
          titleTemplate="MySite.com - %s"
          />
        <h1>Test dd</h1>

        <div>
          greeting => <FormattedMessage id="greeting" />
          <div>
            <a href="?locale=nl">Dutch</a><br />
            <a href="?locale=en">English</a><br />
          </div>
        </div>

        <div>
          #10000 => <FormattedNumber value={10000} />
        </div>

        <time dateTime={now} className="fancy-date">
          <FormattedDate value={now} />
        </time>
        <DynamicForm
          formKey={'DynamicForm'}
          formName="contact"
          fieldsNeeded={['name', 'mango', 'lala']} initialValues={{name: 'kaas met mango'}}/>

      </div>
    );
  }
}
