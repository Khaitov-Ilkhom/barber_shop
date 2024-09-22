import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type TInitialState = {
  token: string | null
}
const initialState: TInitialState = {
  token: localStorage.getItem("token") || null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload
      localStorage.setItem("token", state.token)
    },
    logOut: (state) => {
      state.token = null
      localStorage.removeItem("token")
    }
  }
})

export const {reducer} = authSlice
export const {signIn, logOut} = authSlice.actions;