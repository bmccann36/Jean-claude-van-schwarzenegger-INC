import axios from 'axios'
const chalk = require('chalk')

//ACTION TYPES
const GET_ORDER = 'GET_ORDER'
const MOD_STATUS = 'MOD_STATUS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const CHANGE_QUANT = 'CHANGE_QUANT'
const CLEAR = 'CLEAR'
const DECREMENT = 'DECREMENT' // possibly same as CHANGE_QUANT
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

//ACTION CREATORS
const getOrder = (orderItems) => ({ type: GET_ORDER, orderItems: orderItems })
const modStatus = (updatedOrder) => ({ type: MOD_STATUS, order: updatedOrder }) // use this for clear as well
const addProduct = (order) => ({ type: ADD_PRODUCT, order: order })
const changeQuant = (orderItem) => ({ type: CHANGE_QUANT, orderItem: orderItem })
// const decrement = (orderItem) => ({ type: DECREMENT, order: orderItem })
// const removeProduct = (order) => ({ type: REMOVE_PRODUCT, order: order })

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


export function changeQuantInDb(orderId, productId, quant) {
  console.log(orderId, productId, quant, "info here!!")
  return function thunk(dispatch) {
    console.log('running')
    return axios.put(`api/orders/${orderId}/update/${productId}`, quant)
      .then(res => res.data)
      .then(orderItem => {
        dispatch(changeQuant(orderItem))
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

// looks for pending orders return order items from OrderProduct
export function fetchOrder(userId) {
  console.log(`/api/orders/user/${userId}`)
  return function thunk(dispatch) {
    return axios.get(`/api/orders/user/${userId}`)
      .then(res => res.data)
      .then(orderItems => {
        console.log(orderItems.length)
        if (orderItems.length) dispatch(getOrder(orderItems))
        else console.log('no dispatch')
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
// delete an entire order
export function destroyOrderInDb(orderId) {
  return function thunk(dispatch) {
    return axios.delete(`api/orders/${orderId}`)
      .then(res => res.data)
      .then(() => {
        dispatch(modStatus())
      })
  }
}


// REDUCER

export default function (order = [], action) {

  switch (action.type) {

    case GET_ORDER:
      return action.orderItems

    case ADD_PRODUCT:
      return [...order, action.order]

    case CHANGE_QUANT: // replace the orderItem in order array with new one with CHANGE_QUANTed quantity
      return order.map(cartItem => {
        if (cartItem.productId === action.orderItem.productId) return action.orderItem
        else return cartItem
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

