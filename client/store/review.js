import axios from 'axios'

//ACTION TYPES
const GET_REVIEW = 'GET_REVIEW'

//ACTION CREATOR
const getReview = (product) => ({type: GET_REVIEW, product})

//THUNK CREATOR
export function fetchReviews(productId){
    return function thunk(dispatch){
        return axios.get(`api/reviews/${productId}`)
            .then(res => res.data)
            .then(reviews => {
                if(reviews.length)
            })
    }
}