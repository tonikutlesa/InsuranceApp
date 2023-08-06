import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import insurancesSlice, { Insurance } from './insurancesSlice';
import { RootState } from '../store';

interface CurrentInsuranceSliceState {
  currentInsurance: Insurance;
}

const initialState: CurrentInsuranceSliceState = {
  currentInsurance: {
    _id: '',
    name: '',
    birthdate: '',
    city: '',
    vehiclePower: 0,
    voucher: null,
    priceMatch: null,
    discounts: [],
    surcharges: [],
    coverages: [],
    basePrice: 0,
    totalPrice: 0
  }
};

export const currentInsuranceSlice = createSlice({
  name: 'currentInsurance',
  initialState,
  reducers: {
    setCurrentInsurance: (state, action: PayloadAction<Insurance>) => {
      state.currentInsurance = action.payload;
    },
    resetCurrentInsurance: (state) => {
      state.currentInsurance = { ...initialState.currentInsurance };
    }
  }
});

export const { setCurrentInsurance, resetCurrentInsurance } = currentInsuranceSlice.actions;

export const selectCurrentInsurance = (state: RootState) => state.currentInsurance.currentInsurance;

export default insurancesSlice;
