import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';
import {createMarkup} from 'utils/functions';

class Item extends React.Component {
  render() {
    const picture = () => {
      if (_.has(this.props.item, 'picture.data[0].file_name')) {
        const img = _.get(this.props.item, 'picture.data[0]');
        return <img src={'/image/268x332/' + img.file_name} alt={this.props.item.name} className="img-responsive"/>;
      }
      return (<img src={'https://placehold.it/400x200&text=' + encodeURIComponent(this.props.item.name)}
                  className="img-responsive"/>);
    };

    if (this.props.display === 'list') {
      return (
        <div className="product">
          <div className="row">

            <div className="col-sm-3">
              <div className="product-top">
                <figure>
                  <a href="product.html" title="Product Name">
                    {picture()}
                  </a>
                </figure>
              </div>
            </div>
            <div className="mb20 visible-xs"></div>
            <div className="col-sm-6">
              <h3 className="product-title"><Link to={`/p/${this.props.item.id}/${this.props.item.slug}`} title={this.props.item.name}>{this.props.item.name}</Link></h3>
              <div dangerouslySetInnerHTML={createMarkup(this.props.item.description)}></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="col-sm-3 col-xs-6">
        <div className="product text-center">
          <div className="product-top">
            <Link to={`/p/${this.props.item.id}/${this.props.item.slug}`} title={this.props.item.name}>
              {picture()}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  item: React.PropTypes.object,
  display: React.PropTypes.string
};
Item.defaultProps = {};

export default Item;
