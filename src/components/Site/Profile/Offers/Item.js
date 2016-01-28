import _ from 'lodash';
import React from 'react';
import {createMarkup} from 'utils/functions';
import moment from 'utils/moment';
moment.locale('nl');
class Item extends React.Component {
  constructor() {
    super();
    this.defaultView = this.defaultView.bind(this);
    this.discount = this.discount.bind(this);
    this.link = this.link.bind(this);
    this.state = {view: 'x'};
  }

  componentWillMount() {
    this.defaultView();
  }

  defaultView() {
    this.setState({view: this.discount()});
  }

  discount() {
    return (
      <div>
        <button className="btn btn-custom2 btn-block">Winkelen</button>
      </div>
    );
  }

  link() {
    if (_.get(this.props.item, 'url_affiliate') === '') {
      alert('Helaas kunt u tijdelijk niet bij deze site bestellen. ');
    } else {

      const affiliateUrl = _.get(this.props.item, ['affiliate', 'data', 'url_affiliate']);
      const res = affiliateUrl.replace('#ACCOUNT_ID#', _.get(this.props, ['profile', 'id']));
      window.open(res);
    }
  }

  render() {
    const picture = () => {
      if (_.has(this.props.item, 'picture.data[0].file_name')) {
        const img = _.get(this.props.item, 'picture.data[0]');
        return <img src={'/image/268x332/' + img.file_name} alt={this.props.item.name} className="img-responsive"/>;
      } else if (_.has(this.props.item, 'affiliate.data.picture.data[0].file_name')) {
        const img = _.get(this.props.item, 'affiliate.data.picture.data[0]');
        return <img src={'/image/268x332/' + img.file_name} alt={this.props.item.name} className="img-responsive"/>;
      }
      return (<img src={'https://placehold.it/400x200&text=' + encodeURIComponent(this.props.item.name)}
                  className="img-responsive"/>);
    };

    const link = () => {
      if (_.get(this.props.item, 'url_affiliate') === '') {
        alert('Helaas kunt u tijdelijk niet bij deze site bestellen. ');
      } else {

        const affiliateUrl = _.get(this.props.item, ['affiliate', 'data', 'url_affiliate']);
        const res = affiliateUrl.replace('#ACCOUNT_ID#', _.get(this.props, ['profile', 'id']));
        window.open(res);
      }
    };

    if (this.props.display === 'list') {
      return (
        <div className="col-sm-12 col-xs-12">
          <div className="product text-center">
            <h3><a href="#" onClick={link}>{this.props.item.name}</a></h3>
          </div>
        </div>
      );
    }

    const start = () => {
      const date = moment(this.props.item.start, 'x');
      return date.format('dddd D MMMM YYYY');
    };

    const stop = () => {
      const date = moment(this.props.item.end, 'x');
      return date.format('dddd D MMMM YYYY');
    };

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

            <h3 className="product-title"><a href="product.html" title="Product Title">{this.props.item.affiliate.data.name}</a></h3>
            <div dangerouslySetInnerHTML={createMarkup(this.props.item.description)}></div>
            <div>
              <strong>vanaf </strong>
              {start()}
              </div><div>
              <strong>tot </strong>
              {stop()}
            </div>
          </div>
          <div className="col-sm-3">
            {this.state.view}
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  item: React.PropTypes.object,
  profile: React.PropTypes.object,
  display: React.PropTypes.string
};
Item.defaultProps = {};

export default Item;