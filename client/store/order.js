import axios from 'axios'
const chalk = require('chalk')

//ACTION TYPES
const GET_ORDER = 'GET_ORDER'
const MOD_STATUS = 'MOD_STATUS'
const ADD_PRODUCT = 'ADD_PRODUCT'

//ACTION CREATORS
const getOrder = (order) => ({ type: GET_ORDER, order: order })
const modStatus = (updatedOrder) => ({ type: MOD_STATUS, order: updatedOrder })
const addProduct = (order) => ({ type: ADD_PRODUCT, order: order })

//THUNK CREATORS
export function addProductToDb(userId, productId) {
  //console.log('order', `/api/orders/${userId}/add/${productId}`)

  return function thunk(dispatch) {
    return axios.put(`/api/orders/${userId}/add/${productId}`)
      .then(res => res.data)
      .then(order => {
        dispatch(addProduct(order))
      })
  }
}


export function fetchOrder(orderId) {
  return function thunk(dispatch) {
    return axios.get(`api/orders/${orderId}`)
      .then(res => res.data)
      .then(order => {
        dispatch(getOrder(order))
      })
  }
}
// I think this one func can take care of all our order changing needs
// i.e swtiching status will it also handle quantity update?
export function changeOrderStatus(orderId, status) {
  return function thunk(dispatch) {
    return axios.post(`api/orders/${orderId}`, status)
      .then(res => res.data)
      .then(updatedOrder => {
        dispatch(modStatus(updatedOrder)) // we may want to dispatch first and eager load
      })
  }
}


// REDUCER

export default function (order = [], action) {
  switch (action.type) {

    case GET_ORDER:
      return action.order

    case MOD_STATUS:
      return action.order

    case ADD_PRODUCT:  // map over and replace if matching productID
      let replaced = false
      let newState = order.map(item => {
        if (item.productId == action.order.productId) {
          replaced = true
          console.log('replaced', replaced)
          return action.order
        }
        else {return item}
      })
      // actual return
      if (!replaced) { // if no replace add new product to order
        console.log('not replaced')
        return [...order, action.order]
      }

      else {return newState}

    default:
      return order
  }
}


function magenta(str) {
  console.log(chalk.magenta(str))
}
