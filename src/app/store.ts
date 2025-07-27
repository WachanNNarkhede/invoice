// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import invoiceFieldsReducer from './slices/nvoicefiels';

export const store = configureStore({
  reducer: {
    invoiceFields: invoiceFieldsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;