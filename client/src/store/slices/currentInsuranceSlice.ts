import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import insurancesSlice, { Insurance } from './insurancesSlice';
import { RootState } from '../store';

interface CurrentInsuranceSliceState {
  currentInsurance: Insurance;
  selectedDiscounts: string[];
  selectedSurcharges: string[];
  selectedCoverages: string[];
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
  },
  selectedDiscounts: [],
  selectedSurcharges: [],
  selectedCoverages: []
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
      state.selectedDiscounts = [];
      state.selectedSurcharges = [];
      state.selectedCoverages = [];
    },
    addDiscount: (state, action: PayloadAction<string>) => {
      state.selectedDiscounts.push(action.payload);
    },
    removeDiscount: (state, action: PayloadAction<string>) => {
      const index = state.selectedDiscounts.findIndex((discount) => discount === action.payload);

      if (index !== -1) {
        state.selectedDiscounts.splice(index, 1);
      }
    },
    addSurcharge: (state, action: PayloadAction<string>) => {
      state.selectedSurcharges.push(action.payload);
    },
    removeSurcharge: (state, action: PayloadAction<string>) => {
      const index = state.selectedSurcharges.findIndex((surcharge) => surcharge === action.payload);

      if (index !== -1) {
        state.selectedSurcharges.splice(index, 1);
      }
    },
    addCoverage: (state, action: PayloadAction<string>) => {
      state.selectedCoverages.push(action.payload);
    },
    removeCoverage: (state, action: PayloadAction<string>) => {
      const index = state.selectedCoverages.findIndex((coverage) => coverage === action.payload);

      if (index !== -1) {
        state.selectedCoverages.splice(index, 1);
      }
    }
  }
});

export const { setCurrentInsurance, resetCurrentInsurance, addDiscount, removeDiscount, addSurcharge, removeSurcharge, addCoverage, removeCoverage } = currentInsuranceSlice.actions;

export const selectCurrentInsurance = (state: RootState) => state.currentInsurance.currentInsurance;

export const selectCurrentSelectedDiscounts = (state: RootState) => state.currentInsurance.selectedDiscounts;

export const selectCurrentSelectedSurcharges = (state: RootState) => state.currentInsurance.selectedSurcharges;

export const selectCurrentSelectedCoverages = (state: RootState) => state.currentInsurance.selectedCoverages;

export default insurancesSlice;
