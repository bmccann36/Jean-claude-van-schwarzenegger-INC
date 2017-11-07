import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'

import { incrementInDb, addProductToDb, changeStatusDb } from '../store/order'

import store from '../store'

class SingleProduct extends Component {

   constructor(props){
     super(props);

     this.handleNewItem = this.handleNewItem.bind(this);
   }

  handleNewItem(ev, productId) {
    const id = Number(this.props.match.params.productId);
    ev.preventDefault()
    //const userId = ev.target.userId.value
    //const productId = ev.target.productId.value
    const newItemThunk = addProductToDb(1, id)
    store.dispatch(newItemThunk)
  }
  //
  // handleIncrement(ev) {
  //   ev.preventDefault()// for now getting the orderId off of the state at 'order' in the future probably better to get it from the userId which we will be storing in state -brian
  //   // console.log(this.props.order[0].id)
  //   const orderId = ev.target.orderId.value
  //   const productId = ev.target.productId.value
  //   const incrementThunk = incrementInDb(orderId, productId)
  //   store.dispatch(incrementThunk)
  //
  // }
  //
  // handleSubmit(ev) {
  //   ev.preventDefault()
  //   console.log('you submitted')
  //   const statusThunk = changeStatusDb(1, { status: 'ordered' })
  //   store.dispatch(statusThunk)
  // }



    render(){

      const { products } = this.props;
      const productId = Number(this.props.match.params.productId);

      const singleProduct = products.filter(product => product.id === productId);

            //console.log('productId ', productId)

          return (
            <div>
              {
                !singleProduct.length ?
                  <h1>`No Product`</h1>
                  :
                  <div>
                    <h1>{singleProduct[0].name}</h1>
                    <img src={singleProduct[0].photos} alt="Image Unavailable"/>
                    <h1>{`Description: ${singleProduct[0].description}`}</h1>
                    <h1>{`Category: ${singleProduct[0].category}`}</h1>
                    <h1>{`Stocks: ${singleProduct[0].price}`}</h1>
                    <h1>{`Price: $ ${singleProduct[0].price}`}</h1>
                  </div>
              }
              <NavLink to="/cart" >
                <button className="sub-btn" type="submit" onClick={this.handleNewItem}>Add To Cart</button>
              </NavLink>
            </div>
          )
     }
}

const mapStateToProps = function (state) {
  return {
    products: state.products,  //product Or products  ????
    order: state.order,
  }
}

const mapDispatchToProps = { addProductToDb }


export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

