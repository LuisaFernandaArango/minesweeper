import { createSlice } from "@reduxjs/toolkit"

import initialState from "./gameState"

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: (state) => {
      state.createNewGame = !state.createNewGame
    },
    setMines: (state, { payload: num }) => {
      state.mines = num
    },
    changeLevelGame: (state, { payload }) =>{
      state.mines = payload.mines
      state.rows = payload.rows
      state.cols = payload.cols
      state.numFlags = payload.numFlags
      state.createNewGame = true
    },
    setCreatNewGame: (state, {payload})=>{
        state.createNewGame = payload
    },
    setNumFlags:(state, {payload})=>{
      state.numFlags = payload
    }
   
  },
})

export default gameSlice.reducer

// Actions
export const { actions: generalActions } = gameSlice
