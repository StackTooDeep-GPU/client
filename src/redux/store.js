"use client"

import {configureStore} from "@reduxjs/toolkit"
import accountReducer from "./account/accountSlice"

export function makeStore() {
  return configureStore({
    reducer: {
      account: accountReducer,
    },
  })
}

export const store = makeStore()
