import React, { Component } from 'react';
import { connect } from 'react-redux'

import store from '../store'
import { incrementInDb, addProductToDb, changeStatusDb, destroyOrderInDb } from '../store/order'


class TestCart extends Component {
  constructor(props) {
    super(props)
    this.handleIncrement = this.handleIncrement.bind(this) // we need this to have access to this components state in the handle submit method, we get orderId from state.order
    // console.log(this.props, 'testCart props')
  }

  handleNewItem(ev) {
    ev.preventDefault()
    const userId = ev.target.userId.value
    const productId = ev.target.productId.value
    const newItemThunk = addProductToDb(userId, productId)
    store.dispatch(newItemThunk)
  }

  handleIncrement(ev) {
    ev.preventDefault()// for now getting the orderId off of the state at 'order' in the future probably better to get it from the userId which we will be storing in state -brian
    // console.log(this.props.order[0].id)
    const orderId = ev.target.orderId.value
    const productId = ev.target.productId.value
    const incrementThunk = incrementInDb(orderId, productId)
    store.dispatch(incrementThunk)

  }

  handleSubmit(ev) {
    ev.preventDefault()
    console.log('you submitted')
    const statusThunk = changeStatusDb(1, { status: 'ordered' })
    store.dispatch(statusThunk)
  }

  handleClear(ev) {
    ev.preventDefault()
    const clearThunk = destroyOrderInDb(ev.target.orderId.value)
    store.dispatch(clearThunk)
  }


  render() {
    let products
    if (this.props.order.length) products = this.props.order[0].products // this is how you see products

    return (
      <div>
        <div>
          <h3>submit order</h3>
          <button type="submit" onClick={this.handleSubmit}> submit </button>
        </div>

        <div>
          <h3>clear cart</h3>
          <form onSubmit={this.handleClear}>
            <input placeholder="orderId" type="number" name="orderId" />
            <button type="submit"> clear cart </button>
          </form>

        </div>

        <div>
          <h3> add order item below </h3>
          <p> don't try changing quantity </p>
          <form onSubmit={this.handleNewItem}>
            <p> user id </p>
            <input placeholder="userId" type="number" defaultValue="1" name="userId" />
            <p> product id </p>
            <input placeholder="productId" type="number" name="productId" />
            <button type="submit"> add item </button>
          </form>

        </div>
        <h3> increment item quantity below </h3>

        <form onSubmit={this.handleIncrement}>
          <p> order id </p>
          <input placeholder="orderId" type="number" defaultValue="1" name="orderId" />
          <p> product id </p>
          <input placeholder="productId" type="number" defaultValue="1" name="productId" />
          <button type="submit"> add another </button>
        </form>


      </div>
    )
  }
}


// CONTAINER

const mapStateToProps = (state) => {
  return {
    // product: state.product,
    order: state.order
  }
}

const mapDispatchToProps = { incrementInDb, addProductToDb }

// call connect function from react-redux, pass it mapState, and invoke with the presentational component (this component itself)
export default connect(mapStateToProps, mapDispatchToProps)(TestCart)
// don't need map dispatch yet because no methods being called

//PROP TYPES
