import axios from 'axios'

//ACTION TYPES
const GET_DETAILS = 'GET_DETAILS'

// ACTION CREATORS
const loadDetails = (detail) => ({ type: GET_DETAILS, detail })

//THUNK CREATORS

export function fetchDetails(userId) {

  return function thunk(dispatch) {
    return axios.get(`/api/orders/detail/${userId}`)
      .then(res => res.data)
      .then(details => {
        const action = loadDetails(details)
        dispatch(action)
      })
  }

}


//REDUCER

export default function (state = {}, action) {
  switch (action.type) {

    case GET_DETAILS:
      return action.detail

    default:
      return state
  }
}
