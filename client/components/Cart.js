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


      <div>
        <div id="site">
          <header id="masthead">
            <h1>Inside Your Shopping Cart <span className="tagline"></span></h1>
          </header>
          <div id="content">
            <h1>Your Shopping Cart</h1>
            <form id="shopping-cart" method="post">
              <table className="shopping-cart">
                <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Remove Item</th>
                </tr>
                </thead>
                <tbody>

                {
                  orders.length && orders.map(order=> {
                    return (
                      <tr>
                      <td>{`Item Name`}</td>
                        <td >{order.quantity}</td>
                        <td >{`Price`}</td>
                        <td ><button>X</button></td>
                      </tr>
                    )
                  })
                }

                </tbody>
              </table>
              <p id="sub-total">
                <h2><strong>Sub Total</strong>: $<span id="stotal"></span></h2>
              </p>

            </form>
          </div>
      </div>
      </div>
    </div>
    )}}


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

