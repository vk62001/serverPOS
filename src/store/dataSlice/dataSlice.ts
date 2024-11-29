import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  loggedIn: boolean,
}

const initialState: CounterState = {
  loggedIn: false,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => { // Añadir tipo PayloadAction<boolean>
      console.log('Reducer setLogin called with:', action.payload);
      state.loggedIn = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLogin } = dataSlice.actions
