import { createAction, createSlice } from '@reduxjs/toolkit';

export const openModal = createAction('modal/open');
export const closeModal = createAction('modal/close');
export const showModalError = createAction('modal/showError');
export const hideModalError = createAction('modal/hideError');

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    errorMessage: '',
  },
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
      errorMessage: action.payload,
    }));
    builder.addCase(hideModalError, (state) => {
      return {
        ...state,
        errorMessage: '',
      };
    });
  },
});

export const getModalState = (state) => state.modal;

export const { reducer: modalReducer } = modalSlice;
