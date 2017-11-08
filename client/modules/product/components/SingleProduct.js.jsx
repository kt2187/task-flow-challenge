/**
 * Displays a single product from the 'byId' map in the product reducer
 * as defined by the 'selected' property
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as productActions from '../productActions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import layout
import ProductLayout from './ProductLayout.js.jsx';

class SingleProduct extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(productActions.fetchSingleIfNeeded(match.params.productId));
  }

  render() {
    const { productStore } = this.props;

    /**
     * use the selected.getItem() utility to pull the actual product object from the map
     */
    const selectedProduct = productStore.selected.getItem();

    const isEmpty = (
      !selectedProduct
      || !selectedProduct._id
      || productStore.selected.didInvalidate
    );

    return (
      <ProductLayout>
        <div className="flex">
          <section className="section">
            <div className="yt-container">
              <h3> Single Product </h3>
              {isEmpty ?
                (productStore.selected.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                :
                <div style={{ opacity: productStore.selected.isFetching ? 0.5 : 1 }}>
                  <h1> { selectedProduct.title }
                    <Link className="yt-btn small u-pullRight" to={`${this.props.match.url}/update`}> UPDATE PRODUCT </Link>
                  </h1>
                  <hr/>
                  <p> {selectedProduct.description }</p>
                </div>
              }
            </div>
          </section>
        </div>
    </ProductLayout>
    )
  }
}

SingleProduct.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    productStore: store.product
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(SingleProduct)
);
