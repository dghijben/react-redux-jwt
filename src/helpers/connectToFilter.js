import React, {Component} from 'react';

export default function connectToFilter() {
  return function wrapWithConnect(WrappedComponent) {
    console.log('DecoratedComponent', WrappedComponent);
    class InnerComponent extends Component {
      render() {
        console.log('WHAT');

        return (<WrappedComponent {...this.props} />);
      }
    }
    return InnerComponent(WrappedComponent);

  };
}
