import { configureStore } from '@reduxjs/toolkit';
import insurancesSlice from './slices/insurancesSlice';
import { currentInsuranceSlice } from './slices/currentInsuranceSlice';

export const store = configureStore({
  reducer: {
    insurances: insurancesSlice.reducer,
    currentInsurance: currentInsuranceSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
