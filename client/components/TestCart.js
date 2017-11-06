import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import store from '../store'
import { addProductToDb } from '../store/order'
import { incrementInDb } from '../store/order'


class TestCart extends Component {
  constructor(props) {
    super(props)
    this.handleIncrement = this.handleIncrement.bind(this) // we need this to have access to this components state in the handle submit method, we get orderId from state.order
  }

  handleIncrement(ev) {
    ev.preventDefault()// for now getting the orderId off of the state at 'order' in the future probably better to get it from the userId which we will be storing in state -brian
    const orderId = (this.props.order[0].id)
    const productId = ev.target.productId.value
    const incrementThunk = incrementInDb(orderId, productId)
    store.dispatch(incrementThunk)

  }


  render() {

    return (
      <div>
        {/* <form onSubmit={this.tbd}>
          <hi>change quantity</hi>
          <input placeholder="itemId" type="number" name="itemId" />
          <input placeholder="productId" type="number" name="productId" />
          <button type="submit"> add to cart </button>
        </form> */}

        <form onSubmit={this.handleIncrement}>
          <hi>add another</hi>
          <input placeholder="productId" type="number" defaultValue="1" name="productId" />
          <button type="submit"> add to cart </button>
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

// call connect function from react-redux, pass it mapState, and invoke with the presentational component (this component itself)
export default connect(mapStateToProps)(TestCart)
// don't need map dispatch yet because no methods being called

//PROP TYPES
