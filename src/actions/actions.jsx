import { createAction } from '@reduxjs/toolkit';

export const updateFormData = createAction('form/updateFormData');
export const setIsEdit = createAction('form/setIsEdit');
export const createEntryIndex = createAction('form/createEntryIndex');
export const addFormData = createAction('form/addFormData');
export const storeLoginInformation = createAction('form/storeLoginInformation');
export const activeAccount = createAction('form/activeAccount');


