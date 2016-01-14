import _ from 'lodash';
import React from 'react';
import Paginator from 'react-laravel-paginator';
import ImageItem from './ImageItem';
import Filter from './Filter';

class ImageList extends React.Component {
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
        return <Paginator currPage={currentPage} lastPage={lastPage} onChange={this.switchPage}/>;
      }

      return (
        <div className="alert alert-warning pos-absolute" >
          <strong>Geen resultaten!</strong> Helaas heeft uw zoekopdracht geen resultaten opgeleverd.
        </div>);
    };

    const chunks = _.chunk(_.get(this.props, ['list', 'data'], []), 4);
    return (
      <div ref="imagelist">
        <Filter />
        {_.map(chunks, (chunk, key) => {
          return (
            <div className="row" key={key}>
              {_.map(chunk, (item, siteKey) => {
                return <ImageItem item={item} key={siteKey} profile={this.props.profile}/>;
              })}
            </div>
          );
        })}
        {paged()}
      </div>
    );
  }
}

ImageList.propTypes = {
  list: React.PropTypes.object,
  profile: React.PropTypes.object,
  switchPage: React.PropTypes.func
};
ImageList.defaultProps = {};

export default ImageList;

