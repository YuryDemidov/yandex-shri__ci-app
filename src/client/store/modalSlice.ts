import { createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export const openModal = createAction('modal/open');
export const closeModal = createAction('modal/close');
export const showModalError = createAction<string | Error, string>('modal/showError');
export const hideModalError = createAction('modal/hideError');

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    errorMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(openModal, (state) => ({
      ...state,
      isOpened: true,
    }));
    builder.addCase(closeModal, (state) => ({
      ...state,
      isOpened: false,
      errorMessage: '',
    }));
    builder.addCase(showModalError, (state, action) => ({
      ...state,
      errorMessage: action.payload.toString(),
    }));
    builder.addCase(hideModalError, (state) => {
      return {
        ...state,
        errorMessage: '',
      };
    });
  },
});

export const getModalState = (state: RootState) => state.modal;

export const { reducer: modalReducer } = modalSlice;
