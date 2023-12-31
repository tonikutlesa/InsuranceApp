import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Configuration {
  name: string;
  amount: number;
}

export interface Insurance {
  _id: string;
  name: string;
  birthdate: string;
  city: string;
  vehiclePower: number;
  voucher: number | null;
  priceMatch: number | null;
  discounts: Configuration[] | string[];
  surcharges: Configuration[] | string[];
  coverages: Configuration[] | string[];
  basePrice: number;
  totalPrice: number;
}

export interface InsurancesSliceState {
  insurances: Insurance[];
}

const initialState: InsurancesSliceState = {
  insurances: []
};

export const insurancesSlice = createSlice({
  name: 'insurances',
  initialState,
  reducers: {
    setInsurances: (state, action: PayloadAction<Insurance[]>) => {
      state.insurances = action.payload;
    }
  }
});

export const { setInsurances } = insurancesSlice.actions;

export const selectInsurances = (state: RootState) => state.insurances.insurances;

export default insurancesSlice;
