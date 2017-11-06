import axios from 'axios'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'

// ACTION CREATORS
const loadProducts = (products) => ({ type: GET_PRODUCTS, products })

//THUNK CREATORS

export function fetchProducts() {

  return function thunk(dispatch) {
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        const action = loadProducts(products)
        dispatch(action)
      })
  }

}


//REDUCER

export default function (state = [], action) {
  switch (action.type) {

    case GET_PRODUCTS:
      return action.products

    default:
      return state
  }
}
