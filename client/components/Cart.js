import React, { Component } from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { incrementInDb, addProductToDb, changeStatusDb } from '../store/order'
import user from "../store/user";


class Cart extends Component {

    constructor(props){
      super(props)

      this.state = {
           details : {}
      }
    }


  componentDidMount() {
    let userId = this.props.user.id;

    axios.get(`/api/orders/detail/${userId}`)
      .then(res=> res.data)
      .then(details => this.setState(details))
  }



   render(){
     console.log('details', this.state)


     let orders = this.props.order;
     let products = this.props.product;

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


       <ul>

    </ul>

      <NavLink to="/checkout">
        <button className="sub-btn"><small>Checkout</small></button>
      </NavLink>


    </div>
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
