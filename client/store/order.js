import axios from 'axios'
const chalk = require('chalk')

//ACTION TYPES
const GET_ORDER = 'GET_ORDER'
const MOD_STATUS = 'MOD_STATUS'
const ADD_PRODUCT = 'ADD_PRODUCT'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const INCREMENT = 'INCREMENT'
// const DECREMENT = 'DECREMENT' // possibly same as increment


//ACTION CREATORS
const getOrder = (order) => ({ type: GET_ORDER, order: order })
const modStatus = (updatedOrder) => ({ type: MOD_STATUS, order: updatedOrder }) // not implemented yet
const addProduct = (order) => ({ type: ADD_PRODUCT, order: order })
// const removeProduct = (order) => ({ type: REMOVE_PRODUCT, order: order })
const increment = (orderItem) => ({ type: INCREMENT, orderItem: orderItem })

//THUNK CREATORS

export function changeStatusDb(userId, status) {
  console.log('status fire')
  return function thunk(dispatch) {
    return axios.put(`api/orders/status/${userId}`, status)
      .then(res => res.data)
      .then(ordered => { // refers to order with status 'ordered' -brian
        dispatch(modStatus(ordered))
      })
  }

}


export function incrementInDb(orderId, productId) {

  return function thunk(dispatch) {
    console.log('running')
    return axios.put(`api/orders/${orderId}/update/${productId}`)
      .then(res => res.data)
      .then(orderItem => {
        dispatch(increment(orderItem))
      })
  }
}

// this is really add ORDER to db since it creates new
export function addProductToDb(userId, productId) {
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

    case ADD_PRODUCT:
      return [...order, action.order]

    case INCREMENT: // replace the orderItem in order array with new one with incremented quantity
      return order.map(item => {
        return (item.id === action.orderItem.productId) ?
          action.orderItem : item
      })

    case MOD_STATUS: // empties cart (sets back to empty array)
      return []

    default:
      return order
  }
}


function magenta(str) {
  console.log(chalk.magenta(str))
}

