import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogged: false,
  token: '',
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  createdAt: '',
  updatedAt: '',
}

const userSlice = createSlice({
  name: 'userReducer',

  initialState: initialState,

  reducers: {
    userAuthentification(state, action) {
      // save user token in state
      state.token = action.payload.body.token
    },

    userLogin(state, action) {
      // save user data in state
      state.isLogged = true
      state.id = action.payload.id
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.createdAt = action.payload.createdAt
      state.updatedAt = action.payload.updatedAt
    },

    userUpdate(state, action) {
      // modify the first and last name of the user in the state
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },

    userLogout() {
      localStorage.clear()
      // reset the state to its initial value
      return initialState
    },
  },
})

export const { userLogin, userAuthentification, userUpdate, userLogout } = userSlice.actions;

const store = configureStore({
  reducer: userSlice.reducer,
});


export default store;