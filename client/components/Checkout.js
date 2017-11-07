import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { incrementInDb, addProductToDb } from '../store/order'


const Checkout = (props) => {

 // console.log(" order in Checkout.js ", props);

  return (
    <div>

      <h1>Checkout Here!!!!!!!</h1>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    product: state.products,
    order: state.order
  }
}

const mapDispatchToProps = { incrementInDb, addProductToDb }

// call connect function from react-redux, pass it mapState, and invoke with the presentational component (this component itself)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout))
// don't need map dispatch yet because no methods being called

