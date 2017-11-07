import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'
import { incrementInDb, addProductToDb, changeStatusDb } from '../store/order'


 const Cart = (props) => {

 // console.log(" order in cart.js ", props);

  return (
    <div>

      <h1>Cart Empty!!!!!!!</h1>

      <NavLink to="/checkout">
        <button className="sub-btn"><small>Checkout</small></button>
      </NavLink>


    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    product: state.products,
    order: state.order
  }
}

const mapDispatchToProps = { incrementInDb, addProductToDb }

// call connect function from react-redux, pass it mapState, and invoke with the presentational component (this component itself)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
// don't need map dispatch yet because no methods being called

