import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import {logout} from '../store'



function NavBar(props) {

  const { handleClick, isLoggedIn } = props;

  return (
    <nav>
      <div>
        <img id="vhs" src="https://i.pinimg.com/736x/c6/d6/b5/c6d6b55a95d6e2c2fb01b77ba247b365--s-aesthetic-s-theme.jpg" />
        <NavLink to="/products" >
          <h1>Jean-Claude-Van-Schwarzenegger INC</h1>
        </NavLink>
        <img id="rad" src="https://i.pinimg.com/736x/c0/e3/20/c0e3205ed6ce85ad1f92f22e5ea41623--s-design-graphic-s-logo-design.jpg" />
      </div>
      {
        isLoggedIn
          ?
          <div className="nav-bar">
            {/* The navbar will show these links after you log in */}
            <NavLink to="/products"><span>Products</span></NavLink>
            <NavLink to="/home"><span>Home</span></NavLink>
            <a href="#" onClick={handleClick}><span>Logout</span></a>
            <NavLink to="/cart"><span>Cart</span></NavLink>
          </div>
          :
          <div className="nav-bar">
            {/* The navbar will show these links before you log in */}
            <NavLink to="/products"><span>Products</span></NavLink>
            <NavLink to="/login"><span>Login</span></NavLink>
            <NavLink to="/signup"><span>Sign Up</span></NavLink>
            <NavLink to="/cart"><span>Cart</span></NavLink>
          </div>
      }
      <hr/>
    </nav>
  )
}



/**
 * CONTAINER
 */
const mapState = (state) => ({
  isLoggedIn: !!state.user.id
});

const mapDispatch = (dispatch) => ({
  handleClick () {
    dispatch(logout());
  }
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(NavBar));

/**
 * PROP TYPES
 */
NavBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
