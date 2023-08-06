import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Configuration {
  name: string;
  amount: number;
}

export interface Insurance {
  id: string;
  name: string;
  birthdate: Date;
  city: string;
  vehiclePower: number;
  voucher: number;
  priceMatch: number;
  discounts: Configuration[];
  surcharges: Configuration[];
  coverages: Configuration[];
  basePrice: number;
  totalPrice: number;
}

interface InsurancesSliceState {
  insurances: Insurance[];
}

const initialState: InsurancesSliceState = {
  insurances: []
};

export const insurancesSlice = createSlice({
  name: 'insurances',
  initialState,
  reducers: {
    setInsurances: (state, action: PayloadAction<InsurancesSliceState>) => {
      state = action.payload;
    }
  }
});

export const { setInsurances } = insurancesSlice.actions;

export const selectInsurances = (state: RootState) => state.insurances;

export default insurancesSlice;
