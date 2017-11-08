import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { incrementInDb, adddetailToDb } from '../store/order'


class Cart extends Component {
  constructor() {
    super()
    this.state = {details:[]}
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

  <NavLink to="/checkout">
    <button className="sub-btn"><small>Checkout</small></button>
  </NavLink>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

    order: state.order,
    user: state.user,
    detail: state.detail
  }
}

const mapDispatchToProps = { incrementInDb, adddetailToDb }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))


