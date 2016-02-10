import _ from 'lodash';
import React from 'react';
import {createMarkup} from 'utils/functions';
import moment from 'utils/moment';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

moment.locale('nl');
class Item extends React.Component {
  constructor() {
    super();
    this.defaultView = this.defaultView.bind(this);
    this.discount = this.discount.bind(this);
    this.getLink = this.getLink.bind(this);
    this.state = {view: 'x'};
  }

  componentWillMount() {
    this.defaultView();
  }

  getLink() {
    if (_.has(this.props, ['item', 'url']) && _.get(this.props, ['item', 'url']) !== '') {
      return _.get(this.props, ['item', 'url']);
    } else if (_.has(this.props.item, ['affiliate', 'data', 'url_affiliate'])
        && _.get(this.props.item, ['affiliate', 'data', 'url_affiliate']) !== '') {
      return _.get(this.props.item, ['affiliate', 'data', 'url_affiliate']);
    }
    return '/no-url';
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

  render() {
    const accountId = _.get(this.props, ['profile', 'account_id'], '');

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

    const link = (e) => {
      e.preventDefault();
      const profileId = _.get(this.props, ['profile', 'id'], '');
      const affiliateId = _.get(this.props.item, ['id'], '');

      client.get('/accounts/' + profileId + '/click/' + affiliateId);
      const res = this.getLink().replace('#ACCOUNT_ID#', accountId);
      window.open(res);
    };

    const href = () => {
      return this.getLink().replace('#ACCOUNT_ID#', accountId);
    };

    if (this.props.display === 'list') {
      return (
        <div className="col-sm-12 col-xs-12">
          <div className="product text-center">
            <h3><a href={href()} rel="nofollow" onClick={link}>{this.props.item.name}</a></h3>
          </div>
        </div>
      );
    }

    const stop = () => {
      const date = moment(this.props.item.end, 'x');
      return date.format('dddd D MMMM YYYY');
    };

    return (
      <div className="product" onClick={link} >
        <div className="row">
          <div className="col-sm-3">
            <div className="product-top">
              <figure>
                <a href={href()} rel="nofollow" title={this.props.item.affiliate.data.name} onClick={(e) => {e.preventDefault();}}>
                  {picture()}
                </a>
              </figure>
            </div>
          </div>

          <div className="mb20 visible-xs"></div>
          <div className="col-sm-6">
            <h3 className="product-title">
              <a href={href()} rel="nofollow" title={this.props.item.affiliate.data.name} onClick={(e) => {e.preventDefault();}}>
                {this.props.item.affiliate.data.name}
              </a>
            </h3>
            <div dangerouslySetInnerHTML={createMarkup(this.props.item.description)}></div>

          </div>
          <div className="col-sm-3">
            {this.state.view}
            <div>
              <strong>t/m: </strong>
              {stop()}
            </div>
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
