import _ from 'lodash';
import React from 'react';
import Paginator from 'react-laravel-paginator';
import Item from './Item';
import Filter from './Filter';

class List extends React.Component {
  constructor() {
    super();
    this.switchPage = this.switchPage.bind(this);
  }

  switchPage(params) {
    // Scroll to the top of this elem, with an offset of 80px
    const elem = this.refs.imagelist;
    window.scroll(0, window.pageYOffset - (elem.getBoundingClientRect().top * -1) - 80);
    this.props.switchPage(params);
  }

  render() {
    const paged = () => {
      const list = _.get(this.props, ['list', 'meta', 'pagination']);
      if (list && list.total > 0) {
        const currentPage = list.current_page;
        const lastPage = list.total_pages;
        if (lastPage > 1) {
          return (
            <nav className="pagination-container">
              <Paginator currPage={currentPage} lastPage={lastPage} onChange={this.switchPage}/>
            </nav>
          );
        }
      } else {
        return (
          <div className="alert alert-warning" >
            <strong>Geen resultaten!</strong> Helaas heeft uw zoekopdracht geen resultaten opgeleverd.
          </div>);
      }
    };

    const display = this.props.inputOnStack('display') === 'list' ? 'list' : 'grid';
    if (display === 'list') {
      return (<div ref="imagelist">
        <Filter
            pushOnState={this.props.pushOnState}
            inputOnStack={this.props.inputOnStack}
        />
        {_.map(_.get(this.props, ['list', 'data'], []), (item, siteKey) => {
          return <Item item={item} key={siteKey} display={display} />;
        })}
      </div>);
    }

    const chunks = _.chunk(_.get(this.props, ['list', 'data'], []), 4);
    return (
      <div ref="imagelist">
        <Filter
          pushOnState={this.props.pushOnState}
          inputOnStack={this.props.inputOnStack}
        />
        {_.map(chunks, (chunk, key) => {
          return (
            <div className="row" key={key}>
              {_.map(chunk, (item, siteKey) => {
                return <Item item={item} key={siteKey} display={display} />;
              })}
            </div>
          );
        })}
        {paged()}
      </div>
    );
  }
}

List.propTypes = {
  list: React.PropTypes.object,
  switchPage: React.PropTypes.func,
  pushOnState: React.PropTypes.func,
  inputOnStack: React.PropTypes.func
};
List.defaultProps = {};

export default List;
