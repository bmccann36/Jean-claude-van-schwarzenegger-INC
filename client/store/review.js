import axios from 'axios'

//ACTION TYPES
const GET_REVIEW = 'GET_REVIEW'

//ACTION CREATOR
const getReview = (reviews) => ({type: GET_REVIEW, reviews})

//THUNK CREATOR
export function fetchReviews(productId){
    return function thunk(dispatch){
        return axios.get(`api/reviews/${productId}`)
            .then(res => res.data)
            .then(reviews => {
                if(reviews.length){
                    dispatch(getReview(reviews))
                }else{
                    console.log("NO REVIEWS")
                }
            })
    }
}

//REDUCER

export default function (reviews = [], action){
    switch(action.type) {
        case GET_REVIEW:
            return action.reviews
        default:
            return reviews
    }
}