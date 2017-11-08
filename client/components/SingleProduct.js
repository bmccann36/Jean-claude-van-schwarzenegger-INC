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

  handleNewItem(ev) {
    ev.preventDefault()
    // console.log('WHEN IS THIS LOGGING???')
    const userId = store.getState().user.id
    const id = Number(this.props.match.params.productId)
    const newItemThunk = addProductToDb(userId, id)
    store.dispatch(newItemThunk)
  }

    render(){

      const { products } = this.props;
      const productId = Number(this.props.match.params.productId);
      const singleProduct = products.filter(product => product.id === productId);
      console.log('RETURNED ORDER ********', store.getState())
      
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

