import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, Review, Cart, SingleProduct} from './components'

import store, {me} from './store'
import { fetchOrder } from './store/order'
import { fetchProducts } from './store/product'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    const productsThunk = fetchProducts()
    store.dispatch(productsThunk)
    const orderThunk = fetchOrder(1) // hard coding an orderID
    store.dispatch(orderThunk)
    this.props.loadInitialData()
  }



  render () {
    const {isLoggedIn} = this.props
    // console.log(this.props, 'in routes')

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/review" component={Review} />
            <Route path="/single-product" component={SingleProduct} />
            <Route path="/cart" component={Cart} />

            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    product: state.product,
    order: state.order
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
