import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: !1
  },
  reducers: {
    signIn: state => {
      state.isLoggedIn = !0
    },
    signOut: state => {
      state.value = !1
    }
  }
})

export const { isLoggedIn, isLoggedOut } = authSlice.actions

export default authSlice.reducer