import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IMainState, TColorMode} from './types';

// Define the initial state using that type
const initialState: IMainState = {
  app_mode: 'light',
};

export const mainSlice = createSlice({
  name: 'main',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAppColorMode: (state, action: PayloadAction<TColorMode>) => {
      state.app_mode = action.payload;
    },
  },
});

export const {setAppColorMode} = mainSlice.actions;

export default mainSlice.reducer;
