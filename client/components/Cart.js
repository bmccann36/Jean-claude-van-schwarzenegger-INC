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

      let userId = this.props.user.id

    axios.get(`/api/orders/detail/${userId}`)
      .then(res=> res.data)
      .then(details => this.setState(details))

  }


   render(){
     const  detail  = this.state
     //let details = this.state.details.length && this.state['0'].products
     console.log('details', detail);

     let orders = this.props.order;
     let products = this.props.product;

   return (

    <div>
       {/*<ul>*/}
      {/*{*/}
        {/*orders.length && orders.map(order=> {*/}
          {/*return (*/}
            {/*<h1 key={order.productId}>{order.quantity}</h1>*/}
          {/*)*/}
        {/*})*/}
      {/*}*/}
    {/*</ul>*/}

      <NavLink to="/checkout">
        <button className="sub-btn"><small>Checkout</small></button>
      </NavLink>


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

// call connect function from react-redux, pass it mapState, and invoke with the presentational component (this component itself)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
// don't need map dispatch yet because no methods being called

