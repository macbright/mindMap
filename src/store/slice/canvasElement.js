
import { createSlice } from '@reduxjs/toolkit';

export const canvasElementsSlice = createSlice({
  name: 'canvasElements',
  initialState: {
      elements: []
  },
  reducers: {
    addElement: (state, action) => {
      state.elements.push(action.payload) ;
    },
  },
  
});

export const {addElement } = canvasElementsSlice.actions

export const getElements = (state) => state[canvasElementsSlice.name].elements;

