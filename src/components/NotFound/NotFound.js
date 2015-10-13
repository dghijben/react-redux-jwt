import React from 'react';
import Helmet from 'react-helmet';
export default class Admin extends React.Component {

  render() {
    return (
      <div>
        <Helmet
          title="Site"
          titleTemplate="MySite.com - %s"
          link={[{'rel': 'stylesheet', 'href': '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css', 'type': 'text/css', 'media': 'screen'}]}
          />
        <div>
         <h2>Page not found!</h2>
        </div>
      </div>
    );
  }
}
