import _ from 'lodash';
import React from 'react';

class ImageItem extends React.Component {
  render() {
    const picture = () => {
      if (_.has(this.props.item, 'picture.data[0].file_name')) {
        const img = _.get(this.props.item, 'picture.data[0]');
        return <img src={'/image/268x332/' + img.file_name} alt={this.props.item.name} className="img-responsive"/>;
      }
      return <img src={'https://placehold.it/262x262&text=' + encodeURIComponent(this.props.item.name)} className="img-responsive" />;
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

    return (
      <div className="col-sm-3 col-xs-6">
        <div className="product text-center">
          <div className="product-top">
            <a href="product.html" title={this.props.item.name}>
              {picture()}
            </a>
          </div>
          <h2 className="title mb30">{this.props.item.name}</h2>
          <a href="#" onClick={link} className="btn btn-custom add-to-cart">Winkelen</a>
        </div>
      </div>
    );
  }
}

ImageItem.propTypes = {
  item: React.PropTypes.object,
  profile: React.PropTypes.object
};
ImageItem.defaultProps = {};

export default ImageItem;
