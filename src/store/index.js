import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import general from "./general/generalSlice"

const reducer = {
  general,
}

const middleware = [
  ...getDefaultMiddleware({ thunk: false }),
]

const store = configureStore({
  reducer,
  middleware,
})

export default store
