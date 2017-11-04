import React from 'react'
import {Link} from 'react-router-dom'

export const Cart = () => {

  return (
    <div>
      <Link to="/all-products">All Products</Link>
      <h1>Inside Your Shopping Cart</h1>
      <hr />
      <h1>Cart Empty!!!!!!!</h1>
    </div>
  )
}

//export default Review;

