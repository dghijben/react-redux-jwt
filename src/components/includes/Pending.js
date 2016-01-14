import React, {Component, PropTypes} from 'react';

export default class Pending extends Component {
  static propTypes = {
    state: PropTypes.bool.isRequired,
    children: React.PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.array.isRequired
    ])
  }

  constructor() {
    super();
    this.pending = this.pending.bind(this);
  }

  pending() {
    if (this.props.state === true) {
      return ([
        <div key="1" className="pendingOverlayBackground"></div>,
        (<div key="2" className="pendingOverlayContent">
          <div className="block">
            <div className="centered">
              <i className="fa fa-spinner fa-pulse fa-3x"></i>
            </div>
          </div>
        </div>)
      ]);
    }
  }

  render() {
    return (
      <div className="pendingWrapper">
        {this.pending()}
        {this.props.children}
      </div>
    );
  }
}
