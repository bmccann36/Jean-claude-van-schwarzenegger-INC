import React from 'react'
import {NavLink} from 'react-router-dom'

export const Cart = () => {

  return (
    <div>
      <h1>Inside Your Shopping Cart</h1>
      <hr />
      <h1>Cart Empty!!!!!!!</h1>

      <NavLink to="/products">
         <button onClick={() => alert('Order Successfully Submitted')}>Checkout As Guest</button>
      </NavLink>

      <NavLink to="/login">
        <button>Checkout As User</button>
      </NavLink>


    </div>
  )
}

export default Cart;

