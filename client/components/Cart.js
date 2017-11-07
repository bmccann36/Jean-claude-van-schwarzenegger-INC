import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import store from '../store'
import { connect } from 'react-redux'

import { incrementInDb, addProductToDb } from '../store/order'



class Cart extends Component {
  constructor(props) {
    super(props)

  }


  render() {
    let products
    let orderItems
    if (this.props) {
      products = this.props.product
      orderItems = this.props.order
    }
  orderItems.forEach( orderItem => {
    const getDetail = findProduct(products, orderItem.productId)
    orderItem.details = getDetail[0]
  })
  console.log(orderItems, 'orderItems')

    return (

      <div>
        {/* <ul> */}
        {/*{*/}
        {/*orders.length && orders.map(order=> {*/}
        {/*return (*/}
        {/*<h1 key={order.productId}>{order.quantity}</h1>*/}
        {/*)*/}
        {/*})*/}
        {/*}*/}
        {/*</ul>*/}

        {/* <NavLink to="/checkout">
        <button className="sub-btn"><small>Checkout</small></button>
      </NavLink> */}
        <h1> HELLO </h1>

      </div>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    product: state.products,
    order: state.order,
    user: state.user
  }
}

const mapDispatchToProps = { incrementInDb, addProductToDb }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))




function findProduct(products, productId) {
  return products.filter(product => productId === product.id)
}
