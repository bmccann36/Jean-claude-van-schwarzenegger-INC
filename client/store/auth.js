import axios from 'axios';

const LOG_IN = 'LOG_IN';
const SIGN_UP = 'SIGN_UP';

const logIn = user => ({ type: LOG_IN, user });
const signUp = user => ({ type: SIGN_UP, user });

export default function reducer (state = {}, action) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, action.user);

    case SIGN_UP:
      return Object.assign({}, action.user);

    default:
      return state;
  }
}


