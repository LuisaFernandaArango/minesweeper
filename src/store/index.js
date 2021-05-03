import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import game from "./game/gameSlice"

const reducer = {
  game,
}

const middleware = [
  ...getDefaultMiddleware({ thunk: false }),
]

const store = configureStore({
  reducer,
  middleware,
})

export default store
