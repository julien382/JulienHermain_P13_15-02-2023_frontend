import { createStore } from 'redux';

// Action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action creators
export function login(user) {
  return { type: LOGIN, user };
}

export function logout() {
  return { type: LOGOUT };
}

// Reducer
function reducer(state = { user: null }, action) {
  switch (action.type) {
    case LOGIN:
      return { user: action.user };
    case LOGOUT:
      return { user: null };
    default:
      return state;
  }
}

// Store
const store = createStore(reducer);

export default store;
