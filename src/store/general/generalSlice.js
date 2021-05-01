import { createSlice } from "@reduxjs/toolkit"

import initialState from "./generalInitialState"

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    logError: () => {},
    setMines: (state, { payload: num }) => {
      state.mines = num
    },
   
  },
})

export default generalSlice.reducer

// Actions
export const { actions: generalActions } = generalSlice
