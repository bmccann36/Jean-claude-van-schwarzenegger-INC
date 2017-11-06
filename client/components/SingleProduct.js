import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'

function SingleProduct(props) {

  const { products } = props;
    // console.log('props', props);
   const productId = Number(props.match.params.productId);
    const singleProduct = products.filter(product => product.id === productId);
       //console.log('Single Product', singleProduct[0].name)
    return (
        <div>
          {/*<h1>{singleProduct[0].name}</h1>*/}
          <img src={singleProduct.photos} alt="Image Unavailable"/>
          <p>Description Goes Here!</p>
          <h1>Category goes here:</h1>
          <h1>Stocks goes here:</h1>
          <h1>Price:</h1>

          <NavLink to="/cart">
             <button >Add To Cart</button>
          </NavLink>

        </div>
      )
 // }
}

const mapStateToProps = function (state) {
  return {
    products: state.products  //product Or products  ????
  }
}
export default connect(mapStateToProps)(SingleProduct);

