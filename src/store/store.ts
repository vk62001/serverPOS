import { configureStore, createSlice } from '@reduxjs/toolkit'
import { dataSlice } from './dataSlice/dataSlice'

const rootReducer = createSlice({
  name: 'root',
  initialState: {},
  reducers: {
    REPLACE_STATE: (state, action) => {
      return action.payload;
    }
  }
});

export const store = configureStore({
  reducer: {
    root: rootReducer.reducer,
    dataSlice: dataSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch