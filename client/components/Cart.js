import React  from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { incrementInDb, adddetailToDb } from '../store/order'


function Cart (props) {
  let price = 0;
  const { detail }  = props;

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

const mapStateToProps = (state) => {
  return {

    order: state.order,
    user: state.user,
    detail: state.detail
  }
}

const mapDispatchToProps = { incrementInDb, adddetailToDb }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))

//
// function finddetail(details, detailId) {
//   return details.filter(detail => detailId === detail.id)
// }

