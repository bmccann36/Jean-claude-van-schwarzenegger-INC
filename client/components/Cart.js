import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { changeOrderStatus  } from '../store/order'


class Cart extends Component {
  constructor() {
    super()
    this.state = {details:[]}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log(this.props.user, 'in cart')
    const userId = this.props.user.id
    axios.get(`/api/orders/detail/${userId}`)
      .then(res => res.data)
      .then(details => {
        console.log(details, 'details')
        this.setState({details: details})
      })
      // console.log(this.state, 'state')
  }

  handleSubmit(ev){
    ev.preventDefault()
    const userId = this.props.user.id
    const statusThunk = changeStatusDb(userId, { status: 'ordered' })
    store.dispatch(statusThunk)
    alert("you're order has been placed, get to da choppa!!")
  }

  render() {
    const detail = this.state.details
    let price = 0
    return (
      <div>
        <table>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>UNIT PRICE</th>
          </tr>


        {
          detail.length && detail.map(d => (
               //console.log('details', d)
                d.products.map(product =>{
                price += (product.price * product.orderProduct.quantity)

                return (

                  <tr>
                    <td>{product.name}</td>
                    <td>{product.orderProduct.quantity}</td>
                    <td>{product.price}</td>
                  </tr>
          )})

          ))
        }

      </table>

        <p id="sub-total">
          <strong>Sub Total</strong>: ${price} <span id="stotal"></span>
        </p>

  <NavLink to="/products">
    <button className="sub-btn" onClick={this.handleSubmit}>
    <small>Checkout</small></button>
  </NavLink>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

    order: state.order,
    user: state.user
  }
}

const mapDispatchToProps = { changeOrderStatus }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))


