import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

// import store from '../store'
// import { fetchProducts } from '../store/product'
// import { fetchOrder } from '../store/order'
// import { Link} from 'react-router-dom'


function AllProduct(props) {

  const { products } = props
      console.log('Products,' , products)

  return (
    <div>

      <div className="header">
        <h1>All Products</h1>
      </div>
      <div>
      </div>
          <ul>
            {
              products.length ? products.map(product => (
                  <li className="row" key={product.id}>
                    <NavLink to={`/products/${product.id}`}>
                        <img src={product.photos} className="image"  alt="Image Unavailable"/>
                        <h3>{product.name}</h3>
                    </NavLink>
                  </li>
                ))
                       : <h1>No Products in Stock</h1>
            }
          </ul>
    </div>
  )
}

const mapStateToProps = function (state) {
  return {
    products: state.products  //product Or products
  }
}

export default connect(mapStateToProps)(AllProduct)







// class AllProduct extends Component {
//   constructor(props) {
//     super(props)
//   }
//
//   componentDidMount() {
//     const productsThunk = fetchProducts()
//     store.dispatch(productsThunk)
//     const orderThunk = fetchOrder(1) // hard coding an orderID
//     store.dispatch(orderThunk)
//   }
//
//
//   render() {
//     console.log(this.props, 'the props')
//
//     return (
//       <div>
//         <h1>All Product List!!!!!!</h1>
//         <Link to="/review">Review</Link>
//         <hr />
//         {
//           this.props.product.map(product => {
//             return (
//              <div key={product.name}>
//                <h1>{product.name}</h1>
//                <img src={product.photos} />
//                <Link to="/single-product">View </Link> |
//                <Link to="/cart"> Add to Cart </Link>  |
//               </div>
//           )
//           })
//
//         }
//
//       </div>
//     )
//   }
// }
//
//
// // CONTAINER
//
// const mapStateToProps = (state) => {
//   return {
//     product: state.product,
//     order: state.order
//   }
// }
//
// // call connect function from react-redux, pass it mapState, and invoke with the presentational component (this component itself)
// export default connect(mapStateToProps)(AllProduct)
// // don't need map dispatch yet because no methods being called
//
// //PROP TYPES









