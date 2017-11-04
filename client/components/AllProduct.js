import React from 'react'
import {Link} from 'react-router-dom'


const fakeProducts = [
{ name: 'tuner and hooch', category: 'comedy', description: 'andfgimals tom hanks + dog', photos: 'https://i.ytimg.com/vi/kEJ0VY9jW9E/maxresdefault.jpg', stock: 28, price: 70 },
{ name: 'tuner and sandwhic', category: 'centralfds', description: 'anadfimals tom hanks + dog', photos: 'https://frontrowmovies.net/Actionmovies.jpg', stock: 13, price: 90 },
{ name: 'tuner and bread', category: 'central', description: 'anidmals tom hanks + dog', photos: 'http://img.wennermedia.com/social/rs-180704-AM.jpg', stock: 68, price: 40 },
]

export const AllProduct = () => {

  return (
    <div>
      <h1>All Product List!!!!!!</h1>
      <Link to="/review">Review</Link>
      <hr />
      {
        fakeProducts.map(product => {
          return (
           <div key={product.name}>
             <h1>{product.name}</h1>
             <img src={product.photos} />
             <Link to="/single-product">View </Link> |
             <Link to="/cart"> Add to Cart </Link>  |
           </div>
        )
        })

      }

    </div>
  )
}

//export default AllProduct;

