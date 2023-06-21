import { createReducer } from '@reduxjs/toolkit';
import { updateFormData } from '../actions/actions';
import { addFormData } from '../actions/actions';
import { setIsEdit } from '../actions/actions';
import { createEntryIndex } from '../actions/actions';

const initialState = {
  formData: [],
  isEdit: true,
};

const formReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addFormData, (state, action) => {
      state.formData.push(action.payload);
    })
    .addCase(setIsEdit, (state, action) => {
      state.isEdit = action.payload;
    })
    .addCase(createEntryIndex, (state) => {
      state.createEntryIndex = state.formData.length;
    })
    .addCase(updateFormData, (state, action) => {
      const { activeEntryIndex, formData } = action.payload;
      state.formData[activeEntryIndex] = formData;
    });
});

export default formReducer;
