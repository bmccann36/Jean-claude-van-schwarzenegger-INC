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
          <NavLink to="/products" >
            <h1>Jean-Claude-Schwarzenegger Online Store</h1>
          </NavLink>
        </div>
        {
            isLoggedIn ?

              <div className="nab-bar">
                {/* The navbar will show these links before you log in */}
                <NavLink to="/products"><span>Products</span></NavLink>
                <NavLink to="/cart"><span>Cart</span></NavLink>
                <NavLink to="/checkout"><span>Checkout</span></NavLink>

                {/* The navbar will show these links after you log in */}
                {/*<div className="product"><NavLink to="/products">PRODUCTS</NavLink></div>*/}
                {/*<NavLink to="/home">Home</NavLink>*/}
                <a href="#" onClick={handleClick}><span>Logout</span></a>
              </div>
                      :
              <div className="nab-bar">
                {/* The navbar will show these links before you log in */}
                <NavLink to="/products"><span>Products</span></NavLink>
                <NavLink to="/login"><span>Login</span></NavLink>
                <NavLink to="/signup"><span>Sign Up</span></NavLink>
                {/*<NavLink to="/cart">*/}
                  {/*<span>Cart</span>*/}
                {/*</NavLink>*/}
              </div>
            }
        <hr />
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
