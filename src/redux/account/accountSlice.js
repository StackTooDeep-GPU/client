"use client"

import {createSlice} from "@reduxjs/toolkit"

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: "",
    provider: null,
  },
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload
    },
    setProvider: (state, action) => {
      state.provider = action.payload
    },
  },
})

export const {setAccount, setProvider} = accountSlice.actions
export default accountSlice.reducer
