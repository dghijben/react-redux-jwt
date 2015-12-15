import _ from 'lodash';
import React, {PropTypes} from 'react';
import {reducerIndex, reducerKey, reducerKeyCats, searchFields} from './settings';
import {load} from 'redux/modules/store/actions';
import {mapDispatchToProps, filterFields, createParamsForFetch} from 'utils/functions';
import { connect } from 'react-redux';
const fieldNames = filterFields(searchFields);

@connect(state=> {
  const obj = {
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)
class Affiliates extends React.Component {
  static propTypes = {
    'account': PropTypes.object,
    'store': PropTypes.object,
  };

  constructor() {
    super();
    this.categories = this.categories.bind(this);
    this.category = this.category.bind(this);
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const apiPath = '/dashboard/settings/' + state.router.params.id + '/affiliates';
    const apiPathCats = '/dashboard/settings/' + state.router.params.id + '/affiliates/categories';
    const promise = [];
    promise.push(dispatch(load(reducerKey, apiPath, createParamsForFetch(getState(), reducerIndex, fieldNames))));
    promise.push(dispatch(load(reducerKeyCats, apiPathCats)));
    return Promise.all(promise);
  }

  site() {

    return (
      <div className="col-sm-4">
        <div className="product text-center">
          <div className="product-top">
            <span className="product-box new-box new-box-border">New</span>
            <figure>
              <a href="product.html" title="Product Name">
                <img src="http://lorempixel.com/800/600/cats/" alt="Product image" className="product-image"/>
                <img src="http://lorempixel.com/800/600/nature/" alt="Product image" className="product-image-hover"/>
              </a>
            </figure>
            <div className="product-action-container each-btn-animate">
              <a href="#" className="btn btn-dark add-to-favorite" title="Add to favorite"><i
                className="fa fa-heart"></i></a>

              <a href="#" className="btn btn-dark add-to-wishlist" title="Add to wishlist"><i
                className="fa fa-gift"></i></a>

              <a href="#" className="btn btn-dark quick-view" title="Quick View"><i
                className="fa fa-search-plus"></i></a>
            </div>
          </div>
          <h3 className="product-title"><a href="product.html" title="Product Title">Clear - New Season Shirt</a></h3>

          <div className="product-price-container">
            <span className="product-old-price">$125.99</span>
            <span className="product-price">$49.99</span>
          </div>

          <a href="#" className="btn btn-custom add-to-cart">Add to Cart</a>
        </div>
      </div>
    );
  }

  categories() {
    const {store: {categories: {list}}} = this.props;
    console.log('MANGO', list);

    if (list.length > 0) {
      return (
        <ul>
          {_.map(list, (category, key) => {
            return this.category(key, category);
          })}
        </ul>
      );
    }
  }

  category(key, category) {
    return (
      <li key={key}>
        <i className="fa fa-square-o pull-right"></i>
        <i className="fa fa-angle-right"></i>
        {' '}
        {category.name}
      </li>
    );
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-md-push-3">
            {this.site()}
          </div>

          <aside className="col-md-3 col-md-pull-9 sidebar">
            <div className="widget">
              <h3>Categories</h3>
              <ul id="category-widget">
                <li className="open"><a href="#">Categorieen <span className="category-widget-btn"></span></a>
                  {this.categories()}
                </li>
                <li className="open"><a href="#">Abonnee <span className="category-widget-btn"></span></a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}

export default Affiliates;
