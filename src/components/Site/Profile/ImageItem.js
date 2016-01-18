import _ from 'lodash';
import React from 'react';

class ImageItem extends React.Component {
  render() {
    const picture = () => {
      if (_.has(this.props.item, 'picture.data[0].file_name')) {
        const img = _.get(this.props.item, 'picture.data[0]');
        return <img src={'/image/268x332/' + img.file_name} alt={this.props.item.name} className="img-responsive"/>;
      }
      return <img src={'https://placehold.it/400x200&text=' + encodeURIComponent(this.props.item.name)} className="img-responsive" />;
    };

    const link = () => {
      if (_.get(this.props.item, 'url_affiliate') === '') {
        alert('Helaas kunt u tijdelijk niet bij deze site bestellen. ');
      } else {

        const affiliateUrl = _.get(this.props.item, 'url_affiliate');
        const res = affiliateUrl.replace('#ACCOUNT_ID#', _.get(this.props, ['profile', 'id']));
        window.open(res);
      }
    };


    if (this.props.display === 'list') {
      return (
        <div className="col-sm-12 col-xs-12">
          <div className="product text-center">
            <h3><a href="#" onClick={link} >{this.props.item.name}</a></h3>
          </div>
        </div>
      );
    }

    return (
      <div className="col-sm-3 col-xs-6">
        <div className="product text-center">
          <div className="product-top">
            <a href="product.html" title={this.props.item.name}>
              {picture()}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ImageItem.propTypes = {
  item: React.PropTypes.object,
  profile: React.PropTypes.object,
  display: React.PropTypes.string
};
ImageItem.defaultProps = {};

export default ImageItem;
