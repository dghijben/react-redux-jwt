import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';

class Filter extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.change = this.change.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
  }

  componentDidMount() {
    if (window && window.$ && window.$.fn.selectbox) {
      _.map(this.refs, (ref) => {
        this.makeSmooth(ref);
      });
    }
  }

  setDisplay(val) {
    this.props.pushOnState('display', val);
  }

  makeSmooth(ref) {
    window.$(ref).selectbox({
      effect: 'fade',
      onChange: this.change
    });
  }

  change(val, obj) {
    this.props.pushOnState(obj.id, val);
  }

  render() {
    const setDisplayGrid = (e) => {
      e.preventDefault();
      this.setDisplay('grid');
    };

    const setDisplayList = (e) => {
      e.preventDefault();
      this.setDisplay('list');
    };

    const clGrid = classNames({
      'btn btn-layout btn-border': true,
      'active': this.props.inputOnStack('display') !== 'list'
    });

    const clList = classNames({
      'btn btn-layout btn-border': true,
      'active': this.props.inputOnStack('display') === 'list'
    });

    return (
      <div className="filter-row clearfix">
        <div className="filter-row-left">
          <span className="filter-row-label">Sorteer op:</span>
          <div className="small-selectbox clearfix">
            <select id="sort" className="selectbox" ref="select1" onChange={this.change} defaultValue={this.props.inputOnStack('sort')}>
              <option value="nameAsc">Naam oplopend</option>
              <option value="nameDesc">Naam aflopend</option>
            </select>
          </div>
        </div>
        <div className="filter-row-left">
          <span className="filter-row-label">Toon:</span>
          <div className="small-selectbox clearfix">
            <select id="limit" className="selectbox" ref="select2" defaultValue={this.props.inputOnStack('limit')}>
              <option value="52">52</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
        </div>
        <div className="filter-row-right">
          <a onClick={setDisplayGrid} href="?display=grid" className={clGrid} data-placement="top" title="Toon grid"><i className="fa fa-th"></i></a>
          <a onClick={setDisplayList} href="?display=list" className={clList} data-placement="top" title="Toon lijst"><i className="fa fa-th-list"></i></a>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  pushOnState: React.PropTypes.func,
  inputOnStack: React.PropTypes.func
};
Filter.defaultProps = {};

export default Filter;
