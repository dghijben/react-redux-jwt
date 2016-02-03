import _ from 'lodash';
import React from 'react';
import {createMarkup} from 'utils/functions';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

class ImageItem extends React.Component {
  render() {
    const picture = () => {
      if (_.has(this.props.item, 'picture.data[0].file_name')) {
        const img = _.get(this.props.item, 'picture.data[0]');
        return <img src={'/image/268x332/' + img.file_name} alt={this.props.item.name} className="img-responsive"/>;
      }
      return <img src={'https://placehold.it/400x200&text=' + encodeURIComponent(this.props.item.name)} className="img-responsive" />;
    };

    const link = (e) => {
      e.preventDefault();
      const profileId = _.get(this.props, ['profile', 'id'], '');
      const affiliateId = _.get(this.props.item, ['id'], '');

      if (_.get(this.props.item, 'url_affiliate') === '') {
        alert('Helaas kunt u tijdelijk niet bij deze site bestellen. ');
      } else {
        client.get('/accounts/' + profileId + '/click/' + affiliateId);
        const affiliateUrl = _.get(this.props.item, 'url_affiliate', '');
        const res = affiliateUrl.replace('#ACCOUNT_ID#', profileId);
        Window.open(res);
      }
    };

    const href = () => {
      const affiliateUrl = _.get(this.props.item, 'url_affiliate');
      return affiliateUrl.replace('#ACCOUNT_ID#', this.props.profile.id);
    };

    if (this.props.display === 'list') {
      return (
        <div className="product">
          <div className="row" onClick={link} role="link">
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
                <h3 className="product-title"><a href={href()} title={this.props.item.name} rel="nofollow">{this.props.item.name}</a></h3>
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
            <a href={href()} onClick={link} title={this.props.item.name} rel="nofollow">
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
