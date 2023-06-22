import { createReducer } from '@reduxjs/toolkit';
import { updateFormData } from '../actions/actions';
import { addFormData } from '../actions/actions';
import { setIsEdit } from '../actions/actions';
import { createEntryIndex } from '../actions/actions';
import { storeLoginInformation } from '../actions/actions';
import { activeAccount } from '../actions/actions';

const initialState = {
  formData: {},
  isEdit: true,
  loginInfo : {},
  activeAccountInfo:'',
};

const formReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addFormData, (state, action) => {
      const { activeAccountInfo, formData } = action.payload;
      if (!state.formData[activeAccountInfo]) {
        state.formData[activeAccountInfo] = []; 
      }
      state.formData[activeAccountInfo].push(formData);
    })
    .addCase(setIsEdit, (state, action) => {
      state.isEdit = action.payload;
    })
    .addCase(createEntryIndex, (state,action) => {
      if (!state.formData[action.payload]) {
        state.createEntryIndex = 0;
      }
      else
      {
        state.createEntryIndex = state.formData[action.payload].length;
      }
    })
    .addCase(updateFormData, (state, action) => {
      const { activeEntryIndex, formData, activeAccountInfo } = action.payload;
      state.formData[activeAccountInfo][activeEntryIndex] = formData;
    })
    .addCase(storeLoginInformation, (state,action) => {
      const {username, password} = action.payload;
      state.loginInfo[username] = password;
    })
    .addCase(activeAccount, (state, action) => {
      state.activeAccountInfo = action.payload;
    })
});

export default formReducer;
