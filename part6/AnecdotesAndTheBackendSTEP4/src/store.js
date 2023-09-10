import { configureStore } from '@reduxjs/toolkit'

import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notiReducer from './reducers/notiReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdotesReducer,
      filter: filterReducer,
      notification: notiReducer
    }
})
export default store