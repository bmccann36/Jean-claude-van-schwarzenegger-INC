import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { incrementInDb, addProductToDb, changeQuantInDb } from '../store/order'

import store from '../store'

class SingleProduct extends Component {

  constructor(props) {
    super(props);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.handleQuant = this.handleQuant.bind(this)
  }

  handleQuant(ev) {
    ev.preventDefault()
    // console.log(this.props)
    const orderId = this.props.order[0].orderId
    console.log(orderId)
    const productId = this.props.match.params.productId
    const quant = { quantity: ev.target.quant.value }
    // console.log(orderId, productId, quant, 'info in quant')
    const quantThunk = changeQuantInDb(orderId, productId, quant)
    store.dispatch(quantThunk)

  }

  handleNewItem(ev) {
    ev.preventDefault()
    // console.log(this.props.user.id, 'in handle')
    const productId = Number(this.props.match.params.productId)
    const userId = this.props.user.id
    const newItemThunk = addProductToDb(userId, productId)
    store.dispatch(newItemThunk)
    alert('ITEM ADDED TO CART');
  }

  render() {

    const { products } = this.props;
    const productId = Number(this.props.match.params.productId);
    const singleProduct = products.filter(product => product.id === productId);

    // console.log('RETURNED ORDER ********', store.getState())

    return (
      <div>
        {
          !singleProduct.length ?
            <h1>`No Product`</h1>
            :
            <div>
              <h1>{singleProduct[0].name}</h1>
              <img src={singleProduct[0].photos} alt="Image Unavailable" />
              <h1>{`Description: ${singleProduct[0].description}`}</h1>
              <h1>{`Category: ${singleProduct[0].category}`}</h1>
              <h1>{`Stocks: ${singleProduct[0].price}`}</h1>
              <h1>{`Price: $ ${singleProduct[0].price}`}</h1>
            </div>
        }
        <NavLink to="/cart" >
          <button className="sub-btn" type="submit" onClick={this.handleNewItem}>Add To Cart</button>
        </NavLink>
        {this.props.order.length &&
          <div>
            <h3> changeQuantity </h3>
            <form onSubmit={this.handleQuant}>
              <input type="number" placeholder="quantity" name="quant" />
              <button type="submit"> change </button>
            </form>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    products: state.products,  //product Or products  ????
    order: state.order,
    user: state.user
  }
}

const mapDispatchToProps = { addProductToDb, changeQuantInDb }


export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

