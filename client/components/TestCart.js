import React, { Component } from 'react';
import { connect } from 'react-redux'

import store from '../store'
import { incrementInDb, addProductToDb, changeStatusDb } from '../store/order'


class TestCart extends Component {
  constructor(props) {
    super(props)
    this.handleIncrement = this.handleIncrement.bind(this) // we need this to have access to this components state in the handle submit method, we get orderId from state.order
    // console.log(this.props, 'testCart props')
  }

  handleNewItem(ev){
    ev.preventDefault()
    const userId = ev.target.userId.value
    const productId = ev.target.productId.value
    const newItemThunk = addProductToDb(userId, productId)
    store.dispatch(newItemThunk)
  }

  handleIncrement(ev) {
    ev.preventDefault()// for now getting the orderId off of the state at 'order' in the future probably better to get it from the userId which we will be storing in state -brian
    // const orderId = (this.props.order[0].id)
    const productId = ev.target.productId.value
    const incrementThunk = incrementInDb(1, productId) // hard coding orderId for now
    store.dispatch(incrementThunk)

  }

  handleSubmit(ev) {
    ev.preventDefault()
    console.log('you submitted')
    const statusThunk = changeStatusDb(1, { status: 'ordered' })
    store.dispatch(statusThunk)
  }


  render() {
    let products
 if (this.props.order.length) products = this.props.order[0].products // this is how you see products
//  console.log(products)
    return (
      <div>
        <div>
          <h1>submit order</h1>
          <button type="submit" onClick={this.handleSubmit}> submit </button>
        </div>

        <div>
        <form onSubmit={this.handleNewItem}>
          <hi>new item</hi>
          <input placeholder="userId" type="number" defaultValue="1" name="userId" />
          <input placeholder="productId" type="number"  name="productId" />
          <button type="submit"> add item </button>
        </form>

        </div>

        <form onSubmit={this.handleIncrement}>
          <hi>add another</hi>
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
