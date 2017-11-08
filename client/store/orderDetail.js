import axios from 'axios'
const chalk = require('chalk')

//ACTION TYPES
const GET_DETAILS = 'GET_DETAILS'

// ACTION CREATORS
const getDetails = (details) => ({ type: GET_DETAILS, details: details })

//THUNK CREATORS

export function getOrderDetail(userId) {
console.log('got to thunk')
  return function thunk(dispatch) {
    axios.get(`/api/orders/detail/${userId}`)
      .then(res => res.data)
      .then(details => {
        magenta('details')
        console.log(details)
        // dispatch(action)
      })
  }

}


//REDUCER

export default function (detail = [], action) {
  switch (action.type) {

    case GET_DETAILS:
      return action.products

    default:
      return detail
  }
}


function magenta(str) {
  console.log(chalk.magenta(str))
}
