import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { incrementInDb, addProductToDb } from '../store/order'


const Checkout = (props) => {

  return (
    <div>

      <form  method="post" id="checkout-order-form"onSubmit={() => {alert(' YOUR ORDER HAS BEEN SUBMITTED!!'); }}>
        <h2>Your Details</h2>

        <fieldset id="fieldset-billing">
          <legend>Billing</legend>
          <div>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" data-type="string" data-message="This field cannot be empty" />
          </div>
          <div>
            <label for="email">Email</label>
            <input type="text" name="email" id="email" data-type="expression" data-message="Not a valid email address" />
          </div>
          <div>
            <label for="city">City</label>
            <input type="text" name="city" id="city" data-type="string" data-message="This field cannot be empty" />
          </div>
          <div>
            <label for="address">Address</label>
            <input type="text" name="address" id="address" data-type="string" data-message="This field cannot be empty" />
          </div>
          <div>
            <label for="zip">ZIP Code</label>
            <input type="text" name="zip" id="zip" data-type="string" data-message="This field cannot be empty" />
          </div>
          <div>
            <label for="country">Country</label>
            <select name="country" id="country" data-type="string" data-message="This field cannot be empty">
              <option value="">Select</option>
              <option value="US">USA</option>
              <option value="IT">Italy</option>
            </select>
          </div>
        </fieldset>

        <div id="shipping-same">Same as Billing <input type="checkbox" id="same-as-billing" value=""/></div>

        <fieldset id="fieldset-shipping">

          <legend>Shipping</legend>

          <div>
            <label for="sname">Name</label>
            <input type="text" name="sname" id="sname" data-type="string" data-message="This field cannot be empty" />
          </div>
          <div>
            <label for="semail">Email</label>
            <input type="text" name="semail" id="semail" data-type="expression" data-message="Not a valid email address" />
          </div>
          <div>
            <label for="scity">City</label>
            <input type="text" name="scity" id="scity" data-type="string" data-message="This field cannot be empty" />
          </div>
          <div>
            <label for="saddress">Address</label>
            <input type="text" name="saddress" id="saddress" data-type="string" data-message="This field cannot be empty" />
          </div>
          <div>
            <label for="szip">ZIP Code</label>
            <input type="text" name="szip" id="szip" data-type="string" data-message="This field cannot be empty" />
          </div>
          <div>
            <label for="scountry">Country</label>
            <select name="scountry" id="scountry" data-type="string" data-message="This field cannot be empty">
              <option value="">Select</option>
              <option value="US">USA</option>
              <option value="IT">Italy</option>
            </select>
          </div>
        </fieldset>

        <p><input type="submit" id="submit-order" value="Submit" class="btn" /></p>
      </form>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout))

