import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom';

import store from '../store'
import { fetchOrder } from '../store/order'
import { fetchProducts } from '../store'
/**
 * COMPONENT
 */
// export const UserHome = (props) => {
//   const { email } = props
//         //console.log('props', props)
//   return (
//     <div>
//       <h1>Welcome, {email}!</h1>

//       <NavLink to="/products"><span><h2 className="sub-btn">Start Shopping</h2></span></NavLink>

//     </div>
//   )
// }

export class UserHome extends Component {
  constructor(props){
    super(props);

  }

  componentDidMount () {
    const userId = this.props.user.id
    // console.log(userId, 'in user home')

    const orderThunk = fetchOrder(userId) // takes userId
    store.dispatch(orderThunk)
  }

  render (){
        return (<div>
          <h1>Welcome, {this.props.email}!</h1>

          <NavLink to="/products"><span><h2 className="sub-btn">Start Shopping</h2></span></NavLink>

        </div>)
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    order: state.order
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
