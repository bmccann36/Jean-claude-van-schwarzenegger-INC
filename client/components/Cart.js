import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'
import { incrementInDb, addProductToDb, changeStatusDb } from '../store/order'


 const Cart = (props) => {


   let orders = props.order;
   let products = props.product;
   //let name;
   //console.log(" order in cart.js ", props);
   //console.log(" order ", orders);
  // console.log(" product ", products);



   return (

    <div>
       <ul>
      {
        orders.length && orders.map(order, i => {

        let name = (products.filter(product => ( product.id === order.orderId)))[i].name
           console.log('name', name)
          return (
            <h1 key={order.productId}>{order.quantity}</h1>
          )
        })
        }
     </ul>

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

