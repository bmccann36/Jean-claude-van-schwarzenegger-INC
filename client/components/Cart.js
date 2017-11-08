import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import store from '../store'
import { connect } from 'react-redux'

import  axios  from 'axios'

import { incrementInDb, addProductToDb } from '../store/order'



class Cart extends Component {
  constructor(props) {
    super(props)


  }

  componentWillReceiveProps() {
    console.log(this.props, 'in testCart')
    axios.get('/api/orders/detail/1')
    .then(res=> res.data)
    .then(details => console.log(details[0].products[0], 'details'))
  }

  render() {
    const dummy = this.state
    // console.log(this.props.order)
    // let products
    // let orderItems
    // let newArr = []
    // if (this.props) {
    //   products = this.props.product
    //   orderItems = this.props.order
    // }
    // orderItems.forEach((item, i) => {
    //   newArr[i] = item
    // })
    // orderItems.forEach(orderItem => {
    //   const getDetail = findProduct(products, orderItem.productId)
    //   newObj['details'] = getDetail
    // })


    // orderItems.forEach( orderItem => {
    //   // console.log(orderItem)
    //   const getDetail = findProduct(products, orderItem.productId)
    //   orderItem.details = 'random'
    // })
    // console.log(orderItems[0].details, 'newObj')
    // console.log(newArr, 'newObj')


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
