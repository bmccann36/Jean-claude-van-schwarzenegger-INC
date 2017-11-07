import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'
import { incrementInDb, addProductToDb, changeStatusDb } from '../store/order'


 const Cart = (props) => {
  console.log("in cart", store.getState(), 'STATE *****', store.getState())
  return (
    <div>
      <h1>Inside Your Shopping Cart</h1>
      <hr />
      <h1>Cart Empty!!!!!!!</h1>

      {/*<NavLink to="/products">*/}
         {/*<button onClick={() => alert('Order Successfully Submitted')}>Checkout As Guest</button>*/}
      {/*</NavLink>*/}

      <NavLink to="/login">
        <button>Checkout As User</button>
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

