import React from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom';

function AllProduct(props) {

  const { products } = props
      //console.log('Products,' , products)

  return (
    <ul>
    <div>

      <div className="header">
        <h1>All Products</h1>
      </div>
      <div>
      </div>
            {
              products.length && products.map(product => (
                  <li className="row" key={product.id}>
                    <NavLink to={`/products/${product.id}`}>
                        <img src={product.photos} className="image"  alt="Image Unavailable"/>
                        <h3>{product.name}</h3>
                    </NavLink>
                  </li>
                ))
            }

    </div>
    </ul>
  )
}

const mapStateToProps = function (state) {
  return {
    products: state.products,  //product Or products  ???
    order: state.order
  }
}

export default withRouter(connect(mapStateToProps)(AllProduct))













