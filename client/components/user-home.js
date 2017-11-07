import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props
        //console.log('props', props)
  return (
    <div>
      <h1>Welcome, {email}!</h1>

      <NavLink to="/products"><span><h2 className="sub-btn">Start Shopping</h2></span></NavLink>

    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
