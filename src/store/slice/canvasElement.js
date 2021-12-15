
import { createSlice } from '@reduxjs/toolkit';

export const canvasElementsSlice = createSlice({
  name: 'canvasElements',
  initialState: {
      elements: {
        isSaving: null,
        saved: null
      }
  },
  reducers: {
    savingElements: (state, action) => {
      state.elements.isSaving = action.payload;
    },
    savedElements: (state, action) => {
      state.elements.saved = action.payload;
    },
  },
  
});

export const {savingElements, savedElements } = canvasElementsSlice.actions

export const saveStatus = (state) => state[canvasElementsSlice.name].elements;

