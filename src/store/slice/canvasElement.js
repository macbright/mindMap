
import { createSlice } from '@reduxjs/toolkit';

export const canvasElementsSlice = createSlice({
  name: 'canvasElements',
  initialState: {
      elements: {
        isSaving: null,
        saved: null,
        pdfImageSrc: null,
        documentData: null
      }
  },
  reducers: {
    savingElements: (state, action) => {
      state.elements.isSaving = action.payload;
    },
    savedElements: (state, action) => {
      state.elements.saved = action.payload;
    },
    savePdfSrc: (state, action) => {
      state.elements.pdfImageSrc = action.payload;
    },
    saveDocumentData: (state, action) => {
      state.elements.documentData = action.payload;
    },
  },
  
});

export const {savingElements, savedElements, savePdfSrc, saveDocumentData } = canvasElementsSlice.actions

export const saveStatus = (state) => state[canvasElementsSlice.name].elements;

