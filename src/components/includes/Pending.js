import React, {Component, PropTypes} from 'react';

export default class Pending extends Component {
  static propTypes = {
    state: PropTypes.bool.isRequired,
    failed: PropTypes.bool,
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
    if (this.props.failed === true) {
      return (
        <div className="error-page text-center">
          <div className="container">
            <h2 className="error-title">404</h2>
            <h3 className="error-subtitle">Page Not Found</h3>

            <p className="error-text center-block">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos animi, enim ullam consequatur ad ipsa quaerat voluptatem. Nulla similique assumenda alias perferendis voluptatibus voluptates neque voluptatem nesciunt, atque suscipit unde.</p>

            <form action="#">
              <div className="form-group">
                <input className="form-control input-lg input-border-bottom text-center" type="text" placeholder="Search in here..." />
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-dark no-radius min-width" value="Search Now" />
              </div>
            </form>
          </div>
        </div>
        );
    }

    return (
      <div className="pendingWrapper">
        {this.pending()}
        {this.props.children}
      </div>
    );
  }
}
