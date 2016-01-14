import _ from 'lodash';
import React from 'react';

class FIlter extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    if (window && window.$ && window.$.fn.selectbox) {
      _.map(this.refs, (ref) => {
        this.makeSmooth(ref);
      });
    }
  }

  makeSmooth(ref) {
    window.$(ref).selectbox({
      effect: 'fade'
    });
  }

  render() {
    return (
      <div className="filter-row clearfix">
        <div className="filter-row-left">
          <span className="filter-row-label">Sort By:</span>
          <div className="small-selectbox clearfix">
            <select id="sort" name="sort" className="selectbox" ref="select1" >
              <option value="Rating">Rating</option>
              <option value="Color">Color</option>
              <option value="Size">Size</option>
              <option value="Price">Price</option>
            </select>
          </div>
        </div>
        <div className="filter-row-left">
          <span className="filter-row-label">Show:</span>
          <div className="small-selectbox clearfix">
            <select id="count" name="count" className="selectbox" ref="select2">
              <option value="54">54</option>
              <option value="100">100</option>
              <option value="154">154</option>
              <option value="250">250</option>
            </select>
          </div>
        </div>
        <div className="filter-row-right">
          <a href="category.html" className="btn btn-layout btn-border add-tooltip active" data-placement="top" title="Category Grid"><i className="fa fa-th"></i></a>
          <a href="category-list.html" className="btn btn-layout btn-border add-tooltip" data-placement="top" title="Category List"><i className="fa fa-th-list"></i></a>
          <a href="compare.html" className="btn btn-compare btn-dark">Compare</a>
        </div>
      </div>
    );
  }
}

FIlter.propTypes = {};
FIlter.defaultProps = {};

export default FIlter;
