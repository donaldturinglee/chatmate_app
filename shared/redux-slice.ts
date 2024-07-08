import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IMainState, TColorMode, TMessage} from './types';

// Define the initial state using that type
const initialState: IMainState = {
  app_mode: 'light',
  messages: [],
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
    updateMessages: (state, action: PayloadAction<TMessage>) => {
      state.messages.push(action.payload);
    },
    clearMessages: state => {
      state.messages = [];
    },
  },
});

export const {setAppColorMode, updateMessages, clearMessages} =
  mainSlice.actions;

export default mainSlice.reducer;
